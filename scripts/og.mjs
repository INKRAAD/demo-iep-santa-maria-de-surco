// Genera public/og-image.png (1200x630) con las fuentes y el logo de la demo.
import { chromium } from 'playwright'
import { readFileSync } from 'node:fs'
const root = new URL('..', import.meta.url).pathname
const font = (p) => 'data:font/woff2;base64,' + readFileSync(root + 'node_modules/' + p).toString('base64')
const svg = (p) => 'data:image/svg+xml;base64,' + readFileSync(root + p).toString('base64')
const html = `<!doctype html><html><head><style>
@font-face{font-family:PF;font-style:italic;font-weight:600;src:url(${font('@fontsource/playfair-display/files/playfair-display-latin-600-italic.woff2')})}
@font-face{font-family:MS;font-weight:100 900;src:url(${font('@fontsource-variable/montserrat/files/montserrat-latin-wght-normal.woff2')})}
*{margin:0;box-sizing:border-box}body{width:1200px;height:630px;background:#3C4984;color:#fff;font-family:MS;position:relative;overflow:hidden}
.ring{position:absolute;right:-120px;top:-160px;width:620px;height:620px;border-radius:50%;border:70px solid rgba(239,81,85,.35)}
.soft{position:absolute;left:-80px;bottom:-120px;width:360px;height:360px;border-radius:50%;background:rgba(255,255,255,.06)}
.wrap{position:absolute;inset:0;display:flex;align-items:center;gap:64px;padding:0 90px}
.em{width:250px;height:auto;filter:drop-shadow(0 30px 40px rgba(0,0,0,.25))}
.k{font-weight:700;letter-spacing:.22em;font-size:18px;text-transform:uppercase;color:#FF9C9E}
h1{font-family:PF;font-style:italic;font-weight:600;font-size:76px;line-height:1;margin-top:18px}
p{margin-top:22px;font-size:26px;opacity:.9}
.chip{display:inline-block;margin-top:30px;background:#EF5155;padding:12px 26px;border-radius:999px;font-weight:700;font-size:22px}
.band{position:absolute;left:0;right:0;bottom:0;height:14px;display:grid;grid-template-columns:2fr 1fr}.band i:first-child{background:#262F5E}.band i:last-child{background:#EF5155}
</style></head><body><div class="ring"></div><div class="soft"></div>
<div class="wrap"><img class="em" src="${svg('src/assets/logo/logo-emblema-blanco.svg')}"><div>
<div class="k">Inicial · Primaria · Secundaria · Surco</div>
<h1>Santa María<br>de Surco</h1>
<p>“Entrar para aprender y salir para servir”</p>
<span class="chip">Admisión 2027</span></div></div><div class="band"><i></i><i></i></div></body></html>`
const b = await chromium.launch({ channel: process.env.PW_CHANNEL || 'chrome' })
const p = await b.newPage({ viewport: { width: 1200, height: 630 } })
await p.setContent(html, { waitUntil: 'load' })
await p.waitForTimeout(300)
await p.screenshot({ path: root + 'public/og-image.png' })
await b.close()
console.log('public/og-image.png generado')
