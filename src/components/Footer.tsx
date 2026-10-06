import { NAV, SCHOOL, waLink } from '../data/site'
import { scrollToTarget } from '../lib/lenis'
import { IconFacebook, IconLock, IconWhatsApp } from './Icons'
import logoWhite from '../assets/logo/logo-horizontal-blanco.svg'

export default function Footer() {
  return (
    <footer className="relative bg-indigo-night text-white overflow-hidden" aria-labelledby="footer-title">
      <h2 id="footer-title" className="sr-only">Pie de página</h2>
      {/* Cinta de cierre coral/azul */}
      <div aria-hidden="true" className="h-2 grid grid-cols-[2fr_1fr]"><span className="bg-indigo" /><span className="bg-coral" /></div>
      <div className="container-x py-16 md:py-20">
        <div className="grid lg:grid-cols-[1.4fr_1fr_1fr] gap-12">
          <div>
            <img src={logoWhite} alt="Corporación Educativa “Santa María de Surco”" className="h-16 md:h-20 w-auto" width={298} height={80} loading="lazy" />
            <p className="display mt-8 text-3xl md:text-4xl max-w-md leading-tight">“Entrar para <span className="text-coral-light">aprender</span> y salir para <span className="text-coral-light">servir</span>”</p>
          </div>
          <nav aria-label="Pie de página">
            <p className="eyebrow text-white/60">Explora</p>
            <ul className="mt-5 grid gap-2.5">
              {NAV.map((n) => (
                <li key={n.href}><a href={n.href} onClick={(e) => { e.preventDefault(); scrollToTarget(n.href) }} className="text-white/85 hover:text-coral-light transition-colors">{n.label}</a></li>
              ))}
            </ul>
          </nav>
          <div>
            <p className="eyebrow text-white/60">Contacto</p>
            <address className="not-italic mt-5 grid gap-2.5 text-white/85">
              <span>{SCHOOL.address}</span>
              <a href={SCHOOL.phoneHref} className="hover:text-coral-light">{SCHOOL.phone}</a>
              <a href={`mailto:${SCHOOL.email}`} className="hover:text-coral-light break-all">{SCHOOL.email}</a>
            </address>
            <div className="mt-6 flex gap-3">
              <a href={SCHOOL.facebook} target="_blank" rel="noopener noreferrer" aria-label="Facebook del colegio" className="grid place-items-center w-11 h-11 rounded-full bg-white/10 hover:bg-coral transition-colors"><IconFacebook /></a>
              <a href={waLink()} target="_blank" rel="noopener noreferrer" aria-label="WhatsApp del colegio" className="grid place-items-center w-11 h-11 rounded-full bg-white/10 hover:bg-coral transition-colors"><IconWhatsApp size={22} /></a>
              <a href={SCHOOL.intranet} target="_blank" rel="noopener noreferrer" aria-label="Intranet CUBICOL" className="grid place-items-center w-11 h-11 rounded-full bg-white/10 hover:bg-coral transition-colors"><IconLock size={20} /></a>
            </div>
          </div>
        </div>
        <div className="mt-16 pt-8 border-t border-white/10 flex flex-col md:flex-row gap-4 justify-between text-xs text-white/60">
          <p>© {new Date().getFullYear()} {SCHOOL.legalName} · RUC {SCHOOL.ruc}</p>
          <p>Demo conceptual de rediseño · propuesta no oficial · los datos marcados “de ejemplo” son ilustrativos.</p>
        </div>
      </div>
    </footer>
  )
}
