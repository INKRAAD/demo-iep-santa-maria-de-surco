const WORDS = ['Admisión 2027', 'Inicial', 'Primaria', 'Secundaria', 'Taekwondo', 'Danza', 'Centro de cómputo', 'Psicología', 'Entrar para aprender y salir para servir']

function Row({ words, star }: { words: string[]; star: string }) {
  return (
    <div className="flex shrink-0 items-center">
      {words.map((w, i) => (
        <span key={i} className="flex items-center">
          <span className="px-6 md:px-8 whitespace-nowrap">{w}</span>
          <svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path fill={star} d="M12 1l2.6 8.4L23 12l-8.4 2.6L12 23l-2.6-8.4L1 12l8.4-2.6z" /></svg>
        </span>
      ))}
    </div>
  )
}

/** Doble cinta cruzada en azul y coral: transición de marca entre hero y contenido. */
export default function Marquee() {
  return (
    <div className="relative py-10 md:py-14 overflow-hidden" aria-label="Niveles y talleres: Inicial, Primaria, Secundaria, Taekwondo, Danza, Centro de cómputo y Psicología" role="img">
      <div className="absolute inset-x-[-5%] top-1/2 -translate-y-1/2 rotate-[2.2deg] bg-coral py-3.5 text-white/95 font-semibold text-sm md:text-base" aria-hidden="true">
        <div className="marquee-track flex w-max [animation-direction:reverse] [animation-duration:46s]"><Row words={WORDS} star="#fff" /><Row words={WORDS} star="#fff" /></div>
      </div>
      <div className="relative inset-x-[-5%] w-[110%] -ml-[5%] -rotate-[1.8deg] bg-indigo py-4 md:py-5 text-white display text-2xl md:text-4xl shadow-[0_20px_50px_-20px_rgba(38,47,94,.7)]" aria-hidden="true">
        <div className="marquee-track flex w-max"><Row words={WORDS} star="#EF5155" /><Row words={WORDS} star="#EF5155" /></div>
      </div>
    </div>
  )
}
