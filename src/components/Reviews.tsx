import { REVIEWS, SCHOOL } from '../data/site'
import { IconExternal, IconStar } from './Icons'

function Stars({ n = 5, size = 18, className = '' }: { n?: number; size?: number; className?: string }) {
  return (
    <span className={`flex ${className}`} role="img" aria-label={`${n} de 5 estrellas`}>
      {Array.from({ length: 5 }).map((_, i) => <IconStar key={i} size={size} className={i < n ? '' : 'opacity-25'} />)}
    </span>
  )
}

export default function Reviews() {
  return (
    <section id="resenas" className="relative py-24 md:py-32 bg-indigo-night text-white overflow-hidden" aria-labelledby="resenas-title">
      <div aria-hidden="true" className="absolute -left-40 top-10 w-[520px] h-[520px] rounded-full bg-indigo/60 blur-3xl" />
      <div aria-hidden="true" className="absolute right-[-10%] bottom-[-30%] w-[480px] h-[480px] rounded-full bg-coral/20 blur-3xl" />
      <div className="container-x relative grid grid-cols-1 lg:grid-cols-[.85fr_1.15fr] gap-14 items-start">
        <div className="reveal">
          <p className="eyebrow text-[#FF9C9E] flex items-center gap-3"><span className="inline-block w-8 h-[2px] bg-current" aria-hidden="true" />Reseñas reales</p>
          <h2 id="resenas-title" className="display mt-4 text-[clamp(2.2rem,5vw,4rem)]">Opiniones en <span className="text-coral-light">Google</span></h2>
          <div className="mt-10 flex items-end gap-5">
            <p className="display text-[7rem] leading-[.8]">{SCHOOL.rating}</p>
            <div className="pb-2">
              <Stars size={24} className="text-coral-light" />
              <p className="mt-2 font-semibold">{SCHOOL.reviews} reseñas en Google Maps</p>
            </div>
          </div>
          <p className="mt-6 text-sm text-white/70 max-w-md leading-relaxed">
            * Calificación y reseñas tomadas de la ficha pública de Google Maps a través de un servicio de terceros el {SCHOOL.ratingCheckedOn}. Cifra pendiente de verificar en vivo; se mostrará actualizada en la versión final.
          </p>
          <a href={SCHOOL.maps} target="_blank" rel="noopener noreferrer" className="btn btn-light mt-8">
            <span className="hidden sm:inline">¿Eres familia SMS?</span> Déjanos tu reseña <IconExternal size={17} />
          </a>
        </div>

        <ul className="grid gap-5">
          {REVIEWS.map((r, i) => (
            <li key={i} className={`reveal relative rounded-[1.75rem] p-7 md:p-8 ${i === 0 ? 'bg-white text-ink' : 'bg-white/[.06] ring-1 ring-white/10'} ${i === 1 ? 'lg:ml-16' : ''} ${i === 2 ? 'lg:mr-16' : ''}`}>
              <span aria-hidden="true" className={`absolute right-6 top-2 display text-8xl leading-none ${i === 0 ? 'text-coral/25' : 'text-white/10'}`}>”</span>
              <Stars n={r.stars} className={i === 0 ? 'text-coral' : 'text-coral-light'} />
              <blockquote className={`mt-4 ${i === 0 ? 'display text-2xl md:text-[1.75rem] leading-snug text-indigo-deep' : 'text-lg'}`}>“{r.text}”</blockquote>
              <p className={`mt-4 text-xs font-semibold ${i === 0 ? 'text-muted' : 'text-white/65'}`}>Reseña de Google · {r.date}{i === 0 ? ' · ortografía original' : ''}</p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  )
}
