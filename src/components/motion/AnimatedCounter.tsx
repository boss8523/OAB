import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/cn'
import { useInView } from './useInView'
import { usePrefersReducedMotion } from './useMotionPreferences'

interface AnimatedCounterProps {
  value: number
  durationMs?: number
  className?: string
  suffix?: string
  prefix?: string
  decimals?: number
}

export function AnimatedCounter({
  value,
  durationMs = 1200,
  className,
  suffix = '',
  prefix = '',
  decimals = 0,
}: AnimatedCounterProps) {
  const reduced = usePrefersReducedMotion()
  const [ref, inView] = useInView<HTMLSpanElement>({ once: true, disabled: reduced })
  const [display, setDisplay] = useState(reduced ? value : 0)
  const started = useRef(false)

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true

    if (reduced) {
      setDisplay(value)
      return
    }

    const start = performance.now()
    let frame = 0

    const tick = (now: number) => {
      const progress = Math.min(1, (now - start) / durationMs)
      const eased = 1 - Math.pow(1 - progress, 3)
      setDisplay(value * eased)
      if (progress < 1) {
        frame = requestAnimationFrame(tick)
      }
    }

    frame = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frame)
  }, [durationMs, inView, reduced, value])

  const formatted = display.toLocaleString(undefined, {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })

  return (
    <span ref={ref} className={cn('text-kpi tabular-nums', className)}>
      {prefix}
      {formatted}
      {suffix}
    </span>
  )
}
