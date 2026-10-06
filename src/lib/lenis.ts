import Lenis from 'lenis'
import { gsap, ScrollTrigger } from './gsap'
import { prefersReducedMotion } from './env'

let lenis: Lenis | null = null

export function initLenis() {
  if (prefersReducedMotion() || lenis) return lenis
  lenis = new Lenis({ duration: 1.15, easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), smoothWheel: true })
  lenis.on('scroll', ScrollTrigger.update)
  gsap.ticker.add((time) => lenis?.raf(time * 1000))
  gsap.ticker.lagSmoothing(0)
  return lenis
}

export function scrollToTarget(target: string | HTMLElement) {
  const el = typeof target === 'string' ? document.querySelector<HTMLElement>(target) : target
  if (!el) return
  if (lenis) lenis.scrollTo(el, { offset: -72, duration: 1.4 })
  else el.scrollIntoView({ behavior: prefersReducedMotion() ? 'auto' : 'smooth', block: 'start' })
  // Accesibilidad: mover el foco a la sección destino
  if (!el.hasAttribute('tabindex')) el.setAttribute('tabindex', '-1')
  el.focus({ preventScroll: true })
}

export function stopLenis() { lenis?.stop() }
export function startLenis() { lenis?.start() }

export function scrollToY(y: number) {
  if (lenis) lenis.scrollTo(y, { duration: 1.4 })
  else window.scrollTo({ top: y, behavior: prefersReducedMotion() ? 'auto' : 'smooth' })
}
