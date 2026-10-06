import type { ReactNode } from 'react'

export default function SectionHeading({ eyebrow, title, children, light = false, id, align = 'left' }: { eyebrow: string; title: ReactNode; children?: ReactNode; light?: boolean; id?: string; align?: 'left' | 'center' }) {
  return (
    <div className={`max-w-3xl ${align === 'center' ? 'mx-auto text-center' : ''}`}>
      <p className={`eyebrow reveal flex items-center gap-3 ${align === 'center' ? 'justify-center' : ''} ${light ? 'text-[#FF9C9E]' : 'text-coral-ink'}`}>
        <span className="inline-block w-8 h-[2px] bg-current" aria-hidden="true" />
        {eyebrow}
      </p>
      <h2 id={id} className={`display reveal mt-4 text-[clamp(2.2rem,5vw,4rem)] ${light ? 'text-white' : 'text-ink'}`}>{title}</h2>
      {children && <div className={`reveal mt-5 text-lg leading-relaxed ${light ? 'text-white/80' : 'text-muted'}`}>{children}</div>}
    </div>
  )
}
