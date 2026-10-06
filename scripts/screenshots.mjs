// Capturas con Playwright + Chrome headless.
// Uso: node scripts/screenshots.mjs [url]   (por defecto http://127.0.0.1:47391)
import { chromium } from 'playwright'
import { mkdirSync } from 'node:fs'

const BASE = process.argv[2] || 'http://127.0.0.1:47391'
const OUT = new URL('../screenshots/', import.meta.url).pathname
mkdirSync(OUT, { recursive: true })

const browser = await chromium.launch({
  channel: process.env.PW_CHANNEL || 'chrome',
  args: ['--use-gl=angle', '--use-angle=swiftshader', '--enable-unsafe-swiftshader', '--ignore-gpu-blocklist'],
})
const errors = []

async function shoot(name, viewport, opts = {}) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: opts.dpr || 1, isMobile: !!opts.mobile, hasTouch: !!opts.mobile, reducedMotion: opts.reduced ? 'reduce' : 'no-preference' })
  const page = await ctx.newPage()
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`[${name}] ${m.type()}: ${m.text()}`) })
  page.on('pageerror', (e) => errors.push(`[${name}] pageerror: ${e.message}`))
  await page.goto(BASE + (opts.query || ''), { waitUntil: 'networkidle' })
  await page.waitForTimeout(opts.wait ?? 4200)
  if (opts.full) {
    // recorrer para disparar animaciones de scroll
    const h = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y < h; y += Math.round(viewport.height * 0.6)) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(120) }
    await page.evaluate(() => window.scrollTo(0, 0)); await page.waitForTimeout(800)
    await page.screenshot({ path: `${OUT}${name}.png`, fullPage: true })
  } else if (opts.sections) {
    await page.screenshot({ path: `${OUT}${name}.png` })
    for (const [sel, label, extra] of opts.sections) {
      await page.evaluate(([s, ex]) => { const el = document.querySelector(s); if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + (ex || 0)) }, [sel, extra || 0])
      await page.waitForTimeout(1600)
      await page.screenshot({ path: `${OUT}${name}-${label}.png` })
    }
  } else {
    await page.screenshot({ path: `${OUT}${name}.png` })
  }
  await ctx.close()
}

const only = process.env.ONLY
const jobs = {
  desktop: () => shoot('desktop', { width: 1440, height: 900 }, { sections: [
    ['#nosotros', 'nosotros', -40], ['#niveles', 'niveles-intro'], ['#niveles .pin-spacer', 'niveles-1', 20], ['#niveles .pin-spacer', 'niveles-2', 1170], ['#niveles .pin-spacer', 'niveles-3', 2320],
    ['#servicios', 'servicios'], ['#vida-escolar', 'vida-escolar'], ['.depth-stage', 'galeria', -80], ['#resenas', 'resenas'], ['#admision', 'admision'], ['#contacto', 'contacto'], ['footer', 'footer'],
  ] }),
  mobile: () => shoot('mobile', { width: 390, height: 844 }, { mobile: true, dpr: 2, sections: [
    ['#nosotros', 'nosotros'], ['#niveles', 'niveles'], ['#servicios', 'servicios'], ['.depth-stage', 'galeria'], ['#resenas', 'resenas'], ['#admision', 'admision'], ['#contacto', 'contacto'],
  ] }),
  desktopFull: () => shoot('desktop-full', { width: 1440, height: 900 }, { full: true, reduced: true, wait: 1500 }),
  mobileFull: () => shoot('mobile-full', { width: 390, height: 844 }, { full: true, reduced: true, mobile: true, wait: 1500 }),
}
for (const [k, fn] of Object.entries(jobs)) { if (!only || only.split(',').includes(k)) await fn() }
await browser.close()
console.log(errors.length ? 'CONSOLA:\n' + errors.join('\n') : 'Sin errores ni advertencias en consola.')
