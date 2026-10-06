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
  const done = useCallback(() => setLoading(false), [])

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
    const t = window.setTimeout(() => ScrollTrigger.refresh(), 600)
    window.addEventListener('load', () => ScrollTrigger.refresh())
    return () => { ctx.revert(); window.clearTimeout(t) }
  }, [])

  return (
    <>
      {loading && <Loader onDone={done} />}
      <Cursor />
      <Nav />
      <main id="contenido">
        <Hero started={!loading} />
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
