import {
  createContext,
  useContext,
  type CSSProperties,
  type ReactNode,
} from 'react'
import { cn } from '@/lib/cn'
import { useInView } from './useInView'
import { usePrefersReducedMotion } from './useMotionPreferences'

interface StaggerContextValue {
  inView: boolean
  reduced: boolean
  baseDelayMs: number
  stepMs: number
}

const StaggerContext = createContext<StaggerContextValue | null>(null)

interface StaggerContainerProps {
  children: ReactNode
  className?: string
  baseDelayMs?: number
  stepMs?: number
}

export function StaggerContainer({
  children,
  className,
  baseDelayMs = 0,
  stepMs = 70,
}: StaggerContainerProps) {
  const reduced = usePrefersReducedMotion()
  const [ref, inView] = useInView<HTMLDivElement>({ disabled: reduced })

  return (
    <StaggerContext.Provider
      value={{ inView: inView || reduced, reduced, baseDelayMs, stepMs }}
    >
      <div ref={ref} className={className}>
        {children}
      </div>
    </StaggerContext.Provider>
  )
}

interface StaggerItemProps {
  children: ReactNode
  className?: string
  index?: number
}

export function StaggerItem({ children, className, index = 0 }: StaggerItemProps) {
  const ctx = useContext(StaggerContext)
  const delay = ctx ? ctx.baseDelayMs + index * ctx.stepMs : 0
  const visible = ctx?.inView ?? true
  const reduced = ctx?.reduced ?? false

  const style = {
    transitionProperty: 'opacity, transform',
    transitionDuration: reduced ? '0ms' : '500ms',
    transitionTimingFunction: 'var(--ease-out)',
    transitionDelay: reduced ? '0ms' : `${delay}ms`,
  } satisfies CSSProperties

  return (
    <div
      data-inview={visible ? 'true' : 'false'}
      className={cn(
        'transform-gpu',
        !reduced &&
          'opacity-0 translate-y-3 data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0',
        className,
      )}
      style={style}
    >
      {children}
    </div>
  )
}
