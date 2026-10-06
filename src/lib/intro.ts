/**
 * Señales de estado en <html> para QA/capturas:
 *  data-intro="done"      → la intro del hero terminó (o se omitió) y el contenido está en su estado final.
 *  data-intro="forced"    → la intro no terminó a tiempo y se forzó el estado final por CSS (red de seguridad).
 *  data-hero3d="loading" | "ready" | "off"
 */
export function markIntroDone() {
  document.documentElement.dataset.intro = 'done'
}
export function setHero3DState(state: 'loading' | 'ready' | 'off') {
  document.documentElement.dataset.hero3d = state
}

/**
 * Última red de seguridad: si por cualquier motivo (error de JS, rAF detenido, timeline que nunca arrancó)
 * la intro no marcó "done" a tiempo, se fuerza por CSS el estado final visible (ver index.css) y se oculta el loader.
 */
export function armIntroSafetyNet(ms = 9000) {
  window.setTimeout(() => {
    const d = document.documentElement.dataset
    if (d.intro !== 'done') d.intro = 'forced'
  }, ms)
}
