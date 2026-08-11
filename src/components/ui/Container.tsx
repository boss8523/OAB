import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

interface ContainerProps extends HTMLAttributes<HTMLDivElement> {
  children: ReactNode
  wide?: boolean
}

export function Container({ className, children, wide = false, ...props }: ContainerProps) {
  return (
    <div
      className={cn(
        'mx-auto w-full px-[var(--page-padding)]',
        wide ? 'max-w-[var(--container-wide)]' : 'max-w-[var(--container-max)]',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

interface SectionHeaderProps {
  eyebrow?: string
  title: string
  description?: string
  action?: ReactNode
  className?: string
  align?: 'left' | 'center'
}

export function SectionHeader({
  eyebrow,
  title,
  description,
  action,
  className,
  align = 'left',
}: SectionHeaderProps) {
  return (
    <div
      className={cn(
        'mb-8 flex flex-col gap-4 md:mb-10',
        align === 'center' && 'items-center text-center',
        action && align === 'left' && 'md:flex-row md:items-end md:justify-between',
        className,
      )}
    >
      <div className={cn('max-w-2xl space-y-3', align === 'center' && 'mx-auto')}>
        {eyebrow ? <p className="text-label text-primary">{eyebrow}</p> : null}
        <h2 className="text-h2">{title}</h2>
        {description ? (
          <p className="text-body-lg text-foreground-secondary">{description}</p>
        ) : null}
      </div>
      {action ? <div className="shrink-0">{action}</div> : null}
    </div>
  )
}
