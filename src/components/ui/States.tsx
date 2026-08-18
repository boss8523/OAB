import type { ReactNode } from 'react'
import { AlertTriangle, Inbox, LoaderCircle } from 'lucide-react'
import { cn } from '@/lib/cn'
import { Button } from './Button'

interface EmptyStateProps {
  title: string
  description?: string
  action?: ReactNode
  icon?: ReactNode
  className?: string
}

export function EmptyState({
  title,
  description,
  action,
  icon,
  className,
}: EmptyStateProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center gap-3 rounded-[var(--radius-lg)] border border-dashed border-border bg-surface-muted/40 px-6 py-12 text-center',
        className,
      )}
    >
      <div className="text-foreground-secondary" aria-hidden>
        {icon ?? <Inbox className="size-8" strokeWidth={1.5} />}
      </div>
      <div className="space-y-1">
        <h3 className="text-h4">{title}</h3>
        {description ? (
          <p className="max-w-md text-body text-foreground-secondary">{description}</p>
        ) : null}
      </div>
      {action}
    </div>
  )
}

interface LoadingStateProps {
  label?: string
  className?: string
}

export function LoadingState({ label = 'Loading', className }: LoadingStateProps) {
  return (
    <div
      role="status"
      aria-live="polite"
      className={cn('flex items-center justify-center gap-3 py-12 text-foreground-secondary', className)}
    >
      <LoaderCircle className="size-5 animate-spin" aria-hidden />
      <span className="text-body">{label}</span>
    </div>
  )
}

interface ErrorStateProps {
  title: string
  description?: string
  onRetry?: () => void
  retryLabel?: string
  className?: string
}

export function ErrorState({
  title,
  description,
  onRetry,
  retryLabel = 'Retry',
  className,
}: ErrorStateProps) {
  return (
    <div
      role="alert"
      className={cn(
        'flex flex-col items-center gap-3 rounded-[var(--radius-lg)] border border-danger/20 bg-danger-muted/50 px-6 py-10 text-center',
        className,
      )}
    >
      <AlertTriangle className="size-8 text-danger" strokeWidth={1.5} aria-hidden />
      <div className="space-y-1">
        <h3 className="text-h4">{title}</h3>
        {description ? (
          <p className="max-w-md text-body text-foreground-secondary">{description}</p>
        ) : null}
      </div>
      {onRetry ? (
        <Button variant="outline" onClick={onRetry}>
          {retryLabel}
        </Button>
      ) : null}
    </div>
  )
}
