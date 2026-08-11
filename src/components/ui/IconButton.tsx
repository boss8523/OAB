import { forwardRef, type ButtonHTMLAttributes } from 'react'
import { cn } from '@/lib/cn'

interface IconButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  label: string
  size?: 'sm' | 'md' | 'lg'
  variant?: 'ghost' | 'outline' | 'surface'
}

const sizes = {
  sm: 'size-9',
  md: 'size-10',
  lg: 'size-11',
}

const variants = {
  ghost: 'bg-transparent hover:bg-surface-muted text-foreground',
  outline: 'bg-transparent border border-border hover:bg-surface-muted text-foreground',
  surface: 'bg-surface border border-border hover:bg-surface-muted text-foreground shadow-[var(--shadow-soft)]',
}

export const IconButton = forwardRef<HTMLButtonElement, IconButtonProps>(
  (
    {
      className,
      label,
      size = 'md',
      variant = 'ghost',
      type = 'button',
      children,
      ...props
    },
    ref,
  ) => {
    return (
      <button
        ref={ref}
        type={type}
        aria-label={label}
        title={label}
        className={cn(
          'inline-flex items-center justify-center rounded-[var(--radius-md)] transition-colors duration-200',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'disabled:pointer-events-none disabled:opacity-50',
          '[&_svg]:size-5',
          sizes[size],
          variants[variant],
          className,
        )}
        {...props}
      >
        {children}
      </button>
    )
  },
)

IconButton.displayName = 'IconButton'
