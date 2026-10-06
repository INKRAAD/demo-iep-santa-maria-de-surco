import { Component, lazy, Suspense, useEffect, useRef, useState, type ReactNode } from 'react'
import { gsap } from '../lib/gsap'
import { canUse3D, prefersReducedMotion } from '../lib/env'
import { scrollToTarget } from '../lib/lenis'
import { useMagnetic } from '../hooks/useMagnetic'
import { useInView } from '../hooks/useInView'
import { SCHOOL, waLink } from '../data/site'
import EmblemFallback from './EmblemFallback'
import { IconArrow, IconClock, IconPin, IconStar, IconWhatsApp } from './Icons'

const HeroScene = lazy(() => import('./HeroScene'))

class SceneBoundary extends Component<{ onError: () => void; children: ReactNode }, { failed: boolean }> {
  state = { failed: false }
  static getDerivedStateFromError() { return { failed: true } }
  componentDidCatch() { this.props.onError() }
  render() { return this.state.failed ? null : this.props.children }
}

const H1_LINES: { text: string; className?: string }[][] = [
  [{ text: 'Entrar' }, { text: 'para' }, { text: 'aprender,', className: 'text-coral' }],
  [{ text: 'salir' }, { text: 'para' }, { text: 'servir.', className: 'text-indigo relative hero-underline' }],
]

export default function Hero({ started }: { started: boolean }) {
  const root = useRef<HTMLElement>(null)
  const [use3D, setUse3D] = useState(canUse3D)
  const [ready3D, setReady3D] = useState(false)
  const [stageRef, stageInView] = useInView<HTMLDivElement>('100px')
  const cta1 = useMagnetic<HTMLAnchorElement>()
  const cta2 = useMagnetic<HTMLAnchorElement>()

  useEffect(() => {
    if (!started || !root.current) return
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'expo.out' } })
      tl.from('.hero-chip', { y: 20, opacity: 0, duration: 0.8 })
        .from('.hero-word', { yPercent: 115, rotate: 4, duration: 1.1, stagger: 0.07 }, '-=0.5')
        .from('.hero-underline-path', { strokeDashoffset: 320, duration: 1.2, ease: 'power3.inOut' }, '-=0.6')
        .from('.hero-fade', { y: 24, opacity: 0, duration: 0.9, stagger: 0.08 }, '-=0.9')
        .from('.hero-stage', { scale: 0.9, opacity: 0, duration: 1.4 }, 0.1)
        .from('.hero-blob', { scale: 0.4, opacity: 0, duration: 1.6, stagger: 0.12 }, 0)

      // Parallax de salida
      gsap.to('.hero-copy', { yPercent: -12, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('.hero-blob-a', { yPercent: 30, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
      gsap.to('.hero-blob-b', { yPercent: -25, xPercent: 10, ease: 'none', scrollTrigger: { trigger: root.current, start: 'top top', end: 'bottom top', scrub: true } })
    }, root)
    return () => ctx.revert()
  }, [started])

  return (
    <section id="inicio" ref={root} className="relative min-h-[100svh] pt-[96px] pb-16 overflow-hidden bg-paper" aria-labelledby="hero-title">
      {/* Fondo de marca */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="hero-blob hero-blob-a absolute -right-[12%] top-[6%] w-[62vw] max-w-[820px] aspect-square rounded-full bg-[radial-gradient(circle_at_40%_40%,#E9ECF7_0%,#E9ECF7_45%,transparent_70%)]" />
        <div className="hero-blob hero-blob-b absolute right-[30%] bottom-[-14%] w-[26vw] max-w-[360px] aspect-square rounded-full border-[28px] border-coral/15" />
        <div className="hero-blob absolute left-[-9%] top-[34%] w-[14vw] max-w-[180px] aspect-square rounded-full bg-coral-soft/70" />
        <svg className="absolute inset-0 w-full h-full opacity-[.35]" aria-hidden="true">
          <defs>
            <pattern id="dots" width="28" height="28" patternUnits="userSpaceOnUse"><circle cx="2" cy="2" r="1.2" fill="#3C4984" opacity=".25" /></pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#dots)" style={{ maskImage: 'linear-gradient(90deg,transparent,black 30%,transparent 70%)' }} />
        </svg>
      </div>

      <div className="container-x relative grid grid-cols-1 lg:grid-cols-[1.05fr_1fr] gap-8 lg:gap-4 items-center min-h-[calc(100svh-180px)]">
        <div className="hero-copy relative z-10 order-2 lg:order-1">
          <p className="hero-chip inline-flex items-center gap-2.5 rounded-full bg-white px-4 py-2 text-[.8rem] font-semibold text-indigo shadow-[0_8px_30px_-12px_rgba(60,73,132,.45)]">
            <span className="relative flex h-2.5 w-2.5"><span className="absolute inline-flex h-full w-full rounded-full bg-coral opacity-60 animate-ping motion-reduce:hidden" /><span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-coral" /></span>
            Admisión 2027<span className="hidden sm:inline"> · Inicial, Primaria y Secundaria</span>
          </p>

          <h1 id="hero-title" className="display mt-6 text-[clamp(2.9rem,7.4vw,6.4rem)] text-ink">
            <span className="sr-only">I.E.P. Santa María de Surco: </span>
            {H1_LINES.map((line, li) => (
              <span key={li} className="block">
                {line.map((w, wi) => (
                  <span key={wi} className="inline-block overflow-hidden align-bottom pb-[0.08em] -mb-[0.08em] mr-[0.22em] last:mr-0">
                    <span className={`hero-word inline-block ${w.className ?? ''}`}>
                      {w.text}
                      {w.className?.includes('hero-underline') && (
                        <svg className="absolute left-0 -bottom-[0.08em] w-full h-[0.22em] overflow-visible" viewBox="0 0 300 20" preserveAspectRatio="none" aria-hidden="true">
                          <path className="hero-underline-path" d="M4 14 C 70 4, 160 4, 296 10" fill="none" stroke="#EF5155" strokeWidth="7" strokeLinecap="round" strokeDasharray="320" strokeDashoffset="0" />
                        </svg>
                      )}
                    </span>
                  </span>
                ))}
              </span>
            ))}
          </h1>

          <p className="hero-fade mt-6 max-w-xl text-lg md:text-xl leading-relaxed text-muted">
            Colegio privado en Santiago de Surco. Desde {SCHOOL.since} acompañamos a niñas, niños y jóvenes con una educación{' '}
            <strong className="font-semibold text-indigo">integral, ética y humana</strong>.
          </p>

          <div className="hero-fade mt-9 flex flex-wrap gap-3">
            <a ref={cta1} href="#admision" onClick={(e) => { e.preventDefault(); scrollToTarget('#admision') }} className="btn btn-primary">
              Postula a Admisión 2027 <IconArrow size={18} />
            </a>
            <a ref={cta2} href={waLink()} target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
              <IconWhatsApp size={20} className="text-[#128040]" /> Escríbenos por WhatsApp
            </a>
          </div>

          <ul className="hero-fade mt-10 flex flex-wrap gap-x-6 gap-y-3 text-sm text-muted">
            <li className="flex items-center gap-2">
              <span className="flex text-coral" aria-hidden="true">{Array.from({ length: 5 }).map((_, i) => <IconStar key={i} size={16} />)}</span>
              <span><strong className="text-ink">{SCHOOL.rating}</strong> en Google · {SCHOOL.reviews} reseñas<a href="#resenas" className="text-indigo font-bold" aria-label="Ver nota sobre la cifra de reseñas">*</a></span>
            </li>
            <li className="flex items-center gap-2"><IconClock size={18} className="text-indigo" /> {SCHOOL.shift}</li>
            <li className="flex items-center gap-2"><IconPin size={18} className="text-indigo" /> {SCHOOL.street}, Surco</li>
          </ul>
        </div>

        <div ref={stageRef} className="hero-stage relative order-1 lg:order-2 h-[min(78vw,420px)] sm:h-[460px] lg:h-[min(76vh,680px)]">
          <div className={`absolute inset-0 transition-opacity duration-700 ${use3D && ready3D ? 'opacity-0' : 'opacity-100'}`}>
            <EmblemFallback />
          </div>
          {use3D && (
            <div className={`absolute inset-0 transition-opacity duration-1000 ${ready3D ? 'opacity-100' : 'opacity-0'}`}>
              <SceneBoundary onError={() => setUse3D(false)}>
                <Suspense fallback={null}>
                  <HeroScene active={stageInView} onReady={() => setReady3D(true)} />
                </Suspense>
              </SceneBoundary>
            </div>
          )}
        </div>
      </div>

    </section>
  )
}
