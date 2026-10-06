/**
 * Contenido de la demo.
 * Todo lo que NO viene de brand/brand.md está marcado con `ejemplo: true`
 * o con el comentario «CONTENIDO DE EJEMPLO». Nunca presentar esos datos como reales.
 */

export const SCHOOL = {
  name: 'I.E.P. Santa María de Surco',
  corp: 'Corporación Educativa “Santa María de Surco”',
  legalName: 'Corporación Educativa Santa María de Surco E.I.R.L.',
  ruc: '20511265305',
  since: 2005, // inicio de actividades según SUNAT (12-ago-2005)
  motto: 'Entrar para aprender y salir para servir',
  address: 'José Gálvez 371, Santiago de Surco 15049, Lima',
  street: 'José Gálvez 371',
  district: 'Santiago de Surco',
  phone: '+51 994 703 768',
  phoneHref: 'tel:+51994703768',
  whatsapp: '51994703768',
  email: 'iepsantamariadesurco.edu@gmail.com',
  facebook: 'https://www.facebook.com/p/IEP-Santa-Mar%C3%ADa-de-Surco-100064044635026/',
  intranet: 'https://iepsantamariadesurco.cubicol.pe/principal/login',
  maps: 'https://www.google.com/maps/search/?api=1&query=IEP+Santa+Mar%C3%ADa+de+Surco%2C+Jos%C3%A9+G%C3%A1lvez+371%2C+Santiago+de+Surco%2C+Lima',
  mapsEmbed: 'https://www.google.com/maps?q=-12.146944,-77.002973&z=17&output=embed',
  lat: -12.146944,
  lng: -77.002973,
  shift: 'Turno mañana', // MINEDU / miguiadecolegios
  rating: 4.7, // Exa Places (espejo de Google Maps) — NO verificado en vivo
  reviews: 9,
  ratingCheckedOn: '06/10/2026',
}

export const waLink = (text = 'Hola, quisiera información sobre la Admisión 2027 en I.E.P. Santa María de Surco.') =>
  `https://wa.me/${SCHOOL.whatsapp}?text=${encodeURIComponent(text)}`

export const NAV = [
  { href: '#nosotros', label: 'Nosotros' },
  { href: '#niveles', label: 'Niveles' },
  { href: '#vida-escolar', label: 'Vida escolar' },
  { href: '#admision', label: 'Admisión 2027' },
  { href: '#contacto', label: 'Contacto' },
]

/** Cifras reales (fuentes en README). */
export const COUNTERS = [
  { value: new Date().getFullYear() - SCHOOL.since - (new Date().getMonth() < 7 ? 1 : 0), suffix: '', label: 'años educando en Surco', note: 'Desde 2005 (SUNAT)' },
  { value: 3, suffix: '', label: 'niveles: Inicial, Primaria y Secundaria', note: 'Una sola comunidad' },
  { value: 5, suffix: '', label: 'talleres y servicios para el alumno', note: 'Cómputo, psicología, seguro, taekwondo y danza' },
  { value: 4.7, suffix: '★', decimals: 1, label: 'en Google Maps', note: '9 reseñas · cifra por verificar en vivo' },
]

export const LEVELS = [
  {
    id: 'inicial',
    tag: '01',
    name: 'Inicial',
    title: 'Aprender jugando, crecer acompañado',
    // Texto propuesto (copy de la demo, no tomado del colegio)
    body: 'Los primeros pasos en el colegio se viven con juego, cariño y rutinas claras. Lenguaje, psicomotricidad, arte y valores en un ambiente seguro donde cada niño y niña se siente en casa.',
    points: ['Aulas pensadas para los más pequeños', 'Juego, arte y psicomotricidad', 'Celebramos el Día de la Educación Inicial'],
    color: 'coral',
  },
  {
    id: 'primaria',
    tag: '02',
    name: 'Primaria',
    title: 'Bases sólidas y curiosidad para todo',
    body: 'Comprensión lectora, matemática, ciencia y ciudadanía, con talleres de cómputo, danza y taekwondo. Una etapa para descubrir talentos y aprender a convivir con respeto.',
    points: ['Turno mañana', 'Centro de cómputo', 'Talleres de danza y taekwondo'],
    color: 'blue',
  },
  {
    id: 'secundaria',
    tag: '03',
    name: 'Secundaria',
    title: 'Jóvenes que aprenden para servir',
    body: 'Proyectos, ferias de ciencias, actividades cívicas y formación en valores para que nuestros estudiantes salgan preparados para la vida y comprometidos con su comunidad.',
    points: ['Ferias y proyectos de investigación', 'Formación ética y ciudadana', 'Acompañamiento del departamento psicológico'],
    color: 'blue',
  },
] as const

/** Servicios anunciados en la web oficial del colegio. */
export const SERVICES = [
  { id: 'computo', name: 'Centro de cómputo', text: 'Alfabetización digital y uso responsable de la tecnología desde temprana edad.' },
  { id: 'psico', name: 'Departamento psicológico', text: 'Acompañamiento emocional y orientación para estudiantes y familias.' },
  { id: 'seguro', name: 'Seguro de accidentes', text: 'Seguro estudiantil contra accidentes (Rimac) para mayor tranquilidad de las familias.' },
  { id: 'taekwondo', name: 'Taekwondo', text: 'Disciplina, respeto y confianza a través del deporte.' },
  { id: 'danza', name: 'Danza', text: 'Nuestras raíces peruanas en cada paso, del aula al escenario de Festidanza.' },
] as const

/** Actividades anuales mencionadas por el colegio (sin fechas: el calendario 2027 está por confirmar). */
export const ACTIVITIES = [
  { name: 'Semana Santa', text: 'Vivimos la fe en comunidad.' },
  { name: 'Día de la Madre', text: 'Homenaje a las mamás de nuestra familia SMS.' },
  { name: 'Día de la Educación Inicial', text: 'Una fiesta para los más pequeños.' },
  { name: 'Día del Padre', text: 'Compartimos con los papás en el colegio.' },
  { name: 'Fiestas Patrias', text: 'Desfile y actuaciones por el Perú.' },
  { name: 'Aniversario del plantel', text: 'Celebramos nuestra historia juntos.' },
  { name: 'Got Talent', text: 'El escenario es de nuestros talentos.' },
  { name: 'Festidanza', text: 'Nuestro festival de danzas peruanas.' },
]

/** Reseñas reales de Google (vía Exa Places). Autores no disponibles en la fuente. */
export const REVIEWS = [
  { text: 'Un Excellente Colegio Dedicado, especialmente recomendado para niños con dificultades que requieren un trato Tierno y Especial.', date: 'marzo 2026', stars: 5 },
  { text: 'El mejor colegio ✨', date: 'octubre 2022', stars: 5 },
  { text: 'Soy proveedor, buenos clientes', date: 'febrero 2026', stars: 5 },
]

/** CONTENIDO DE EJEMPLO: proceso referencial propuesto, a confirmar con el colegio. */
export const ADMISSION_STEPS = [
  { title: 'Solicita información', text: 'Déjanos tus datos o escríbenos por WhatsApp.' },
  { title: 'Visita y entrevista', text: 'Conoce el colegio y conversa con nuestro equipo.' },
  { title: 'Documentos', text: 'Entrega de requisitos según el nivel.' },
  { title: 'Matrícula', text: 'Confirmamos la vacante y ¡bienvenidos a la familia SMS!' },
]

/** CONTENIDO DE EJEMPLO: lista referencial. El colegio debe confirmar los requisitos oficiales 2027. */
export const REQUIREMENTS = [
  'Copia del DNI del estudiante y de los padres o apoderados',
  'Partida de nacimiento',
  'Libreta de notas o informe de progreso del año anterior (Primaria y Secundaria)',
  'Certificado de estudios / constancia de matrícula SIAGIE (traslados)',
  'Diagnóstico neuropediátrico, en caso aplique',
]

export const GRADES: Record<string, string[]> = {
  Inicial: ['3 años', '4 años', '5 años'],
  Primaria: ['1.° grado', '2.° grado', '3.° grado', '4.° grado', '5.° grado', '6.° grado'],
  Secundaria: ['1.° año', '2.° año', '3.° año', '4.° año', '5.° año'],
}
