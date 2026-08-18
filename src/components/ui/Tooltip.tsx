import type { ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface TooltipProps {
  content: string
  children: ReactNode
  className?: string
}

/** Accessible CSS tooltip for icon affordances. Prefer visible labels for critical actions. */
export function Tooltip({ content, children, className }: TooltipProps) {
  return (
    <span className={cn('group relative inline-flex', className)}>
      {children}
      <span
        role="tooltip"
        className="pointer-events-none absolute bottom-full left-1/2 z-30 mb-2 -translate-x-1/2 whitespace-nowrap rounded-[var(--radius-sm)] bg-forest px-2 py-1 text-small text-primary-foreground opacity-0 shadow-[var(--shadow-soft)] transition-opacity group-hover:opacity-100 group-focus-within:opacity-100"
      >
        {content}
      </span>
    </span>
  )
}
