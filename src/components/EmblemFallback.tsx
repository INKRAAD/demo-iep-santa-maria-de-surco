import emblem from '../assets/logo/logo-emblema.svg'

/** Versión ligera (sin WebGL): emblema SVG + útiles escolares en SVG flotando con CSS. */
function Pencil() {
  return (
    <svg viewBox="0 0 120 24" width="120" height="24" aria-hidden="true">
      <rect x="18" y="4" width="78" height="16" rx="2" fill="#EF5155" />
      <rect x="18" y="4" width="78" height="5" fill="#F7797C" />
      <rect x="96" y="4" width="10" height="16" fill="#D6D9E6" />
      <rect x="106" y="4" width="10" height="16" rx="3" fill="#F7A9AB" />
      <path d="M18 4 L2 12 L18 20 Z" fill="#F2D2A9" />
      <path d="M7 9.5 L2 12 L7 14.5 Z" fill="#3C4984" />
    </svg>
  )
}
function Books() {
  return (
    <svg viewBox="0 0 90 70" width="90" height="70" aria-hidden="true">
      <rect x="6" y="46" width="78" height="18" rx="3" fill="#3C4984" />
      <rect x="10" y="49" width="70" height="4" fill="#fff" opacity=".8" />
      <rect x="12" y="28" width="68" height="18" rx="3" fill="#EF5155" />
      <rect x="16" y="31" width="60" height="4" fill="#fff" opacity=".8" />
      <rect x="4" y="10" width="72" height="18" rx="3" fill="#E9ECF7" stroke="#3C4984" strokeWidth="2" />
    </svg>
  )
}
function Plane() {
  return (
    <svg viewBox="0 0 80 60" width="80" height="60" aria-hidden="true">
      <path d="M2 28 L78 2 L52 56 L38 36 Z" fill="#fff" stroke="#3C4984" strokeWidth="2.5" strokeLinejoin="round" />
      <path d="M38 36 L78 2" stroke="#3C4984" strokeWidth="2.5" />
    </svg>
  )
}
function Cap() {
  return (
    <svg viewBox="0 0 90 64" width="90" height="64" aria-hidden="true">
      <path d="M45 6 L88 24 L45 42 L2 24 Z" fill="#3C4984" />
      <path d="M22 33 V48 C22 56 68 56 68 48 V33 L45 42 Z" fill="#262F5E" />
      <path d="M80 27 V46" stroke="#EF5155" strokeWidth="3" strokeLinecap="round" />
      <circle cx="80" cy="49" r="4" fill="#EF5155" />
    </svg>
  )
}
function Star({ c = '#EF5155' }: { c?: string }) {
  return (
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path fill={c} d="M12 1l2.6 8.4L23 12l-8.4 2.6L12 23l-2.6-8.4L1 12l8.4-2.6z" /></svg>
  )
}

export default function EmblemFallback() {
  return (
    <div className="relative w-full h-full flex items-center justify-center">
      <img
        src={emblem}
        alt="Emblema del colegio: monograma SMS sobre la Virgen María orante y un libro abierto"
        className="relative z-10 w-[46%] max-w-[260px] h-auto floaty drop-shadow-[0_30px_40px_rgba(60,73,132,.25)]"
        width={260}
        height={323}
      />
      <div className="absolute left-[4%] top-[18%] floaty" style={{ ['--r' as string]: '-24deg', animationDelay: '-1s' }}><Pencil /></div>
      <div className="absolute right-[2%] top-[12%] floaty" style={{ ['--r' as string]: '8deg', animationDelay: '-3s' }}><Plane /></div>
      <div className="absolute left-[6%] bottom-[14%] floaty" style={{ ['--r' as string]: '-6deg', animationDelay: '-2s' }}><Books /></div>
      <div className="absolute right-[6%] bottom-[18%] floaty" style={{ ['--r' as string]: '10deg', animationDelay: '-4s' }}><Cap /></div>
      <div className="absolute left-[30%] top-[4%] floaty" style={{ animationDelay: '-2.5s' }}><Star /></div>
      <div className="absolute right-[28%] bottom-[4%] floaty" style={{ animationDelay: '-1.5s' }}><Star c="#3C4984" /></div>
    </div>
  )
}
