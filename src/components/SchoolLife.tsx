import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { finePointer, prefersReducedMotion } from '../lib/env'
import { ACTIVITIES, SCHOOL } from '../data/site'
import SectionHeading from './SectionHeading'
import { IconArrow, IconFacebook, IconInfo } from './Icons'
import aula from '../assets/fotos/inicial-aula-900.webp'
import semana from '../assets/fotos/semana-santa-2024.webp'
import abejita from '../assets/fotos/hex-abejita.webp'
import danza from '../assets/fotos/hex-danza.webp'
import desfile from '../assets/fotos/hex-desfile.webp'
import congreso from '../assets/fotos/hex-congreso.webp'
import feria from '../assets/fotos/hex-feria.webp'

type Item = { src: string; alt: string; cap: string; kind: 'hex' | 'rect' | 'poster'; x: number; y: number; w: number; z: number; speed: number; ratio: string }
const ITEMS: Item[] = [
  { src: aula, kind: 'rect', alt: 'Clase de Inicial: alumnos sentados en el piso levantan la mano junto a su maestra', cap: 'Inicial en el aula', x: 27, y: 10, w: 43, z: 0, speed: 0.2, ratio: '3/2' },
  { src: semana, kind: 'poster', alt: 'Afiche del colegio por Jueves Santo 2024 con el lema “Entrar para aprender y salir para servir”', cap: 'Semana Santa 2024', x: 3, y: 6, w: 17, z: -160, speed: 0.6, ratio: '540/958' },
  { src: congreso, kind: 'hex', alt: 'Estudiantes de Secundaria con medallas en una visita institucional', cap: 'Visita institucional', x: 74, y: 3, w: 20, z: -260, speed: 0.8, ratio: '1/1' },
  { src: desfile, kind: 'hex', alt: 'Alumnos uniformados con la bandera peruana y el cartel del colegio en un desfile', cap: 'Desfile escolar', x: 15, y: 52, w: 18, z: 120, speed: -0.3, ratio: '1/1' },
  { src: abejita, kind: 'hex', alt: 'Niña de Inicial con disfraz de abejita', cap: 'Actuación de Inicial', x: 39, y: 62, w: 15, z: 200, speed: -0.5, ratio: '1/1' },
  { src: feria, kind: 'hex', alt: 'Estudiante exponiendo su proyecto en la feria escolar', cap: 'Feria de proyectos', x: 56, y: 58, w: 16, z: 60, speed: -0.1, ratio: '1/1' },
  { src: danza, kind: 'hex', alt: 'Alumna con traje típico bailando una danza peruana', cap: 'Festidanza', x: 77, y: 50, w: 17, z: 150, speed: -0.4, ratio: '1/1' },
]

export default function SchoolLife() {
  const root = useRef<HTMLElement>(null)
  const world = useRef<HTMLDivElement>(null)
  const rail = useRef<HTMLUListElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia()
      mm.add('(min-width: 1024px)', () => {
        gsap.fromTo(world.current, { rotateX: 16, z: -220, y: 60 }, { rotateX: -4, z: 40, y: -40, ease: 'none', scrollTrigger: { trigger: '.depth-stage', start: 'top bottom', end: 'bottom top', scrub: true } })
        gsap.utils.toArray<HTMLElement>('.depth-item').forEach((it) => {
          const sp = parseFloat(it.dataset.speed || '0')
          gsap.fromTo(it, { yPercent: sp * 30 }, { yPercent: -sp * 30, ease: 'none', scrollTrigger: { trigger: '.depth-stage', start: 'top bottom', end: 'bottom top', scrub: true } })
        })
        gsap.from('.depth-item', { opacity: 0, scale: 0.8, duration: 1.2, stagger: 0.08, ease: 'expo.out', scrollTrigger: { trigger: '.depth-stage', start: 'top 75%' } })
      })
      mm.add('(max-width: 1023px)', () => {
        gsap.utils.toArray<HTMLElement>('.depth-item').forEach((it, i) => {
          gsap.from(it, { y: 60, opacity: 0, duration: 0.9, ease: 'expo.out', delay: (i % 2) * 0.1, scrollTrigger: { trigger: it, start: 'top 90%' } })
        })
      })
      gsap.from('.act-card', { x: 80, opacity: 0, stagger: 0.06, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: rail.current, start: 'top 85%' } })
    }, el)

    // Inclinación con el mouse (profundidad)
    const stageEl = el.querySelector<HTMLElement>('.depth-stage')
    let off = () => {}
    if (stageEl && world.current && finePointer()) {
      const ry = gsap.quickTo(world.current, 'rotateY', { duration: 1, ease: 'power3.out' })
      const move = (e: PointerEvent) => {
        const r = stageEl.getBoundingClientRect()
        ry(((e.clientX - r.left) / r.width - 0.5) * 10)
      }
      const leave = () => ry(0)
      stageEl.addEventListener('pointermove', move)
      stageEl.addEventListener('pointerleave', leave)
      off = () => { stageEl.removeEventListener('pointermove', move); stageEl.removeEventListener('pointerleave', leave) }
    }
    return () => { off(); ctx.revert() }
  }, [])

  const scrollRail = (dir: number) => {
    const r = rail.current
    if (!r) return
    r.scrollBy({ left: dir * Math.min(r.clientWidth * 0.8, 640), behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
  }

  return (
    <section id="vida-escolar" ref={root} className="relative py-24 md:py-36 bg-white overflow-hidden" aria-labelledby="vida-title">
      <div className="container-x">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_auto] gap-8 items-end">
          <SectionHeading eyebrow="Vida escolar" title={<>Un año lleno de <span className="text-coral">momentos</span></>} id="vida-title">
            Fe, cultura, deporte y celebración: las actividades que la familia SMS vive cada año.
          </SectionHeading>
          <div className="flex gap-2" aria-label="Desplazar actividades">
            <button onClick={() => scrollRail(-1)} className="grid place-items-center w-12 h-12 rounded-full ring-1 ring-indigo/25 text-indigo hover:bg-indigo hover:text-white transition-colors" aria-label="Actividades anteriores"><IconArrow size={20} className="rotate-180" /></button>
            <button onClick={() => scrollRail(1)} className="grid place-items-center w-12 h-12 rounded-full bg-indigo text-white hover:bg-coral-ink transition-colors" aria-label="Más actividades"><IconArrow size={20} /></button>
          </div>
        </div>
      </div>

      <ul ref={rail} className="mt-12 flex gap-4 overflow-x-auto snap-x snap-mandatory pb-6 px-[max(1.25rem,calc((100vw-1240px)/2))] [scrollbar-width:thin]" tabIndex={0} aria-label="Actividades anuales del colegio">
        {ACTIVITIES.map((a, i) => {
          const style = ['bg-indigo text-white', 'bg-coral-soft text-ink', 'bg-paper text-ink ring-1 ring-indigo/10', 'bg-indigo-soft text-ink'][i % 4]
          return (
            <li key={a.name} className={`act-card snap-start shrink-0 w-[240px] md:w-[270px] rounded-[1.75rem] p-6 flex flex-col justify-between min-h-[230px] ${style}`}>
              <span className={`display text-5xl ${i % 4 === 0 ? 'text-coral-light' : 'text-coral'}`} aria-hidden="true">{String(i + 1).padStart(2, '0')}</span>
              <div>
                <h3 className="display text-2xl leading-tight">{a.name}</h3>
                <p className={`mt-2 text-sm ${i % 4 === 0 ? 'text-white/80' : 'text-muted'}`}>{a.text}</p>
              </div>
            </li>
          )
        })}
      </ul>
      <div className="container-x">
        <p className="mt-2 inline-flex items-center gap-2 text-sm text-muted"><IconInfo size={18} className="text-indigo" /> Calendario 2027: fechas por confirmar con el colegio.</p>
      </div>

      {/* Galería con profundidad */}
      <div className="container-x mt-20 md:mt-28">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <h3 className="display text-[clamp(2rem,4vw,3.2rem)] text-ink">Galería <span className="text-coral">SMS</span></h3>
          <a href={SCHOOL.facebook} target="_blank" rel="noopener noreferrer" className="btn btn-ghost"><IconFacebook size={20} /> Más fotos en Facebook</a>
        </div>
        <div className="depth-stage relative mt-10 lg:h-[860px] [perspective:1400px]">
          <div ref={world} className="relative h-full grid grid-cols-2 gap-4 sm:gap-6 lg:block [transform-style:preserve-3d]">
            {ITEMS.map((it, i) => (
              <figure
                key={i}
                data-speed={it.speed}
                className={`depth-item group relative lg:absolute ${it.kind === 'rect' ? 'col-span-2' : ''} ${i % 2 && it.kind === 'hex' ? 'translate-y-8 lg:translate-y-0' : ''}`}
                style={{ ['--x' as string]: `${it.x}%`, ['--y' as string]: `${it.y}%`, ['--w' as string]: `${it.w}%`, ['--z' as string]: `${it.z}px` }}
              >
                <div className="depth-media lg:[transform:translateZ(var(--z))] transition-transform duration-700 group-hover:[transform:translateZ(calc(var(--z)+60px))]">
                  {it.kind === 'hex' ? (
                    <div className="relative">
                      <div aria-hidden="true" className={`absolute inset-0 hex translate-x-2.5 translate-y-2.5 ${i % 2 ? 'bg-coral' : 'bg-indigo'}`} />
                      <img src={it.src} alt={it.alt} loading="lazy" width={352} height={352} className="hex relative w-full aspect-square object-cover" />
                    </div>
                  ) : (
                    <img src={it.src} alt={it.alt} loading="lazy" width={it.kind === 'rect' ? 900 : 540} height={it.kind === 'rect' ? 600 : 958} className="w-full object-cover rounded-[1.5rem] shadow-[0_40px_80px_-40px_rgba(26,32,70,.6)]" style={{ aspectRatio: it.ratio }} />
                  )}
                  <figcaption className="absolute left-1/2 -translate-x-1/2 bottom-2 whitespace-nowrap rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-indigo shadow-lg lg:opacity-0 lg:translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-500">
                    {it.cap}
                  </figcaption>
                </div>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
