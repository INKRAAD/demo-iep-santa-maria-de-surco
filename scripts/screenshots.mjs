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

// Espera la señal de fin de intro (loader + reveal del hero) y, si hay 3D, a que termine el fundido.
async function waitForIntro(page, name) {
  // data-intro: "done" (intro completa) o "forced" (red de seguridad a los 9 s; se reporta como problema).
  await page.waitForFunction(() => ['done', 'forced'].includes(document.documentElement.dataset.intro) && document.documentElement.dataset.hero3d && document.documentElement.dataset.hero3d !== 'loading', null, { timeout: 25000, polling: 200 })
  if ((await page.evaluate(() => document.documentElement.dataset.intro)) === 'forced') errors.push(`[${name}] La intro no terminó sola: se activó la red de seguridad (data-intro="forced").`)
  await page.waitForTimeout(1300) // fundido SVG → 3D (1 s)
  const hero = await page.evaluate(() => {
    const h1 = document.querySelector('#hero-title').getBoundingClientRect()
    const words = [...document.querySelectorAll('.hero-word')].map((w) => getComputedStyle(w).transform)
    const fades = [...document.querySelectorAll('.hero-fade, .hero-chip')].map((f) => +getComputedStyle(f).opacity)
    const loader = !!document.querySelector('.site-loader')
    const ok = !loader && words.every((t) => t === 'none' || t === 'matrix(1, 0, 0, 1, 0, 0)') && fades.every((o) => o > 0.99) && h1.height > 100
    return { ok, loader, words, fades, h1: Math.round(h1.height), hero3d: document.documentElement.dataset.hero3d }
  })
  if (!hero.ok) errors.push(`[${name}] HERO NO QUEDÓ EN ESTADO FINAL: ${JSON.stringify(hero)}`)
  console.log(`[${name}] hero ${hero.ok ? 'OK' : 'PROBLEMA'} (3D: ${hero.hero3d}, alto h1: ${hero.h1}px)`)
}

// Espera a que los elementos animados visibles terminen de aparecer (máx. 5 s).
async function waitSettled(page) {
  try {
    await page.waitForFunction(() => {
      const els = document.querySelectorAll('.reveal, .lv-in, .lv-photo, .depth-item, .counter-item, .act-card')
      for (const el of els) {
        const r = el.getBoundingClientRect()
        if (r.bottom > 0 && r.top < window.innerHeight * 0.9 && r.width > 0 && +getComputedStyle(el).opacity < 0.98) return false
      }
      return true
    }, null, { timeout: 5000, polling: 200 })
  } catch { /* se registra abajo */ }
  // Mapa embebido: esperar a que termine de cargar si está en pantalla
  const mapVisible = await page.evaluate(() => { const f = document.querySelector('#contacto iframe'); if (!f) return false; const r = f.getBoundingClientRect(); return r.top < innerHeight && r.bottom > 0 })
  if (mapVisible) {
    await page.waitForFunction(() => +getComputedStyle(document.querySelector('#contacto iframe')).opacity > 0.99, null, { timeout: 8000, polling: 200 }).catch(() => {})
    await page.waitForTimeout(1500)
  }
  await page.waitForTimeout(400)
}

async function shoot(name, viewport, opts = {}) {
  const ctx = await browser.newContext({ viewport, deviceScaleFactor: opts.dpr || 1, isMobile: !!opts.mobile, hasTouch: !!opts.mobile, reducedMotion: opts.reduced ? 'reduce' : 'no-preference' })
  const page = await ctx.newPage()
  page.on('console', (m) => { if (m.type() === 'error' || m.type() === 'warning') errors.push(`[${name}] ${m.type()}: ${m.text()}`) })
  page.on('pageerror', (e) => errors.push(`[${name}] pageerror: ${e.message}`))
  await page.goto(BASE + (opts.query || ''), { waitUntil: 'networkidle' })
  await waitForIntro(page, name)
  if (opts.full) {
    // Captura "cosida": se recorre la página por pantallas y se unen (evita artefactos del fullPage de Chrome en páginas altas)
    const h = await page.evaluate(() => document.documentElement.scrollHeight)
    for (let y = 0; y < h; y += Math.round(viewport.height * 0.6)) { await page.evaluate((yy) => window.scrollTo(0, yy), y); await page.waitForTimeout(150) }
    await page.waitForTimeout(800)
    const total = await page.evaluate(() => document.documentElement.scrollHeight)
    const parts = []
    for (let y = 0, i = 0; y < total; y += viewport.height, i++) {
      await page.evaluate((yy) => window.scrollTo(0, yy), y)
      if (i === 1) await page.addStyleTag({ content: 'header, a[aria-label^="Escríbenos por WhatsApp"] { visibility: hidden !important; }' })
      await page.waitForTimeout(450)
      const real = await page.evaluate(() => window.scrollY)
      const file = `${OUT}_part${i}.png`
      await page.screenshot({ path: file })
      parts.push({ file, y: real })
    }
    const { execFileSync } = await import('node:child_process')
    execFileSync('python3', ['-c', `
import json,sys,os
from PIL import Image
parts=json.loads(sys.argv[1]); total=int(sys.argv[2]); out=sys.argv[3]
first=Image.open(parts[0]['file']); W,H=first.size; s=W/${viewport.width}
canvas=Image.new('RGB',(W,int(total*s)),'white')
for p in parts:
    im=Image.open(p['file']); canvas.paste(im,(0,int(p['y']*s)))
    os.remove(p['file'])
canvas.save(out)
`, JSON.stringify(parts), String(total), `${OUT}${name}.png`])
  } else if (opts.sections) {
    await page.screenshot({ path: `${OUT}${name}.png` })
    for (const [sel, label, extra] of opts.sections) {
      await page.evaluate(([s, ex]) => { const el = document.querySelector(s); if (el) window.scrollTo(0, el.getBoundingClientRect().top + window.scrollY + (ex || 0)) }, [sel, extra || 0])
      await page.waitForTimeout(900)
      await waitSettled(page)
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
    ['#servicios', 'servicios'], ['#vida-escolar', 'vida-escolar'], ['#galeria', 'galeria', -110], ['#resenas', 'resenas'], ['#admision', 'admision'], ['#contacto', 'contacto'], ['footer', 'footer'],
  ] }),
  mobile: () => shoot('mobile', { width: 390, height: 844 }, { mobile: true, dpr: 2, sections: [
    ['#nosotros', 'nosotros'], ['#niveles', 'niveles'], ['#servicios', 'servicios'], ['.depth-stage', 'galeria'], ['#resenas', 'resenas'], ['#admision', 'admision'], ['#contacto', 'contacto'],
  ] }),
  desktopFull: () => shoot('desktop-full', { width: 1440, height: 900 }, { full: true, reduced: true }),
  mobileFull: () => shoot('mobile-full', { width: 390, height: 844 }, { full: true, reduced: true, mobile: true }),
}
for (const [k, fn] of Object.entries(jobs)) { if (!only || only.split(',').includes(k)) await fn() }
await browser.close()
console.log(errors.length ? 'CONSOLA:\n' + errors.join('\n') : 'Sin errores ni advertencias en consola.')
