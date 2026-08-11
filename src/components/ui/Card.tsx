import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface CardProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  padded?: boolean
  interactive?: boolean
}

/**
 * Card is reserved for interactive/content containers where surface separation aids UX.
 * Avoid using cards in heroes or purely decorative grouping.
 */
export function Card({
  className,
  children,
  padded = true,
  interactive = false,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        'rounded-[var(--radius-lg)] border border-border bg-surface shadow-[var(--shadow-soft)]',
        padded && 'p-5 md:p-6',
        interactive &&
          'transition-[transform,box-shadow] duration-200 hover:-translate-y-0.5 hover:shadow-[var(--shadow-elevated)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
