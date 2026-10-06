import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import emblemWhite from '../assets/logo/logo-emblema-blanco.svg'

/** Loader de marca: el emblema se revela y dos cortinas (coral + índigo) suben como páginas. */
/**
 * onReveal: se llama cuando las cortinas empiezan a subir (el hero arranca su intro debajo).
 * onDone: se llama al terminar. Ambos tienen un failsafe por tiempo para que el sitio nunca quede tapado.
 */
export default function Loader({ onReveal, onDone }: { onReveal: () => void; onDone: () => void }) {
  const root = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = root.current
    if (!el) return
    let revealed = false
    let finished = false
    const reveal = () => { if (!revealed) { revealed = true; onReveal() } }
    const finish = () => { reveal(); if (!finished) { finished = true; onDone() } }
    // Pestaña en segundo plano: requestAnimationFrame no corre, así que no se anima.
    if (document.hidden) { finish(); return }
    const failsafe = window.setTimeout(finish, 4500)
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ onComplete: finish })
      tl.from('.ld-emblem', { clipPath: 'inset(100% 0 0 0)', y: 30, duration: 0.9, ease: 'expo.out' })
        .from('.ld-motto span', { yPercent: 110, duration: 0.7, stagger: 0.05, ease: 'expo.out' }, '-=0.5')
        .to('.ld-bar', { scaleX: 1, duration: 0.6, ease: 'power2.inOut' }, '-=0.6')
        .to('.ld-content', { y: -40, opacity: 0, duration: 0.45, ease: 'power2.in' }, '+=0.5')
        .call(reveal, undefined, '-=0.15')
        .to('.ld-indigo', { yPercent: -100, duration: 0.85, ease: 'expo.inOut' }, '<')
        .to('.ld-coral', { yPercent: -100, duration: 0.85, ease: 'expo.inOut' }, '-=0.72')
    }, el)
    return () => { window.clearTimeout(failsafe); ctx.revert() }
  }, [onReveal, onDone])

  return (
    <div ref={root} className="site-loader fixed inset-0 z-[100]" role="status" aria-live="polite" aria-label="Cargando el sitio de I.E.P. Santa María de Surco">
      <div className="ld-coral absolute inset-0 bg-coral" />
      <div className="ld-indigo grain absolute inset-0 bg-indigo flex items-center justify-center">
        <div className="ld-content flex flex-col items-center gap-6 text-white">
          <img src={emblemWhite} alt="" className="ld-emblem w-28 md:w-36 h-auto" width={144} height={179} />
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
