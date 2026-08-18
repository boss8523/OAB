import { forwardRef, type ButtonHTMLAttributes, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { cn } from '@/lib/cn'

export type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'outline' | 'danger'
export type ButtonSize = 'sm' | 'md' | 'lg'

interface ButtonBaseProps {
  variant?: ButtonVariant
  size?: ButtonSize
  leftIcon?: ReactNode
  rightIcon?: ReactNode
  fullWidth?: boolean
  className?: string
  children?: ReactNode
}

type ButtonAsButton = ButtonBaseProps &
  Omit<ButtonHTMLAttributes<HTMLButtonElement>, keyof ButtonBaseProps> & {
    to?: undefined
  }

type ButtonAsLink = ButtonBaseProps & {
  to: string
}

export type ButtonProps = ButtonAsButton | ButtonAsLink

const variants: Record<ButtonVariant, string> = {
  primary:
    'bg-primary text-primary-foreground hover:bg-primary-hover shadow-[var(--shadow-soft)]',
  secondary:
    'bg-surface-muted text-foreground hover:bg-warm border border-border',
  ghost: 'bg-transparent text-foreground hover:bg-surface-muted',
  outline:
    'bg-transparent text-foreground border border-border-strong hover:bg-surface-muted',
  danger: 'bg-danger text-white hover:brightness-95',
}

const sizes: Record<ButtonSize, string> = {
  sm: 'h-9 px-3 text-small gap-1.5 rounded-[var(--radius-md)]',
  md: 'h-11 px-4 text-body gap-2 rounded-[var(--radius-md)]',
  lg: 'h-12 px-5 text-body-lg gap-2 rounded-[var(--radius-lg)]',
}

function buttonClassName({
  variant = 'primary',
  size = 'md',
  fullWidth,
  className,
}: Pick<ButtonBaseProps, 'variant' | 'size' | 'fullWidth' | 'className'>) {
  return cn(
    'inline-flex items-center justify-center font-medium transition-[background-color,color,box-shadow,transform] duration-200',
    'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background',
    'disabled:pointer-events-none disabled:opacity-50',
    'active:translate-y-px',
    variants[variant],
    sizes[size],
    fullWidth && 'w-full',
    className,
  )
}

function ButtonContent({
  leftIcon,
  rightIcon,
  children,
}: Pick<ButtonBaseProps, 'leftIcon' | 'rightIcon' | 'children'>) {
  return (
    <>
      {leftIcon ? <span className="shrink-0 [&_svg]:size-[1.1em]">{leftIcon}</span> : null}
      {children}
      {rightIcon ? <span className="shrink-0 [&_svg]:size-[1.1em]">{rightIcon}</span> : null}
    </>
  )
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(function Button(
  props,
  ref,
) {
  const {
    className,
    variant = 'primary',
    size = 'md',
    leftIcon,
    rightIcon,
    fullWidth,
    children,
  } = props

  const classes = buttonClassName({ variant, size, fullWidth, className })

  if (props.to) {
    return (
      <Link to={props.to} className={classes}>
        <ButtonContent leftIcon={leftIcon} rightIcon={rightIcon}>
          {children}
        </ButtonContent>
      </Link>
    )
  }

  const buttonProps = props as ButtonAsButton

  return (
    <button
      ref={ref}
      type={buttonProps.type ?? 'button'}
      className={classes}
      disabled={buttonProps.disabled}
      onClick={buttonProps.onClick}
      onKeyDown={buttonProps.onKeyDown}
      aria-label={buttonProps['aria-label']}
      id={buttonProps.id}
      name={buttonProps.name}
      form={buttonProps.form}
      value={buttonProps.value}
    >
      <ButtonContent leftIcon={leftIcon} rightIcon={rightIcon}>
        {children}
      </ButtonContent>
    </button>
  )
})
