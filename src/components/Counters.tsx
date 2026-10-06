import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { prefersReducedMotion } from '../lib/env'
import { COUNTERS } from '../data/site'

/** Contadores animados — solo cifras reales (fuentes en README). */
export default function Counters() {
  const root = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const nums = el.querySelectorAll<HTMLElement>('[data-count]')
    if (prefersReducedMotion()) return
    const ctx = gsap.context(() => {
      nums.forEach((n) => {
        const end = parseFloat(n.dataset.count || '0')
        const dec = parseInt(n.dataset.decimals || '0', 10)
        const obj = { v: 0 }
        n.textContent = (0).toFixed(dec)
        gsap.to(obj, {
          v: end, duration: 2, ease: 'power3.out',
          scrollTrigger: { trigger: n, start: 'top 88%', once: true },
          onUpdate: () => { n.textContent = obj.v.toFixed(dec) },
        })
      })
      gsap.from('.counter-item', { y: 40, opacity: 0, stagger: 0.1, duration: 1, ease: 'expo.out', scrollTrigger: { trigger: el, start: 'top 80%' } })
    }, el)
    return () => ctx.revert()
  }, [])

  return (
    <section ref={root} className="relative bg-indigo text-white grain overflow-hidden" aria-label="El colegio en cifras">
      <div aria-hidden="true" className="absolute -right-24 -top-24 w-96 h-96 rounded-full border-[40px] border-coral/25" />
      <div className="container-x relative py-16 md:py-20 grid grid-cols-2 lg:grid-cols-4 gap-y-12 gap-x-6">
        {COUNTERS.map((c) => (
          <div key={c.label} className="counter-item relative pl-5 border-l border-white/20">
            <p className="display text-[clamp(3rem,6vw,5rem)] leading-none">
              <span data-count={c.value} data-decimals={c.decimals ?? 0}>{c.value.toFixed(c.decimals ?? 0)}</span>
              <span className="text-coral-light">{c.suffix}</span>
            </p>
            <p className="mt-3 font-semibold text-white/95 leading-snug">{c.label}</p>
            <p className="mt-1 text-xs text-white/65">{c.note}</p>
          </div>
        ))}
      </div>
    </section>
  )
}
