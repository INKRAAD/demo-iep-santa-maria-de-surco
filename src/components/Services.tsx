import type { ComponentType } from 'react'
import { SCHOOL, SERVICES } from '../data/site'
import SectionHeading from './SectionHeading'
import { IconBelt, IconComputer, IconDance, IconExternal, IconLock, IconMind, IconShield } from './Icons'
import { finePointer, prefersReducedMotion } from '../lib/env'

const ICONS: Record<string, ComponentType<{ size?: number }>> = {
  computo: IconComputer, psico: IconMind, seguro: IconShield, taekwondo: IconBelt, danza: IconDance,
}

function tilt(e: React.PointerEvent<HTMLElement>) {
  if (!finePointer() || prefersReducedMotion()) return
  const el = e.currentTarget
  const r = el.getBoundingClientRect()
  const x = (e.clientX - r.left) / r.width - 0.5
  const y = (e.clientY - r.top) / r.height - 0.5
  el.style.transform = `perspective(900px) rotateX(${-y * 8}deg) rotateY(${x * 10}deg) translateY(-4px)`
  el.style.setProperty('--mx', `${(x + 0.5) * 100}%`)
  el.style.setProperty('--my', `${(y + 0.5) * 100}%`)
}
const reset = (e: React.PointerEvent<HTMLElement>) => { e.currentTarget.style.transform = '' }

export default function Services() {
  return (
    <section id="servicios" className="relative py-24 md:py-36 bg-paper" aria-labelledby="servicios-title">
      <div className="container-x">
        <SectionHeading eyebrow="Talleres y servicios" title={<>Más que clases: <span className="text-coral">talentos</span> y bienestar</>} id="servicios-title">
          Servicios que el colegio ofrece a sus estudiantes para crecer en mente, cuerpo y corazón.
        </SectionHeading>

        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SERVICES.map((s, i) => {
            const Icon = ICONS[s.id]
            return (
              <article
                key={s.id}
                onPointerMove={tilt}
                onPointerLeave={reset}
                className="reveal group relative card p-7 md:p-8 overflow-hidden transition-[transform,background-color] duration-300 ease-out hover:bg-indigo focus-within:bg-indigo"
                style={{ transformStyle: 'preserve-3d' }}
              >
                <div aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" style={{ background: 'radial-gradient(300px circle at var(--mx,50%) var(--my,50%), rgba(239,81,85,.35), transparent 60%)' }} />
                <div className="relative flex items-start justify-between">
                  <span className="grid place-items-center w-14 h-14 rounded-2xl bg-indigo-soft text-indigo group-hover:bg-coral group-hover:text-white transition-colors duration-300">
                    <Icon size={28} />
                  </span>
                  <span className="display text-5xl text-indigo/10 group-hover:text-white/15 transition-colors" aria-hidden="true">0{i + 1}</span>
                </div>
                <h3 className="relative display text-[1.7rem] mt-6 text-ink group-hover:text-white transition-colors">{s.name}</h3>
                <p className="relative mt-2 text-muted group-hover:text-white/85 transition-colors leading-relaxed">{s.text}</p>
              </article>
            )
          })}
          <article className="reveal relative rounded-[1.75rem] p-7 md:p-8 bg-[#D63B40] text-white overflow-hidden grain">
            <div aria-hidden="true" className="absolute -right-10 -bottom-10 w-44 h-44 rounded-full border-[22px] border-white/20" />
            <span className="grid place-items-center w-14 h-14 rounded-2xl bg-white/20"><IconLock size={28} /></span>
            <h3 className="display text-[1.7rem] mt-6">Intranet para familias</h3>
            <p className="mt-2 text-white leading-relaxed">Notas, comunicados y seguimiento desde la plataforma CUBICOL del colegio.</p>
            <a href={SCHOOL.intranet} target="_blank" rel="noopener noreferrer" className="btn btn-light mt-6 !text-coral-ink">
              Ingresar a la intranet <IconExternal size={17} />
            </a>
          </article>
        </div>
      </div>
    </section>
  )
}
