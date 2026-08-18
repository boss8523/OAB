import { useEffect, useRef, useState, type RefObject } from 'react'

interface UseInViewOptions {
  rootMargin?: string
  threshold?: number | number[]
  once?: boolean
  disabled?: boolean
}

export function useInView<T extends Element>(
  options: UseInViewOptions = {},
): [RefObject<T | null>, boolean] {
  const { rootMargin = '0px 0px -8% 0px', threshold = 0.15, once = true, disabled = false } =
    options
  const ref = useRef<T | null>(null)
  const [inView, setInView] = useState(disabled)

  useEffect(() => {
    if (disabled) {
      setInView(true)
      return
    }

    const node = ref.current
    if (!node) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return
        if (entry.isIntersecting) {
          setInView(true)
          if (once) observer.unobserve(node)
        } else if (!once) {
          setInView(false)
        }
      },
      { rootMargin, threshold },
    )

    observer.observe(node)
    return () => observer.disconnect()
  }, [disabled, once, rootMargin, threshold])

  return [ref, inView]
}
