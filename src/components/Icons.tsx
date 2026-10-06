import type { SVGProps } from 'react'

type P = SVGProps<SVGSVGElement> & { size?: number }
const base = (size = 24, p: P) => ({
  width: size, height: size, viewBox: '0 0 24 24', fill: 'none', stroke: 'currentColor',
  strokeWidth: 1.8, strokeLinecap: 'round' as const, strokeLinejoin: 'round' as const, 'aria-hidden': true, ...p,
})

export const IconArrow = ({ size, ...p }: P) => (<svg {...base(size, p)}><path d="M5 12h14M13 6l6 6-6 6" /></svg>)
export const IconArrowDown = ({ size, ...p }: P) => (<svg {...base(size, p)}><path d="M12 5v14M6 13l6 6 6-6" /></svg>)
export const IconCheck = ({ size, ...p }: P) => (<svg {...base(size, p)}><path d="M5 12.5l4.2 4.2L19 7" /></svg>)
export const IconStar = ({ size = 20, ...p }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...p}><path fill="currentColor" d="M12 2.8l2.8 5.9 6.4.8-4.7 4.4 1.2 6.4L12 17.2 6.3 20.3l1.2-6.4L2.8 9.5l6.4-.8z" /></svg>
)
export const IconPin = ({ size, ...p }: P) => (<svg {...base(size, p)}><path d="M12 21s-7-6.2-7-11.5A7 7 0 0 1 19 9.5C19 14.8 12 21 12 21z" /><circle cx="12" cy="9.5" r="2.6" /></svg>)
export const IconPhone = ({ size, ...p }: P) => (<svg {...base(size, p)}><path d="M5 4h3.5l1.6 4.2-2.2 1.5a11 11 0 0 0 6.4 6.4l1.5-2.2L20 15.5V19a1.5 1.5 0 0 1-1.6 1.5C10.6 20 4 13.4 3.5 5.6A1.5 1.5 0 0 1 5 4z" /></svg>)
export const IconMail = ({ size, ...p }: P) => (<svg {...base(size, p)}><rect x="3" y="5" width="18" height="14" rx="2.5" /><path d="M4 7l8 6 8-6" /></svg>)
export const IconClock = ({ size, ...p }: P) => (<svg {...base(size, p)}><circle cx="12" cy="12" r="8.5" /><path d="M12 7.5V12l3 2" /></svg>)
export const IconLock = ({ size, ...p }: P) => (<svg {...base(size, p)}><rect x="4.5" y="10.5" width="15" height="10" rx="2.5" /><path d="M8 10.5V8a4 4 0 0 1 8 0v2.5" /><path d="M12 14.5v2.5" /></svg>)
export const IconMenu = ({ size, ...p }: P) => (<svg {...base(size, p)}><path d="M4 8h16M4 16h10" /></svg>)
export const IconClose = ({ size, ...p }: P) => (<svg {...base(size, p)}><path d="M6 6l12 12M18 6L6 18" /></svg>)
export const IconExternal = ({ size, ...p }: P) => (<svg {...base(size, p)}><path d="M14 4h6v6M20 4l-9 9M18 14v4.5a1.5 1.5 0 0 1-1.5 1.5h-11A1.5 1.5 0 0 1 4 18.5v-11A1.5 1.5 0 0 1 5.5 6H10" /></svg>)
export const IconInfo = ({ size, ...p }: P) => (<svg {...base(size, p)}><circle cx="12" cy="12" r="8.5" /><path d="M12 11v5M12 8h.01" /></svg>)

/* Iconos de servicios: trazo lineal como el emblema */
export const IconComputer = ({ size, ...p }: P) => (<svg {...base(size, p)}><rect x="3" y="4" width="18" height="12" rx="2" /><path d="M8 20h8M12 16v4" /><path d="M8 10l2 2-2 2M12.5 14H16" /></svg>)
export const IconMind = ({ size, ...p }: P) => (<svg {...base(size, p)}><path d="M9 20v-3.2A7 7 0 1 1 18.6 11l1.4 3.2h-2V17a2 2 0 0 1-2 2h-2v1" /><path d="M11.2 12.6l-1.6-1.5a1.2 1.2 0 0 1 1.7-1.7l.3.3.3-.3a1.2 1.2 0 0 1 1.7 1.7z" /></svg>)
export const IconShield = ({ size, ...p }: P) => (<svg {...base(size, p)}><path d="M12 3l7.5 3v5.5c0 4.6-3.2 8.2-7.5 9.5-4.3-1.3-7.5-4.9-7.5-9.5V6z" /><path d="M8.8 12.2l2.2 2.2 4.2-4.4" /></svg>)
export const IconBelt = ({ size, ...p }: P) => (<svg {...base(size, p)}><path d="M3 9.5h18M3 13.5h18" /><path d="M10 9.5l-2.5 10M14 9.5l2.5 10" /><rect x="9.5" y="8" width="5" height="7" rx="1.5" /><circle cx="12" cy="5" r="1.6" /></svg>)
export const IconDance = ({ size, ...p }: P) => (<svg {...base(size, p)}><circle cx="12" cy="4.6" r="1.8" /><path d="M12 7v5M12 9l-4-2M12 9l4.5-1.5" /><path d="M12 12c-3 0-6.5 2.5-7.5 8h15c-1-5.5-4.5-8-7.5-8z" /><path d="M8 16.5c1.2.8 2.5 1 4 1s2.8-.2 4-1" /></svg>)
export const IconBook = ({ size, ...p }: P) => (<svg {...base(size, p)}><path d="M3 5.5c3-1 6-1 9 1 3-2 6-2 9-1V19c-3-1-6-1-9 1-3-2-6-2-9-1z" /><path d="M12 6.5V20" /></svg>)
export const IconHeart = ({ size, ...p }: P) => (<svg {...base(size, p)}><path d="M12 20s-7.5-4.6-7.5-10A4.3 4.3 0 0 1 12 7.4 4.3 4.3 0 0 1 19.5 10c0 5.4-7.5 10-7.5 10z" /></svg>)
export const IconHands = ({ size, ...p }: P) => (<svg {...base(size, p)}><path d="M12 21c-2-2.5-5-3.5-5-7.5V7.8a1.3 1.3 0 0 1 2.6 0V12" /><path d="M12 21c2-2.5 5-3.5 5-7.5V7.8a1.3 1.3 0 0 0-2.6 0V12" /><path d="M12 21V9.5a2.2 2.2 0 0 0-2.4-2" /><path d="M12 9.5a2.2 2.2 0 0 1 2.4-2" /><path d="M12 2.5v2" /></svg>)

export const IconWhatsApp = ({ size = 24, ...p }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path fill="currentColor" d="M12.04 2C6.58 2 2.13 6.45 2.13 11.91c0 1.75.46 3.45 1.32 4.95L2.05 22l5.25-1.38a9.9 9.9 0 0 0 4.74 1.21c5.46 0 9.91-4.45 9.91-9.91C21.95 6.45 17.5 2 12.04 2zm0 18.15c-1.48 0-2.93-.4-4.2-1.15l-.3-.18-3.12.82.83-3.04-.2-.31a8.2 8.2 0 0 1-1.26-4.38c0-4.54 3.7-8.24 8.25-8.24 4.54 0 8.24 3.7 8.24 8.24 0 4.55-3.7 8.24-8.24 8.24zm4.52-6.16c-.25-.12-1.47-.72-1.69-.81-.23-.08-.39-.12-.56.13-.16.25-.64.81-.79.97-.14.17-.29.19-.54.06-.25-.12-1.05-.39-1.99-1.23-.74-.66-1.23-1.47-1.38-1.72-.14-.25-.02-.38.11-.51.11-.11.25-.29.37-.43.12-.15.17-.25.25-.42.08-.16.04-.31-.02-.43-.06-.12-.56-1.34-.76-1.84-.2-.48-.41-.42-.56-.43h-.48c-.17 0-.43.06-.66.31-.22.25-.86.85-.86 2.07 0 1.22.89 2.4 1.01 2.56.12.17 1.75 2.67 4.24 3.74.59.26 1.05.41 1.41.52.59.19 1.13.16 1.56.1.48-.07 1.47-.6 1.67-1.18.21-.58.21-1.07.14-1.18-.06-.1-.22-.16-.47-.28z" />
  </svg>
)
export const IconFacebook = ({ size = 22, ...p }: P) => (
  <svg width={size} height={size} viewBox="0 0 24 24" aria-hidden="true" {...p}>
    <path fill="currentColor" d="M13.5 21v-7.5h2.6l.4-3h-3V8.6c0-.9.3-1.5 1.5-1.5h1.6V4.4c-.3 0-1.2-.1-2.3-.1-2.3 0-3.9 1.4-3.9 4v2.2H7.8v3h2.6V21z" />
  </svg>
)
