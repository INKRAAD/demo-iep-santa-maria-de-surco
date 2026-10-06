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
await browser.close()
console.log(errors.length ? errors.join('\n') : 'Sin errores de consola.')
