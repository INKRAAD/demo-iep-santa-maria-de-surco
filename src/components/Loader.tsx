import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import emblemWhite from '../assets/logo/logo-emblema-blanco.svg'

/** Loader de marca: el emblema se revela y dos cortinas (coral + índigo) suben como páginas. */
export default function Loader({ onDone }: { onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: onDone })
      tl.from('.ld-emblem', { clipPath: 'inset(100% 0 0 0)', y: 30, duration: 0.9, ease: 'expo.out' })
        .from('.ld-motto span', { yPercent: 110, duration: 0.7, stagger: 0.05, ease: 'expo.out' }, '-=0.5')
        .to('.ld-bar', { scaleX: 1, duration: 0.6, ease: 'power2.inOut' }, '-=0.6')
        .to('.ld-content', { y: -40, opacity: 0, duration: 0.45, ease: 'power2.in' }, '+=0.1')
        .to('.ld-indigo', { yPercent: -100, duration: 0.85, ease: 'expo.inOut' }, '-=0.15')
        .to('.ld-coral', { yPercent: -100, duration: 0.85, ease: 'expo.inOut' }, '-=0.72')
    }, el)
    return () => ctx.revert()
  }, [onDone])

  return (
    <div ref={root} className="fixed inset-0 z-[100]" role="status" aria-live="polite" aria-label="Cargando el sitio de I.E.P. Santa María de Surco">
      <div className="ld-coral absolute inset-0 bg-coral" />
      <div className="ld-indigo grain absolute inset-0 bg-indigo flex items-center justify-center">
        <div className="ld-content flex flex-col items-center gap-6 text-white">
          <img src={emblemWhite} alt="" className="ld-emblem w-24 md:w-28 h-auto" width={112} height={139} />
          <p className="ld-motto display text-xl md:text-2xl overflow-hidden text-center">
            {'Entrar para aprender y salir para servir'.split(' ').map((w, i) => (
              <span key={i} className="inline-block mr-[0.28em]">{w}</span>
            ))}
          </p>
          <div className="h-[2px] w-40 bg-white/20 overflow-hidden rounded">
            <div className="ld-bar h-full bg-coral origin-left scale-x-0" />
          </div>
        </div>
      </div>
    </div>
  )
}
