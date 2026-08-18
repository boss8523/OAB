import { Search } from 'lucide-react'
import { forwardRef, type InputHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

interface SearchInputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'type'> {
  label: string
}

export const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, label, id, ...props }, ref) => {
    const inputId = id ?? 'search-input'
    return (
      <div className={cn('relative', className)}>
        <label htmlFor={inputId} className="sr-only">
          {label}
        </label>
        <Search
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-foreground-secondary"
          aria-hidden
        />
        <input
          ref={ref}
          id={inputId}
          type="search"
          className="h-11 w-full rounded-[var(--radius-md)] border border-border bg-surface pr-3 pl-10 text-body text-foreground placeholder:text-foreground-secondary/70 transition-colors focus-visible:border-primary focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
          {...props}
        />
      </div>
    )
  },
)

SearchInput.displayName = 'SearchInput'
