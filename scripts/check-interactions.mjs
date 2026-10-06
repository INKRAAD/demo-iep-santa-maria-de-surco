// QA de interacciones: validación del formulario, envío simulado y menú móvil.
import { chromium } from 'playwright'
const BASE = process.argv[2] || 'http://127.0.0.1:47391'
const OUT = new URL('../screenshots/', import.meta.url).pathname
const browser = await chromium.launch({ channel: process.env.PW_CHANNEL || 'chrome' })
const errors = []

// Escritorio: formulario
{
  const page = await browser.newPage({ viewport: { width: 1440, height: 900 } })
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message))
  page.on('console', (m) => { if (m.type() === 'error') errors.push('console: ' + m.text()) })
  await page.goto(BASE + '/?noloader', { waitUntil: 'networkidle' })
  await page.waitForFunction(() => document.documentElement.dataset.intro === 'done', null, { timeout: 20000 })
  await page.locator('#admision form').scrollIntoViewIfNeeded()
  await page.waitForTimeout(1200)
  await page.getByRole('button', { name: /Enviar solicitud/ }).click()
  await page.waitForTimeout(600)
  const errCount = await page.locator('#admision [aria-invalid="true"]').count()
  const focused = await page.evaluate(() => document.activeElement?.id || '')
  console.log('Campos inválidos tras enviar vacío:', errCount, '| foco en:', focused)
  await page.locator('#admision form').screenshot({ path: OUT + 'desktop-form-errores.png' })
  await page.getByLabel(/Nombre del padre/).fill('María Quispe Torres')
  await page.getByLabel(/Correo electrónico/).fill('maria@correo.com')
  await page.getByLabel(/Celular/).fill('912 345 678')
  await page.getByLabel(/Nombre del estudiante/).fill('Lucía')
  await page.locator('#admision label', { hasText: 'Primaria' }).first().click()
  await page.getByLabel(/Grado o edad/).selectOption({ label: '3.° grado' })
  await page.locator('#admision input[type="checkbox"]').check()
  await page.getByRole('button', { name: /Enviar solicitud/ }).click()
  await page.waitForSelector('#admision [role="status"]', { timeout: 5000 })
  await page.waitForTimeout(900)
  console.log('Estado enviado:', (await page.locator('#admision [role="status"] h3').textContent())?.trim())
  await page.locator('#admision .card').last().screenshot({ path: OUT + 'desktop-form-enviado.png' })
  await page.close()
}
// Móvil: menú
{
  const ctx = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true, hasTouch: true, deviceScaleFactor: 2 })
  const page = await ctx.newPage()
  page.on('pageerror', (e) => errors.push('pageerror: ' + e.message))
  await page.goto(BASE + '/?noloader', { waitUntil: 'networkidle' })
  await page.getByRole('button', { name: /Menú/ }).click()
  await page.waitForTimeout(900)
  await page.screenshot({ path: OUT + 'mobile-menu.png' })
  await page.keyboard.press('Escape')
  await page.waitForTimeout(700)
  console.log('Menú cerrado con Escape:', (await page.locator('#menu-movil').count()) === 0)
  console.log('Ancho de documento móvil:', await page.evaluate(() => document.documentElement.scrollWidth))
  await ctx.close()
}
// Robustez: animaciones congeladas (requestAnimationFrame nunca dispara) → el hero debe quedar visible por los failsafes.
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  await ctx.addInitScript(() => { window.requestAnimationFrame = () => 0 })
  const page = await ctx.newPage()
  page.on('pageerror', (e) => errors.push('pageerror (rAF congelado): ' + e.message))
  await page.goto(BASE + '/?no3d', { waitUntil: 'networkidle' })
  await page.waitForFunction(() => document.documentElement.dataset.intro === 'done', null, { timeout: 15000, polling: 250 })
  const st = await page.evaluate(() => ({
    loader: !!document.querySelector('.ld-indigo'),
    words: [...document.querySelectorAll('.hero-word')].every((w) => ['none', 'matrix(1, 0, 0, 1, 0, 0)'].includes(getComputedStyle(w).transform)),
    fades: [...document.querySelectorAll('.hero-fade, .hero-chip')].every((f) => +getComputedStyle(f).opacity > 0.99),
  }))
  await page.screenshot({ path: OUT + 'qa-raf-congelado.png' })
  console.log('Hero visible con rAF congelado:', !st.loader && st.words && st.fades, JSON.stringify(st))
  await ctx.close()
}
// Red de seguridad CSS (data-intro="forced"): aunque la intro deje estilos ocultos en línea, el hero se ve.
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } })
  const page = await ctx.newPage()
  await page.goto(BASE + '/?noloader&no3d', { waitUntil: 'networkidle' })
  await page.waitForFunction(() => document.documentElement.dataset.intro === 'done', null, { timeout: 15000 })
  const ok = await page.evaluate(() => {
    const els = [...document.querySelectorAll('.hero-chip, .hero-word, .hero-fade')]
    els.forEach((el) => { el.style.opacity = '0'; el.style.transform = 'translateY(115%)' }) // simula una intro detenida a mitad
    document.documentElement.dataset.intro = 'forced'
    return els.every((el) => +getComputedStyle(el).opacity === 1 && getComputedStyle(el).transform === 'none')
  })
  console.log('Red de seguridad CSS deja el hero visible:', ok)
  await ctx.close()
}
// Sin JavaScript: debe verse el hero estático del <noscript> (titular, texto y botones).
{
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 }, javaScriptEnabled: false })
  const page = await ctx.newPage()
  await page.goto(BASE + '/', { waitUntil: 'networkidle' })
  const h1 = await page.locator('noscript h1, h1').first().textContent().catch(() => null)
  const links = await page.locator('a[href^="https://wa.me"], a[href^="tel:"]').count()
  await page.screenshot({ path: OUT + 'qa-sin-js.png' })
  console.log('Hero visible sin JavaScript:', !!h1 && h1.includes('servir') && links >= 2, JSON.stringify({ h1, links }))
  await ctx.close()
}
await browser.close()
console.log(errors.length ? errors.join('\n') : 'Sin errores de consola.')
