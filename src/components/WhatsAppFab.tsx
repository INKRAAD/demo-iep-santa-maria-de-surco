import { waLink } from '../data/site'
import { IconWhatsApp } from './Icons'

export default function WhatsAppFab() {
  return (
    <a
      href={waLink()}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed bottom-5 right-5 z-50 flex items-center gap-2 rounded-full bg-[#128040] text-white shadow-[0_14px_40px_-12px_rgba(18,128,64,.75)] pl-4 pr-4 py-3.5 hover:pr-5 transition-all"
      aria-label="Escríbenos por WhatsApp al +51 994 703 768 (se abre en una nueva pestaña)"
    >
      <span className="absolute inset-0 rounded-full bg-[#128040] animate-ping opacity-20 motion-reduce:hidden" aria-hidden="true" />
      <IconWhatsApp size={26} className="relative" />
      <span className="relative hidden sm:inline text-sm font-bold max-w-0 overflow-hidden whitespace-nowrap group-hover:max-w-[12rem] group-focus-visible:max-w-[12rem] transition-[max-width] duration-500">
        ¿Consultas? Escríbenos
      </span>
    </a>
  )
}
