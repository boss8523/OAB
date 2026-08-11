import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'
import { useI18n } from '@/i18n'

interface BrandMarkProps {
  className?: string
  compact?: boolean
  to?: string
  inverse?: boolean
}

export function BrandMark({
  className,
  compact = false,
  to = '/',
  inverse = false,
}: BrandMarkProps) {
  const { t } = useI18n()

  return (
    <Link
      to={to}
      className={cn(
        'group inline-flex items-center gap-3 rounded-[var(--radius-md)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
    >
      <span
        className={cn(
          'flex size-10 shrink-0 items-center justify-center rounded-[var(--radius-md)] shadow-[var(--shadow-soft)]',
          inverse
            ? 'bg-primary-foreground/15 text-primary-foreground'
            : 'bg-primary text-primary-foreground',
        )}
        aria-hidden
      >
        <svg viewBox="0 0 24 24" className="size-5" fill="none">
          <path
            d="M12 3c-1 3.2-1.7 6-1.7 8.4 0 2 .5 3.6 1.7 5.6 1.2-2 1.7-3.6 1.7-5.6C13.7 9 13 6.2 12 3Z"
            fill="currentColor"
            opacity="0.95"
          />
          <path
            d="M7 10.5c2.3 1.1 4.3 1.8 6.1 1.8 1.8 0 3.5-.4 5.4-1.3-1.3 2.6-2.8 4.3-4.5 5.3-1.6.7-3.1.7-4.8 0C7.7 15.3 6.5 13.3 7 10.5Z"
            fill="currentColor"
            opacity="0.7"
          />
          <path d="M5 18.2h14v.8c0 .7-3.1 1.5-7 1.5s-7-.8-7-1.5v-.8Z" fill="currentColor" />
        </svg>
      </span>
      <span className="min-w-0 text-left">
        <span
          className={cn(
            'block font-[family-name:var(--font-display)] text-small font-semibold tracking-wide',
            inverse ? 'text-[#9AD4A8]' : 'text-primary',
          )}
        >
          {t.brand.short}
        </span>
        {!compact ? (
          <span
            className={cn(
              'block truncate text-small leading-snug',
              inverse ? 'text-primary-foreground' : 'text-foreground',
            )}
          >
            {t.brand.full}
          </span>
        ) : null}
      </span>
    </Link>
  )
}
