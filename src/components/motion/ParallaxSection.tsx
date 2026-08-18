import { useEffect, useRef, type ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { usePrefersReducedMotion, useIsLowPowerDevice } from './useMotionPreferences'

interface ParallaxSectionProps {
  children: ReactNode
  className?: string
  /** Max translate in px at scroll extremes. Keep small for subtlety. */
  intensity?: number
}

/**
 * Lightweight parallax using rAF + transform only.
 * Disabled under reduced motion / low-power heuristics.
 */
export function ParallaxSection({
  children,
  className,
  intensity = 24,
}: ParallaxSectionProps) {
  const reduced = usePrefersReducedMotion()
  const lowPower = useIsLowPowerDevice()
  const ref = useRef<HTMLDivElement>(null)
  const layerRef = useRef<HTMLDivElement>(null)
  const enabled = !reduced && !lowPower

  useEffect(() => {
    if (!enabled) return

    const section = ref.current
    const layer = layerRef.current
    if (!section || !layer) return

    let frame = 0
    let active = true

    const update = () => {
      frame = 0
      if (!active) return
      const rect = section.getBoundingClientRect()
      const viewport = window.innerHeight || 1
      const progress = (viewport - rect.top) / (viewport + rect.height)
      const clamped = Math.min(1, Math.max(0, progress))
      const offset = (clamped - 0.5) * intensity * 2
      layer.style.transform = `translate3d(0, ${offset.toFixed(2)}px, 0)`
    }

    const onScroll = () => {
      if (frame) return
      frame = requestAnimationFrame(update)
    }

    update()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll, { passive: true })

    return () => {
      active = false
      if (frame) cancelAnimationFrame(frame)
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [enabled, intensity])

  return (
    <div ref={ref} className={cn('relative overflow-hidden', className)}>
      <div ref={layerRef} className="will-change-transform">
        {children}
      </div>
    </div>
  )
}
