import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/env'
import { SCHOOL } from '../data/site'
import SectionHeading from './SectionHeading'
import { IconBook, IconHands, IconHeart } from './Icons'
import aula900 from '../assets/fotos/inicial-aula-900.webp'
import aula1600 from '../assets/fotos/inicial-aula-1600.webp'

const STATEMENT = `Desde ${SCHOOL.since}, en el corazón de Santiago de Surco, acompañamos a cada familia con una educación integral, ética y humana. Porque aquí se entra para aprender y se sale para servir.`

const PILLARS = [
  { icon: IconBook, title: 'Aprender', text: 'Una formación académica sólida en Inicial, Primaria y Secundaria, con talleres que despiertan talentos.' },
  { icon: IconHands, title: 'Servir', text: 'Formación en valores, ética y vocación de servicio: nuestro lema se vive en el día a día.' },
  { icon: IconHeart, title: 'Acompañar', text: 'Atención cercana y departamento psicológico para que cada estudiante avance a su ritmo.' },
]

export default function About() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    if (!root.current || prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      gsap.fromTo('.stmt-word', { opacity: 0.14 }, { opacity: 1, stagger: 0.08, ease: 'none', scrollTrigger: { trigger: '.stmt', start: 'top 80%', end: 'bottom 45%', scrub: true } })
      gsap.fromTo('.about-img', { scale: 1.18 }, { scale: 1, ease: 'none', scrollTrigger: { trigger: '.about-frame', start: 'top bottom', end: 'bottom top', scrub: true } })
      gsap.fromTo('.about-frame', { clipPath: 'inset(18% 12% 18% 12% round 220px 220px 32px 32px)' }, { clipPath: 'inset(0% 0% 0% 0% round 220px 220px 32px 32px)', ease: 'power2.out', scrollTrigger: { trigger: '.about-frame', start: 'top 90%', end: 'top 35%', scrub: true } })
      gsap.from('.about-quote', { y: 60, opacity: 0, rotate: -4, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: '.about-frame', start: 'top 60%' } })
    }, root)
    return () => ctx.revert()
  }, [])

  return (
    <section id="nosotros" ref={root} className="relative py-24 md:py-36" aria-labelledby="nosotros-title">
      <div className="container-x grid grid-cols-1 lg:grid-cols-[1.1fr_.9fr] gap-14 lg:gap-20 items-center">
        <div>
          <SectionHeading eyebrow="Nosotros" title={<>Un colegio cercano, con <span className="text-coral">corazón grande</span></>} id="nosotros-title" />
          <p className="stmt mt-8 text-[clamp(1.35rem,2.4vw,1.9rem)] leading-snug font-medium text-indigo-deep">
            {STATEMENT.split(' ').map((w, i) => (<span key={i} className="stmt-word">{w} </span>))}
          </p>
          <div className="mt-12 grid sm:grid-cols-3 gap-4">
            {PILLARS.map(({ icon: Icon, title, text }, i) => (
              <article key={title} className="reveal group card p-6 transition-transform duration-500 hover:-translate-y-1.5">
                <span className={`grid place-items-center w-12 h-12 rounded-2xl ${i === 1 ? 'bg-coral text-white' : 'bg-indigo-soft text-indigo'} transition-transform duration-500 group-hover:rotate-[-8deg] group-hover:scale-110`}>
                  <Icon size={24} />
                </span>
                <h3 className="display text-2xl mt-4 text-ink">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted">{text}</p>
              </article>
            ))}
          </div>
        </div>

        <div className="relative">
          <div className="about-frame relative overflow-hidden rounded-t-[220px] rounded-b-[32px] aspect-[4/5] bg-indigo-soft">
            <img
              className="about-img absolute inset-0 w-full h-full object-cover object-[62%_50%]"
              src={aula900}
              srcSet={`${aula900} 900w, ${aula1600} 1600w`}
              sizes="(min-width: 1024px) 40vw, 90vw"
              alt="Docente sentada en el piso con niñas y niños de Inicial uniformados que levantan la mano en el aula de juegos del colegio"
              loading="lazy"
              width={900}
              height={600}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-indigo-night/50 via-transparent to-transparent" aria-hidden="true" />
          </div>
          <figure className="about-quote absolute -left-4 sm:-left-10 bottom-8 max-w-[300px] card p-5 pr-6 border-l-4 border-coral">
            <blockquote className="display text-xl leading-snug text-indigo-deep">“…un trato Tierno y Especial.”</blockquote>
            <figcaption className="mt-2 text-xs font-semibold text-muted">Reseña de Google · 5★ · marzo 2026</figcaption>
          </figure>
          <div className="absolute -top-6 -right-2 sm:-right-6 w-28 h-28 rounded-full bg-coral text-white grid place-items-center text-center rotate-12 shadow-xl" aria-hidden="true">
            <span className="leading-tight"><span className="display block text-3xl">{SCHOOL.since}</span><span className="text-[.62rem] font-bold tracking-[.18em] uppercase">desde</span></span>
          </div>
        </div>
      </div>
    </section>
  )
}
