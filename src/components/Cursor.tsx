import { useEffect, useRef } from 'react'
import { gsap } from '../lib/gsap'
import { finePointer, prefersReducedMotion } from '../lib/env'

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const el = ref.current
    if (!el || !finePointer() || prefersReducedMotion()) return
    el.style.opacity = '1'
    const xTo = gsap.quickTo(el, 'x', { duration: 0.35, ease: 'power3.out' })
    const yTo = gsap.quickTo(el, 'y', { duration: 0.35, ease: 'power3.out' })
    const move = (e: PointerEvent) => {
      xTo(e.clientX); yTo(e.clientY)
      const t = e.target as HTMLElement
      el.classList.toggle('is-hover', !!t.closest('a, button, [data-cursor]'))
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])
  return <div ref={ref} className="cursor-dot" style={{ opacity: 0 }} aria-hidden="true" />
}
