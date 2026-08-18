import type { HTMLAttributes, ReactNode } from 'react'
import { cn } from '@/lib/cn'

type BadgeTone = 'neutral' | 'primary' | 'success' | 'warning' | 'danger' | 'info'

interface BadgeProps extends HTMLAttributes<HTMLSpanElement> {
  tone?: BadgeTone
  children: ReactNode
}

const tones: Record<BadgeTone, string> = {
  neutral: 'bg-surface-muted text-foreground-secondary',
  primary: 'bg-primary-muted text-primary',
  success: 'bg-success-muted text-success',
  warning: 'bg-warning-muted text-warning',
  danger: 'bg-danger-muted text-danger',
  info: 'bg-info-muted text-info',
}

export function Badge({ className, tone = 'neutral', children, ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1 rounded-[var(--radius-sm)] px-2 py-0.5 text-small font-medium',
        tones[tone],
        className,
      )}
      {...props}
    >
      {children}
    </span>
  )
}

type Status = 'success' | 'warning' | 'danger' | 'info' | 'neutral'

interface StatusBadgeProps extends HTMLAttributes<HTMLSpanElement> {
  status: Status
  label: string
}

const statusTone: Record<Status, BadgeTone> = {
  success: 'success',
  warning: 'warning',
  danger: 'danger',
  info: 'info',
  neutral: 'neutral',
}

const statusDot: Record<Status, string> = {
  success: 'bg-success',
  warning: 'bg-warning',
  danger: 'bg-danger',
  info: 'bg-info',
  neutral: 'bg-foreground-secondary',
}

export function StatusBadge({ status, label, className, ...props }: StatusBadgeProps) {
  return (
    <Badge tone={statusTone[status]} className={className} {...props}>
      <span className={cn('size-1.5 rounded-full', statusDot[status])} aria-hidden />
      {label}
    </Badge>
  )
}
