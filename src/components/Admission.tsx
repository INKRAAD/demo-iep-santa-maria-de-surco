import { useId, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'motion/react'
import { ADMISSION_STEPS, GRADES, REQUIREMENTS, SCHOOL, waLink } from '../data/site'
import { IconArrow, IconCheck, IconClock, IconInfo, IconWhatsApp } from './Icons'

type Values = { parent: string; email: string; phone: string; student: string; level: string; grade: string; message: string; consent: boolean }
type Errors = Partial<Record<keyof Values, string>>

const EMPTY: Values = { parent: '', email: '', phone: '', student: '', level: '', grade: '', message: '', consent: false }

function validate(v: Values): Errors {
  const e: Errors = {}
  if (v.parent.trim().length < 3) e.parent = 'Escribe tu nombre completo.'
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v.email.trim())) e.email = 'Ingresa un correo válido (ej. nombre@correo.com).'
  const digits = v.phone.replace(/\D/g, '').replace(/^51/, '')
  if (!/^9\d{8}$/.test(digits)) e.phone = 'Ingresa un celular peruano de 9 dígitos que empiece con 9.'
  if (v.student.trim().length < 2) e.student = 'Escribe el nombre del estudiante.'
  if (!v.level) e.level = 'Elige un nivel.'
  if (!v.grade) e.grade = 'Elige el grado o edad.'
  if (!v.consent) e.consent = 'Necesitamos tu autorización para contactarte.'
  return e
}

export default function Admission() {
  const [v, setV] = useState<Values>(EMPTY)
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<keyof Values, boolean>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const formRef = useRef<HTMLFormElement>(null)
  const uid = useId()
  const f = (k: keyof Values) => `${uid}-${k}`

  const set = <K extends keyof Values>(k: K, val: Values[K]) => {
    const next = { ...v, [k]: val, ...(k === 'level' ? { grade: '' } : {}) }
    setV(next)
    if (touched[k]) setErrors(validate(next))
  }
  const blur = (k: keyof Values) => { setTouched((t) => ({ ...t, [k]: true })); setErrors(validate(v)) }

  const submit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate(v)
    setErrors(errs)
    setTouched(Object.fromEntries(Object.keys(EMPTY).map((k) => [k, true])))
    const first = Object.keys(errs)[0] as keyof Values | undefined
    if (first) { document.getElementById(f(first))?.focus(); return }
    setStatus('sending')
    // Envío SIMULADO: la demo no envía datos a ningún servidor.
    window.setTimeout(() => setStatus('sent'), 1300)
  }

  const err = (k: keyof Values) => (touched[k] ? errors[k] : undefined)
  const waSummary = waLink(`Hola, soy ${v.parent || '…'}. Quisiera información de Admisión 2027 para ${v.student || 'mi hijo(a)'} en ${v.level || '…'}${v.grade ? ` (${v.grade})` : ''}.`)

  return (
    <section id="admision" className="relative py-24 md:py-36 bg-paper overflow-hidden" aria-labelledby="admision-title">
      <div aria-hidden="true" className="absolute inset-x-0 top-0 h-[55%] bg-indigo grain" />
      <div aria-hidden="true" className="absolute right-[-8%] top-[-12%] w-[38vw] max-w-[520px] aspect-square rounded-full border-[48px] border-coral/30" />
      <div className="container-x relative grid lg:grid-cols-[1fr_1.05fr] gap-12 lg:gap-16">
        <div className="text-white">
          <p className="eyebrow reveal text-[#FF9C9E] flex items-center gap-3"><span className="inline-block w-8 h-[2px] bg-current" aria-hidden="true" />Proceso de admisión</p>
          <h2 id="admision-title" className="display reveal mt-4 text-[clamp(3rem,7vw,6rem)] leading-[.95]">Admisión <span className="text-coral-light">2027</span></h2>
          <p className="reveal mt-6 text-lg text-white/85 max-w-lg">Te acompañamos en cada paso. Déjanos tus datos y el equipo del colegio se comunicará contigo para coordinar una visita.</p>

          <ol className="reveal mt-10 grid sm:grid-cols-2 gap-3">
            {ADMISSION_STEPS.map((s, i) => (
              <li key={s.title} className="rounded-2xl bg-white/10 ring-1 ring-white/15 p-5 backdrop-blur-sm">
                <span className="display text-3xl text-coral-light">0{i + 1}</span>
                <h3 className="mt-1 font-bold">{s.title}</h3>
                <p className="mt-1 text-sm text-white/75">{s.text}</p>
              </li>
            ))}
          </ol>
          <p className="reveal mt-3"><span className="badge-ejemplo">Proceso referencial · contenido de ejemplo</span></p>

          <div className="reveal mt-10 card p-7 text-ink">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="display text-2xl text-indigo-deep">Requisitos</h3>
              <span className="badge-ejemplo">Lista de ejemplo</span>
            </div>
            <ul className="mt-4 grid gap-2.5">
              {REQUIREMENTS.map((r) => (
                <li key={r} className="flex gap-3 text-sm text-muted"><span className="mt-0.5 grid place-items-center shrink-0 w-5 h-5 rounded-full bg-indigo-soft text-indigo"><IconCheck size={13} /></span>{r}</li>
              ))}
            </ul>
            <p className="mt-4 text-xs text-muted">Lista referencial para la demo: el colegio confirmará los requisitos oficiales de Admisión 2027.</p>
            <hr className="my-6 border-indigo/10" />
            <div className="grid sm:grid-cols-2 gap-4 text-sm">
              <div className="flex gap-3"><IconClock size={20} className="text-indigo shrink-0" /><p><strong className="block text-ink">Horario escolar</strong><span className="text-muted">{SCHOOL.shift}. Horario detallado por confirmar con el colegio.</span></p></div>
              <div className="flex gap-3"><IconInfo size={20} className="text-indigo shrink-0" /><p><strong className="block text-ink">Pensiones 2027</strong><span className="text-muted">Se informan de forma personalizada por WhatsApp o en la visita.</span></p></div>
            </div>
          </div>
        </div>

        <div className="relative lg:pt-28">
          <div className="card p-6 sm:p-9 relative overflow-hidden min-h-[640px]">
            <AnimatePresence mode="wait">
              {status !== 'sent' ? (
                <motion.form
                  key="form"
                  ref={formRef}
                  noValidate
                  onSubmit={submit}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  aria-describedby={`${uid}-demo`}
                >
                  <h3 className="display text-3xl text-indigo-deep">Solicita información</h3>
                  <p id={`${uid}-demo`} className="mt-2 text-sm text-muted flex gap-2"><IconInfo size={18} className="shrink-0 text-coral-ink" />Formulario demostrativo: no envía datos a ningún servidor.</p>

                  <div className="mt-7 grid sm:grid-cols-2 gap-5">
                    <div className="field sm:col-span-2">
                      <label htmlFor={f('parent')}>Nombre del padre, madre o apoderado *</label>
                      <input id={f('parent')} autoComplete="name" value={v.parent} onChange={(e) => set('parent', e.target.value)} onBlur={() => blur('parent')} aria-invalid={!!err('parent')} aria-describedby={err('parent') ? `${f('parent')}-e` : undefined} />
                      {err('parent') && <p id={`${f('parent')}-e`} className="error">{err('parent')}</p>}
                    </div>
                    <div className="field">
                      <label htmlFor={f('email')}>Correo electrónico *</label>
                      <input id={f('email')} type="email" autoComplete="email" inputMode="email" value={v.email} onChange={(e) => set('email', e.target.value)} onBlur={() => blur('email')} aria-invalid={!!err('email')} aria-describedby={err('email') ? `${f('email')}-e` : undefined} />
                      {err('email') && <p id={`${f('email')}-e`} className="error">{err('email')}</p>}
                    </div>
                    <div className="field">
                      <label htmlFor={f('phone')}>Celular / WhatsApp *</label>
                      <input id={f('phone')} type="tel" autoComplete="tel" inputMode="tel" placeholder="9XX XXX XXX" value={v.phone} onChange={(e) => set('phone', e.target.value)} onBlur={() => blur('phone')} aria-invalid={!!err('phone')} aria-describedby={err('phone') ? `${f('phone')}-e` : undefined} />
                      {err('phone') && <p id={`${f('phone')}-e`} className="error">{err('phone')}</p>}
                    </div>
                    <div className="field sm:col-span-2">
                      <label htmlFor={f('student')}>Nombre del estudiante *</label>
                      <input id={f('student')} value={v.student} onChange={(e) => set('student', e.target.value)} onBlur={() => blur('student')} aria-invalid={!!err('student')} aria-describedby={err('student') ? `${f('student')}-e` : undefined} />
                      {err('student') && <p id={`${f('student')}-e`} className="error">{err('student')}</p>}
                    </div>

                    <fieldset className="sm:col-span-2">
                      <legend className="text-[.8rem] font-bold text-indigo-deep">Nivel al que postula *</legend>
                      <div className="mt-2 grid grid-cols-3 gap-2">
                        {Object.keys(GRADES).map((lvl) => (
                          <label key={lvl} className={`cursor-pointer text-center rounded-2xl px-2 py-3 font-bold text-sm transition-all ${v.level === lvl ? 'bg-indigo text-white shadow-lg ring-indigo' : 'bg-white text-indigo ring-1 ring-[#D7DBEA] hover:ring-indigo'}`}>
                            <input id={lvl === 'Inicial' ? f('level') : undefined} type="radio" name={`${uid}-level`} value={lvl} checked={v.level === lvl} onChange={() => { set('level', lvl); setTouched((t) => ({ ...t, level: true })) }} className="sr-only" />
                            {lvl}
                          </label>
                        ))}
                      </div>
                      {err('level') && <p className="error mt-1.5 text-[.78rem] text-coral-ink font-semibold">{err('level')}</p>}
                    </fieldset>

                    <div className="field sm:col-span-2">
                      <label htmlFor={f('grade')}>Grado o edad para 2027 *</label>
                      <select id={f('grade')} value={v.grade} disabled={!v.level} onChange={(e) => set('grade', e.target.value)} onBlur={() => blur('grade')} aria-invalid={!!err('grade')} aria-describedby={err('grade') ? `${f('grade')}-e` : undefined}>
                        <option value="">{v.level ? 'Selecciona…' : 'Primero elige un nivel'}</option>
                        {(GRADES[v.level] ?? []).map((g) => <option key={g} value={g}>{g}</option>)}
                      </select>
                      {err('grade') && <p id={`${f('grade')}-e`} className="error">{err('grade')}</p>}
                    </div>

                    <div className="field sm:col-span-2">
                      <label htmlFor={f('message')}>Mensaje (opcional)</label>
                      <textarea id={f('message')} rows={3} value={v.message} onChange={(e) => set('message', e.target.value)} placeholder="Cuéntanos si tienes alguna consulta" />
                    </div>

                    <div className="sm:col-span-2">
                      <label className="flex items-start gap-3 text-sm text-muted cursor-pointer">
                        <input id={f('consent')} type="checkbox" checked={v.consent} onChange={(e) => { set('consent', e.target.checked); setTouched((t) => ({ ...t, consent: true })) }} className="mt-0.5 w-5 h-5 accent-[#3C4984]" aria-invalid={!!err('consent')} />
                        Autorizo al colegio a contactarme sobre el proceso de admisión (Ley N.° 29733 de Protección de Datos Personales).
                      </label>
                      {err('consent') && <p className="mt-1.5 text-[.78rem] text-coral-ink font-semibold">{err('consent')}</p>}
                    </div>
                  </div>

                  <button type="submit" disabled={status === 'sending'} className="btn btn-primary w-full justify-center mt-8 !py-4 disabled:opacity-80">
                    {status === 'sending' ? (<><span className="w-4 h-4 rounded-full border-2 border-white/40 border-t-white animate-spin" aria-hidden="true" /> Enviando…</>) : (<>Enviar solicitud <IconArrow size={18} /></>)}
                  </button>
                  <p className="mt-4 text-center text-sm text-muted">¿Prefieres hablar ya? <a href={waLink()} target="_blank" rel="noopener noreferrer" className="font-bold text-indigo underline decoration-coral decoration-2 underline-offset-4">Escríbenos por WhatsApp</a></p>
                  <p className="sr-only" aria-live="polite">{status === 'sending' ? 'Enviando solicitud' : ''}</p>
                </motion.form>
              ) : (
                <motion.div key="ok" role="status" aria-live="polite" initial={{ opacity: 0, scale: 0.96 }} animate={{ opacity: 1, scale: 1 }} transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }} className="h-full min-h-[560px] flex flex-col items-center justify-center text-center">
                  <motion.span initial={{ scale: 0, rotate: -40 }} animate={{ scale: 1, rotate: 0 }} transition={{ delay: 0.15, type: 'spring', stiffness: 260, damping: 16 }} className="grid place-items-center w-20 h-20 rounded-full bg-coral text-white shadow-[0_20px_40px_-12px_rgba(239,81,85,.7)]">
                    <IconCheck size={40} />
                  </motion.span>
                  <h3 className="display text-4xl mt-7 text-indigo-deep">¡Gracias, {v.parent.split(' ')[0]}!</h3>
                  <p className="mt-3 text-muted max-w-sm">Recibimos tu solicitud para <strong className="text-ink">{v.student}</strong> ({v.level}, {v.grade}). Te contactaremos pronto al {v.phone}.</p>
                  <p className="mt-3 text-xs text-muted">(Envío simulado: esta demo no guarda ni envía datos.)</p>
                  <div className="mt-8 flex flex-wrap justify-center gap-3">
                    <a href={waSummary} target="_blank" rel="noopener noreferrer" className="btn btn-primary"><IconWhatsApp size={20} /> Continuar por WhatsApp</a>
                    <button type="button" onClick={() => { setV(EMPTY); setTouched({}); setErrors({}); setStatus('idle') }} className="btn btn-ghost">Enviar otra</button>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  )
}
