import type { CSSProperties, ElementType, ReactNode } from 'react'
import { cn } from '@/lib/cn'
import { useInView } from './useInView'
import { usePrefersReducedMotion } from './useMotionPreferences'

type RevealVariant = 'fade' | 'slide-up' | 'scale'

interface RevealProps {
  children: ReactNode
  className?: string
  variant?: RevealVariant
  delayMs?: number
  as?: ElementType
  once?: boolean
}

const variantClass: Record<RevealVariant, string> = {
  fade: 'opacity-0 data-[inview=true]:opacity-100',
  'slide-up':
    'opacity-0 translate-y-4 data-[inview=true]:opacity-100 data-[inview=true]:translate-y-0',
  scale:
    'opacity-0 scale-[0.97] data-[inview=true]:opacity-100 data-[inview=true]:scale-100',
}

export function Reveal({
  children,
  className,
  variant = 'slide-up',
  delayMs = 0,
  as: Tag = 'div',
  once = true,
}: RevealProps) {
  const reduced = usePrefersReducedMotion()
  const [ref, inView] = useInView<HTMLElement>({ once, disabled: reduced })

  const style = {
    transitionProperty: 'opacity, transform',
    transitionDuration: reduced ? '0ms' : '550ms',
    transitionTimingFunction: 'var(--ease-out)',
    transitionDelay: reduced ? '0ms' : `${delayMs}ms`,
    willChange: inView || reduced ? 'auto' : 'opacity, transform',
  } satisfies CSSProperties

  return (
    <Tag
      ref={ref}
      data-inview={inView || reduced ? 'true' : 'false'}
      className={cn(
        'transform-gpu',
        !reduced && variantClass[variant],
        className,
      )}
      style={style}
    >
      {children}
    </Tag>
  )
}

export function FadeIn(props: Omit<RevealProps, 'variant'>) {
  return <Reveal {...props} variant="fade" />
}

export function SlideUp(props: Omit<RevealProps, 'variant'>) {
  return <Reveal {...props} variant="slide-up" />
}

export function ScaleIn(props: Omit<RevealProps, 'variant'>) {
  return <Reveal {...props} variant="scale" />
}
