import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { NAV, SCHOOL } from '../data/site'
import { scrollToTarget, startLenis, stopLenis } from '../lib/lenis'
import { IconClose, IconLock, IconMenu, IconWhatsApp } from './Icons'
import { waLink } from '../data/site'
import logo from '../assets/logo/logo-horizontal.svg'

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')
  const lastY = useRef(0)
  const menuBtn = useRef<HTMLButtonElement>(null)

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      setScrolled(y > 24)
      setHidden(y > 500 && y > lastY.current + 4)
      if (y < lastY.current - 4) setHidden(false)
      lastY.current = y
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Sección activa para aria-current
  useEffect(() => {
    const ids = NAV.map((n) => n.href.slice(1))
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id) })
    }, { rootMargin: '-45% 0px -50% 0px' })
    ids.forEach((id) => { const el = document.getElementById(id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])

  useEffect(() => {
    if (open) stopLenis(); else startLenis()
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') { setOpen(false); menuBtn.current?.focus() } }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const go = (e: React.MouseEvent, href: string) => {
    e.preventDefault()
    setOpen(false)
    scrollToTarget(href)
  }

  return (
    <>
      <a href="#contenido" className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-[200] focus:bg-white focus:text-indigo focus:px-4 focus:py-2 focus:rounded-full focus:font-bold">
        Saltar al contenido
      </a>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${hidden && !open ? '-translate-y-full' : 'translate-y-0'} ${scrolled ? 'bg-white/85 backdrop-blur-xl shadow-[0_10px_30px_-20px_rgba(30,34,56,.4)]' : 'bg-transparent'}`}
      >
        <nav className="container-x flex items-center justify-between gap-6 h-[72px]" aria-label="Principal">
          <a href="#inicio" onClick={(e) => go(e, '#inicio')} className="shrink-0" aria-label={`${SCHOOL.name} — ir al inicio`}>
            <img src={logo} alt="Corporación Educativa “Santa María de Surco” — Inicial, Primaria, Secundaria" className="h-11 md:h-[52px] w-auto" width={194} height={52} />
          </a>
          <ul className="hidden lg:flex items-center gap-1">
            {NAV.map((n) => (
              <li key={n.href}>
                <a
                  href={n.href}
                  onClick={(e) => go(e, n.href)}
                  aria-current={active === n.href.slice(1) ? 'true' : undefined}
                  className="relative px-3.5 py-2 text-[.9rem] font-semibold text-ink/80 hover:text-indigo transition-colors after:absolute after:left-3.5 after:right-3.5 after:-bottom-0.5 after:h-[2px] after:bg-coral after:scale-x-0 after:origin-left after:transition-transform after:duration-500 hover:after:scale-x-100 aria-[current=true]:text-indigo aria-[current=true]:after:scale-x-100"
                >
                  {n.label}
                </a>
              </li>
            ))}
          </ul>
          <div className="hidden lg:flex items-center gap-3">
            <a href={SCHOOL.intranet} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted hover:text-indigo">
              <IconLock size={17} /> Intranet
            </a>
            <a href="#admision" onClick={(e) => go(e, '#admision')} className="btn btn-primary !py-3 !px-5 text-sm">Admisión 2027</a>
          </div>
          <button
            ref={menuBtn}
            className="lg:hidden inline-flex items-center gap-2 rounded-full bg-indigo text-white px-4 py-2.5 text-sm font-bold"
            aria-expanded={open}
            aria-controls="menu-movil"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <IconClose size={20} /> : <IconMenu size={20} />}
            {open ? 'Cerrar' : 'Menú'}
          </button>
        </nav>
      </header>

      <AnimatePresence>
        {open && (
          <motion.div
            id="menu-movil"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            className="fixed inset-0 z-40 bg-indigo grain text-white lg:hidden flex flex-col pt-24 pb-8 px-6 overflow-y-auto"
            initial={{ clipPath: 'circle(0% at 90% 36px)' }}
            animate={{ clipPath: 'circle(150% at 90% 36px)' }}
            exit={{ clipPath: 'circle(0% at 90% 36px)' }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <ul className="flex flex-col gap-2">
              {NAV.map((n, i) => (
                <motion.li key={n.href} initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.15 + i * 0.06 }}>
                  <a href={n.href} onClick={(e) => go(e, n.href)} className="display text-4xl sm:text-5xl block py-2 hover:text-coral-light">
                    {n.label}
                  </a>
                </motion.li>
              ))}
            </ul>
            <div className="mt-auto pt-10 grid gap-3">
              <a href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-light justify-center"><IconWhatsApp size={20} /> WhatsApp {SCHOOL.phone}</a>
              <a href={SCHOOL.intranet} target="_blank" rel="noopener noreferrer" className="btn justify-center text-white ring-1 ring-white/40"><IconLock size={18} /> Intranet CUBICOL</a>
              <p className="text-white/70 text-sm text-center mt-2">“{SCHOOL.motto}”</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
