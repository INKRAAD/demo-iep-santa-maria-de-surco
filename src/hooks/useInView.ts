import { useEffect, useRef, useState } from 'react'

export function useInView<T extends Element>(rootMargin = '0px', once = false) {
  const ref = useRef<T>(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => {
      setInView(e.isIntersecting)
      if (e.isIntersecting && once) io.disconnect()
    }, { rootMargin })
    io.observe(el)
    return () => io.disconnect()
  }, [rootMargin, once])
  return [ref, inView] as const
}
