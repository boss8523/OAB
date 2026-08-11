import { useI18n } from '@/i18n'
import { cn } from '@/lib/cn'

interface AnnouncementBarProps {
  className?: string
}

export function AnnouncementBar({ className }: AnnouncementBarProps) {
  const { t } = useI18n()

  return (
    <div
      role="status"
      className={cn(
        'border-b border-primary/20 bg-primary-muted text-primary',
        className,
      )}
    >
      <div className="container-page flex items-center justify-center gap-3 py-2 text-center text-small">
        <span className="hidden size-1.5 shrink-0 rounded-full bg-primary sm:inline-block" aria-hidden />
        <p>{t.home.announcement}</p>
      </div>
    </div>
  )
}
