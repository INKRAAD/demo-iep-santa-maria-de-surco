import { useEffect, useRef, useState } from 'react'
import { gsap, ScrollTrigger } from '../lib/gsap'
import { LEVELS, waLink } from '../data/site'
import { scrollToTarget, scrollToY } from '../lib/lenis'
import { IconArrow, IconCheck } from './Icons'
import aula from '../assets/fotos/inicial-aula-900.webp'
import abejita from '../assets/fotos/hex-abejita.webp'
import danza from '../assets/fotos/hex-danza.webp'
import desfile from '../assets/fotos/hex-desfile.webp'
import congreso from '../assets/fotos/hex-congreso.webp'
import feria from '../assets/fotos/hex-feria.webp'

type Photo = { src: string; alt: string; hex: boolean }
const PHOTOS: Record<string, [Photo, Photo]> = {
  inicial: [
    { src: aula, hex: false, alt: 'Niñas y niños de Inicial con su maestra en el aula de juegos, levantando la mano para participar' },
    { src: abejita, hex: true, alt: 'Niña de Inicial disfrazada de abejita en una actuación del colegio' },
  ],
  primaria: [
    { src: danza, hex: true, alt: 'Alumna con traje típico peruano y sombrero bailando en una actividad del colegio' },
    { src: desfile, hex: true, alt: 'Estudiantes uniformados con la bandera del Perú y el cartel del colegio durante un desfile' },
  ],
  secundaria: [
    { src: congreso, hex: true, alt: 'Estudiantes con medallas y la bandera del Perú en una visita institucional a un hemiciclo' },
    { src: feria, hex: true, alt: 'Estudiante presentando su proyecto “Quesillo de coco” en una feria escolar' },
  ],
}

const THEMES = [
  { bg: 'bg-coral-soft', text: 'text-ink', sub: 'text-muted', accent: 'text-coral-ink', outline: 'rgba(239,81,85,.22)', chip: 'bg-coral-ink text-white' },
  { bg: 'bg-indigo-soft', text: 'text-ink', sub: 'text-muted', accent: 'text-indigo', outline: 'rgba(60,73,132,.16)', chip: 'bg-indigo text-white' },
  { bg: 'bg-indigo', text: 'text-white', sub: 'text-white/80', accent: 'text-[#FF9C9E]', outline: 'rgba(255,255,255,.12)', chip: 'bg-coral-ink text-white' },
]

export default function Levels() {
  const root = useRef<HTMLElement>(null)
  const stage = useRef<HTMLDivElement>(null)
  const [pinMode, setPinMode] = useState(false)
  const [active, setActive] = useState(0)

  useEffect(() => {
    const mq = window.matchMedia('(min-width: 1024px) and (min-height: 640px) and (prefers-reduced-motion: no-preference)')
    const update = () => setPinMode(mq.matches)
    update()
    mq.addEventListener('change', update)
    return () => mq.removeEventListener('change', update)
  }, [])

  useEffect(() => {
    const el = root.current
    if (!el) return
    const ctx = gsap.context(() => {
      if (pinMode) {
        const panels = gsap.utils.toArray<HTMLElement>('.level-panel')
        const wipes = gsap.utils.toArray<HTMLElement>('.level-wipe')
        gsap.set(panels.slice(1), { clipPath: 'inset(100% 0% 0% 0%)' })
        gsap.set(wipes, { yPercent: 100 })
        const tl = gsap.timeline({
          defaults: { ease: 'none' },
          scrollTrigger: {
            trigger: stage.current, start: 'top top', end: () => `+=${window.innerHeight * 2.6}`, pin: true, scrub: 0.8, anticipatePin: 1,
            onUpdate: (self) => setActive(Math.min(2, Math.floor(self.progress * 2.999 + 0.12))),
          },
        })
        panels.slice(1).forEach((p, i) => {
          const w = wipes[i]
          tl.to({}, { duration: 0.35 })
            .to(w, { yPercent: -100, duration: 1, ease: 'power2.inOut' })
            .to(p, { clipPath: 'inset(0% 0% 0% 0%)', duration: 0.8, ease: 'power2.inOut' }, '<0.2')
            .from(p.querySelectorAll('.lv-in'), { y: 80, opacity: 0, stagger: 0.06, duration: 0.6 }, '<0.3')
            .from(p.querySelectorAll('.lv-photo'), { y: 140, rotate: (k) => (k ? 8 : -6), duration: 0.8, stagger: 0.1 }, '<')
        })
        tl.to({}, { duration: 0.35 })
        // parallax interno del primer panel
        gsap.from(panels[0].querySelectorAll('.lv-in'), { y: 60, opacity: 0, stagger: 0.08, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: stage.current, start: 'top 70%' } })
      } else {
        gsap.utils.toArray<HTMLElement>('.level-panel').forEach((p) => {
          gsap.from(p.querySelectorAll('.lv-in, .lv-photo'), { y: 50, opacity: 0, stagger: 0.08, duration: 0.9, ease: 'expo.out', scrollTrigger: { trigger: p, start: 'top 75%' } })
        })
      }
    }, el)
    ScrollTrigger.refresh()
    return () => ctx.revert()
  }, [pinMode])

  const goTo = (i: number) => {
    const st = ScrollTrigger.getAll().find((s) => s.pin === stage.current)
    if (!st) { scrollToTarget(`#nivel-${LEVELS[i].id}`); return }
    const y = st.start + (st.end - st.start) * [0.02, 0.5, 0.98][i]
    scrollToY(y)
  }

  return (
    <section id="niveles" ref={root} className="relative" aria-labelledby="niveles-title">
      <div className="container-x pt-24 md:pt-32 pb-12 md:pb-16 grid md:grid-cols-[1fr_auto] gap-6 items-end">
        <div>
          <p className="eyebrow reveal text-coral-ink flex items-center gap-3"><span className="inline-block w-8 h-[2px] bg-current" aria-hidden="true" />Niveles educativos</p>
          <h2 id="niveles-title" className="display reveal mt-4 text-[clamp(2.2rem,5vw,4rem)] text-ink">Una sola historia, <span className="text-coral">tres etapas</span></h2>
        </div>
        <p className="reveal max-w-sm text-muted text-lg">De los primeros juegos en Inicial a los proyectos de Secundaria: acompañamos cada etapa con la misma cercanía.</p>
      </div>

      <div ref={stage} className={`relative ${pinMode ? 'h-screen overflow-hidden' : ''}`}>
        {pinMode && (
          <nav className="absolute inset-x-0 bottom-6 z-30" aria-label="Ir a un nivel">
            <div className="container-x flex items-center gap-2">
              {LEVELS.map((l, i) => (
                <button key={l.id} onClick={() => goTo(i)} className={`group flex items-center gap-3 rounded-full px-4 py-2 text-xs font-bold tracking-[.16em] uppercase transition-colors ${active === 2 ? 'text-white hover:bg-white/10' : 'text-ink hover:bg-white/70'}`} aria-current={active === i ? 'step' : undefined}>
                  <span className={`block h-[3px] rounded-full transition-all duration-500 ${active === i ? 'w-10 bg-coral' : 'w-4 bg-current opacity-40'}`} />
                  <span className={`transition-opacity ${active === i ? 'opacity-100' : 'opacity-60 group-hover:opacity-100'}`}>{l.tag} · {l.name}</span>
                </button>
              ))}
            </div>
          </nav>
        )}

        {LEVELS.map((l, i) => {
          const th = THEMES[i]
          const [p1, p2] = PHOTOS[l.id]
          return (
            <div key={l.id}>
              {pinMode && i > 0 && (
                <div aria-hidden="true" className={`level-wipe absolute inset-0 ${i === 1 ? 'bg-coral' : 'bg-indigo-deep'}`} style={{ zIndex: i * 2 + 1 }} />
              )}
              <article
                id={`nivel-${l.id}`}
                className={`level-panel ${th.bg} ${pinMode ? 'absolute inset-0' : 'relative'} overflow-hidden`}
                style={{ zIndex: i * 2 + 2 }}
                aria-labelledby={`nivel-${l.id}-t`}
              >
                <span aria-hidden="true" className="pointer-events-none select-none absolute -bottom-[0.18em] left-[-0.04em] display text-[clamp(7rem,22vw,20rem)] leading-none whitespace-nowrap" style={{ color: 'transparent', WebkitTextStroke: `2px ${th.outline}` }}>
                  {l.name}
                </span>
                <div className={`container-x relative h-full grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16 items-center ${pinMode ? 'pt-6 pb-16' : 'py-20 md:py-24'}`}>
                  <div className="relative z-10">
                    <p className={`lv-in eyebrow ${th.accent} flex items-center gap-3`}>
                      <span className={`inline-grid place-items-center w-9 h-9 rounded-full text-[.7rem] tracking-normal ${th.chip}`}>{l.tag}</span>
                      Nivel {l.name}
                    </p>
                    <h3 id={`nivel-${l.id}-t`} className={`lv-in display mt-5 text-[clamp(2.2rem,4.4vw,3.8rem)] ${th.text}`}>{l.title}</h3>
                    <p className={`lv-in mt-5 text-lg leading-relaxed max-w-xl ${th.sub}`}>{l.body}</p>
                    <ul className="mt-7 grid gap-3">
                      {l.points.map((pt) => (
                        <li key={pt} className={`lv-in flex items-center gap-3 font-semibold ${th.text}`}>
                          <span className={`grid place-items-center w-7 h-7 rounded-full ${i === 2 ? 'bg-white/15' : 'bg-white'} ${th.accent}`}><IconCheck size={16} /></span>
                          {pt}
                        </li>
                      ))}
                    </ul>
                    <a href={waLink(`Hola, quisiera información sobre vacantes de ${l.name} para el 2027.`)} target="_blank" rel="noopener noreferrer" className={`lv-in btn mt-9 ${i === 2 ? 'btn-light' : 'btn-primary'}`}>
                      Consultar vacantes de {l.name} <IconArrow size={18} />
                    </a>
                  </div>

                  <div className="relative h-[360px] sm:h-[440px] lg:h-[min(62vh,560px)]">
                    {p1.hex ? (
                      <img src={p1.src} alt={p1.alt} loading="lazy" width={352} height={352} className="lv-photo hex absolute right-[8%] top-[2%] w-[68%] max-w-[400px] aspect-square object-cover drop-shadow-2xl" />
                    ) : (
                      <img src={p1.src} alt={p1.alt} loading="lazy" width={900} height={600} className="lv-photo absolute right-0 top-[6%] w-[92%] aspect-[4/3] object-cover rounded-[2rem] shadow-2xl" />
                    )}
                    <div className="lv-photo absolute left-[2%] bottom-[2%] w-[44%] max-w-[250px] aspect-square">
                      <div className={`absolute inset-0 hex translate-x-3 translate-y-3 ${i === 1 ? 'bg-coral' : i === 2 ? 'bg-coral' : 'bg-indigo'}`} aria-hidden="true" />
                      <img src={p2.src} alt={p2.alt} loading="lazy" width={352} height={352} className="hex relative w-full h-full object-cover" />
                    </div>
                  </div>
                </div>
              </article>
            </div>
          )
        })}
      </div>
    </section>
  )
}
