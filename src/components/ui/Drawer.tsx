import { useEffect, useId, useRef, type ReactNode } from 'react'
import { X } from 'lucide-react'
import { cn } from '@/lib/cn'
import { IconButton } from './IconButton'
import { useI18n } from '@/i18n'

interface DrawerProps {
  open: boolean
  onClose: () => void
  title?: string
  children: ReactNode
  side?: 'left' | 'right'
  className?: string
  labelledBy?: string
}

export function Drawer({
  open,
  onClose,
  title,
  children,
  side = 'left',
  className,
  labelledBy,
}: DrawerProps) {
  const { t } = useI18n()
  const titleId = useId()
  const panelRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return

    const previouslyFocused = document.activeElement as HTMLElement | null
    panelRef.current?.focus()

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    document.addEventListener('keydown', onKeyDown)
    const originalOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = originalOverflow
      previouslyFocused?.focus()
    }
  }, [open, onClose])

  return (
    <div
      className={cn(
        'fixed inset-0 z-50',
        open ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      aria-hidden={!open}
    >
      <button
        type="button"
        tabIndex={open ? 0 : -1}
        className={cn(
          'absolute inset-0 bg-[var(--color-overlay)] transition-opacity duration-300',
          open ? 'opacity-100' : 'opacity-0',
        )}
        aria-label={t.common.close}
        onClick={onClose}
      />
      <div
        ref={panelRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={labelledBy ?? (title ? titleId : undefined)}
        tabIndex={-1}
        className={cn(
          'absolute top-0 flex h-full w-[min(100%,20rem)] flex-col bg-surface shadow-[var(--shadow-elevated)] transition-transform duration-300 ease-[var(--ease-out)]',
          side === 'left' ? 'left-0 border-r border-border' : 'right-0 border-l border-border',
          open
            ? 'translate-x-0'
            : side === 'left'
              ? '-translate-x-full'
              : 'translate-x-full',
          className,
        )}
      >
        {title ? (
          <div className="flex items-center justify-between gap-3 border-b border-border px-4 py-3">
            <h2 id={titleId} className="text-h4">
              {title}
            </h2>
            <IconButton label={t.common.close} onClick={onClose} size="sm">
              <X />
            </IconButton>
          </div>
        ) : null}
        <div className="flex-1 overflow-y-auto overscroll-contain">{children}</div>
      </div>
    </div>
  )
}
