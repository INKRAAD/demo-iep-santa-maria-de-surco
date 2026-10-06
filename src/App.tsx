import { useCallback, useEffect, useState } from 'react'
import { gsap, ScrollTrigger } from './lib/gsap'
import { initLenis } from './lib/lenis'
import { prefersReducedMotion } from './lib/env'
import Loader from './components/Loader'
import Nav from './components/Nav'
import Hero from './components/Hero'
import Marquee from './components/Marquee'
import About from './components/About'
import Counters from './components/Counters'
import Levels from './components/Levels'
import Services from './components/Services'
import SchoolLife from './components/SchoolLife'
import Reviews from './components/Reviews'
import Admission from './components/Admission'
import Location from './components/Location'
import Footer from './components/Footer'
import WhatsAppFab from './components/WhatsAppFab'
import Cursor from './components/Cursor'

const skipLoader = () => prefersReducedMotion() || new URLSearchParams(window.location.search).has('noloader')

export default function App() {
  const [loading, setLoading] = useState(() => !skipLoader())
  const [revealed, setRevealed] = useState(() => skipLoader())
  const done = useCallback(() => setLoading(false), [])
  const reveal = useCallback(() => setRevealed(true), [])

  useEffect(() => { initLenis() }, [])

  // Revelado genérico de títulos y tarjetas
  useEffect(() => {
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      ScrollTrigger.batch('.reveal', {
        start: 'top 88%',
        once: true,
        onEnter: (els) => gsap.fromTo(els, { y: 40, opacity: 0 }, { y: 0, opacity: 1, duration: 1, stagger: 0.08, ease: 'expo.out', overwrite: true }),
      })
      gsap.set('.reveal', { opacity: 0, y: 40 })
    })
    // Failsafe: si algún .reveal quedó oculto dentro de la pantalla (trigger perdido, salto brusco), se muestra.
    const rescue = () => {
      document.querySelectorAll<HTMLElement>('.reveal').forEach((el) => {
        const r = el.getBoundingClientRect()
        if (r.top < window.innerHeight && r.bottom > 0 && parseFloat(getComputedStyle(el).opacity) < 0.05 && !gsap.isTweening(el)) {
          gsap.to(el, { opacity: 1, y: 0, duration: 0.6, ease: 'power2.out' })
        }
      })
    }
    ScrollTrigger.addEventListener('scrollEnd', rescue)
    const rescueTimer = window.setInterval(rescue, 2500)
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 600)
    window.addEventListener('load', () => ScrollTrigger.refresh())
    return () => { ctx.revert(); window.clearTimeout(t); window.clearInterval(rescueTimer); ScrollTrigger.removeEventListener('scrollEnd', rescue) }
  }, [])

  return (
    <>
      {loading && <Loader onReveal={reveal} onDone={done} />}
      <Cursor />
      <Nav />
      <main id="contenido">
        <Hero started={revealed} />
        <Marquee />
        <About />
        <Counters />
        <Levels />
        <Services />
        <SchoolLife />
        <Reviews />
        <Admission />
        <Location />
      </main>
      <Footer />
      <WhatsAppFab />
    </>
  )
}
