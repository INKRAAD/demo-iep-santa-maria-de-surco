import { useState } from 'react'
import { SCHOOL, waLink } from '../data/site'
import { useInView } from '../hooks/useInView'
import SectionHeading from './SectionHeading'
import { IconClock, IconExternal, IconFacebook, IconLock, IconMail, IconPin, IconWhatsApp } from './Icons'

export default function Location() {
  const [mapRef, near] = useInView<HTMLDivElement>('400px', true)
  const [loaded, setLoaded] = useState(false)

  const items = [
    { icon: IconPin, label: 'Dirección', value: SCHOOL.address, href: SCHOOL.maps, ext: true },
    { icon: IconWhatsApp, label: 'Teléfono y WhatsApp', value: SCHOOL.phone, href: waLink(), ext: true },
    { icon: IconMail, label: 'Correo', value: SCHOOL.email, href: `mailto:${SCHOOL.email}` },
    { icon: IconFacebook, label: 'Facebook', value: 'I.E.P. “Santa María de Surco”', href: SCHOOL.facebook, ext: true },
    { icon: IconLock, label: 'Intranet', value: 'Plataforma CUBICOL', href: SCHOOL.intranet, ext: true },
    { icon: IconClock, label: 'Atención', value: `${SCHOOL.shift} · horario de atención por confirmar`, href: undefined },
  ]

  return (
    <section id="contacto" className="relative py-24 md:py-36 bg-white" aria-labelledby="contacto-title">
      <div className="container-x">
        <SectionHeading eyebrow="Visítanos" title={<>Te esperamos en <span className="text-coral">Surco</span></>} id="contacto-title">
          Estamos en {SCHOOL.street}, Santiago de Surco. Coordina tu visita y conoce nuestras aulas.
        </SectionHeading>

        <div className="mt-14 grid grid-cols-1 lg:grid-cols-[1.25fr_1fr] gap-6">
          <div ref={mapRef} className="reveal relative min-h-[380px] lg:min-h-[520px] rounded-[2rem] overflow-hidden bg-indigo-soft ring-1 ring-indigo/10">
            {/* Placeholder de marca mientras carga el mapa */}
            <div className={`absolute inset-0 grid place-items-center transition-opacity duration-700 ${loaded ? 'opacity-0' : 'opacity-100'}`} aria-hidden={loaded}>
              <svg className="absolute inset-0 w-full h-full" aria-hidden="true">
                <defs><pattern id="grid-map" width="48" height="48" patternUnits="userSpaceOnUse"><path d="M48 0H0V48" fill="none" stroke="#3C4984" strokeOpacity=".12" /></pattern></defs>
                <rect width="100%" height="100%" fill="url(#grid-map)" />
                <path d="M-20 300 C 200 240, 380 360, 900 200" stroke="#fff" strokeWidth="26" fill="none" />
                <path d="M300 -20 C 330 200, 280 420, 360 900" stroke="#fff" strokeWidth="18" fill="none" />
              </svg>
              <div className="relative flex flex-col items-center">
                <span className="grid place-items-center w-16 h-16 rounded-full bg-coral text-white shadow-xl"><IconPin size={30} /></span>
                <span className="mt-3 rounded-full bg-white px-4 py-2 text-sm font-bold text-indigo shadow">{SCHOOL.street}, Surco</span>
              </div>
            </div>
            {near && (
              <iframe
                title={`Mapa de ubicación de ${SCHOOL.name}, ${SCHOOL.address}`}
                src={SCHOOL.mapsEmbed}
                className={`absolute inset-0 w-full h-full border-0 transition-opacity duration-700 ${loaded ? 'opacity-100' : 'opacity-0'}`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                onLoad={() => setLoaded(true)}
              />
            )}
            <a href={SCHOOL.maps} target="_blank" rel="noopener noreferrer" className="absolute left-4 bottom-4 btn btn-primary !py-3 text-sm shadow-xl">
              Cómo llegar <IconExternal size={16} />
            </a>
          </div>

          <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 min-w-0">
            {items.map(({ icon: Icon, label, value, href, ext }) => {
              const inner = (
                <>
                  <span className="grid place-items-center shrink-0 w-12 h-12 rounded-2xl bg-indigo-soft text-indigo group-hover:bg-coral group-hover:text-white transition-colors"><Icon size={22} /></span>
                  <span className="min-w-0">
                    <span className="block text-xs font-bold tracking-[.14em] uppercase text-muted">{label}</span>
                    <span className="block font-semibold text-ink break-words">{value}</span>
                  </span>
                </>
              )
              return (
                <li key={label} className="reveal">
                  {href ? (
                    <a href={href} {...(ext ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="group flex items-center gap-4 rounded-2xl p-4 bg-paper hover:bg-white hover:shadow-[0_20px_40px_-25px_rgba(30,34,56,.45)] ring-1 ring-indigo/5 transition-all">{inner}</a>
                  ) : (
                    <div className="group flex items-center gap-4 rounded-2xl p-4 bg-paper ring-1 ring-indigo/5">{inner}</div>
                  )}
                </li>
              )
            })}
          </ul>
        </div>
      </div>
    </section>
  )
}
