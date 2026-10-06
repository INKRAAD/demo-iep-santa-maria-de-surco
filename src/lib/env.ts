export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches

export const finePointer = () =>
  typeof window !== 'undefined' && window.matchMedia('(hover: hover) and (pointer: fine)').matches

export function hasWebGL(): boolean {
  try {
    const c = document.createElement('canvas')
    const gl = (c.getContext('webgl2') || c.getContext('webgl')) as WebGLRenderingContext | null
    if (!gl) return false
    const ok = typeof gl.getParameter === 'function'
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    return ok
  } catch {
    return false
  }
}

/** El 3D solo se carga en escritorio, con WebGL, sin "ahorro de datos" y sin movimiento reducido. */
export function canUse3D(): boolean {
  if (typeof window === 'undefined') return false
  const params = new URLSearchParams(window.location.search)
  if (params.has('no3d')) return false
  if (params.has('force3d')) return hasWebGL()
  const conn = (navigator as Navigator & { connection?: { saveData?: boolean } }).connection
  if (conn?.saveData) return false
  if (prefersReducedMotion()) return false
  if (!window.matchMedia('(min-width: 900px)').matches) return false
  const cores = navigator.hardwareConcurrency ?? 4
  if (cores < 4) return false
  return hasWebGL()
}
