import { useEffect, useState, type ReactNode } from 'react'
import { useLocation } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { usePrefersReducedMotion } from './useMotionPreferences'

interface PageTransitionProps {
  children: ReactNode
  className?: string
}

/**
 * Lightweight route enter transition. Uses opacity/transform only.
 */
export function PageTransition({ children, className }: PageTransitionProps) {
  const location = useLocation()
  const reduced = usePrefersReducedMotion()
  const [visible, setVisible] = useState(true)

  useEffect(() => {
    if (reduced) {
      setVisible(true)
      return
    }
    setVisible(false)
    const id = requestAnimationFrame(() => setVisible(true))
    return () => cancelAnimationFrame(id)
  }, [location.pathname, reduced])

  return (
    <div
      key={location.pathname}
      className={cn(
        'transform-gpu',
        !reduced && 'transition-[opacity,transform] duration-300 ease-[var(--ease-out)]',
        visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2',
        className,
      )}
    >
      {children}
    </div>
  )
}
