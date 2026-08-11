import {
  createContext,
  useContext,
  useEffect,
  useId,
  useRef,
  useState,
  type ReactNode,
} from 'react'
import { ChevronDown } from 'lucide-react'
import { cn } from '@/lib/cn'

interface DropdownContextValue {
  open: boolean
  setOpen: (open: boolean) => void
  menuId: string
}

const DropdownContext = createContext<DropdownContextValue | null>(null)

interface DropdownProps {
  children: ReactNode
  className?: string
}

export function Dropdown({ children, className }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const menuId = useId()
  const rootRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!open) return
    const onPointerDown = (event: MouseEvent) => {
      if (!rootRef.current?.contains(event.target as Node)) {
        setOpen(false)
      }
    }
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onPointerDown)
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('mousedown', onPointerDown)
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [open])

  return (
    <DropdownContext.Provider value={{ open, setOpen, menuId }}>
      <div ref={rootRef} className={cn('relative inline-block', className)}>
        {children}
      </div>
    </DropdownContext.Provider>
  )
}

interface DropdownTriggerProps {
  children: ReactNode
  className?: string
  label?: string
}

export function DropdownTrigger({ children, className, label }: DropdownTriggerProps) {
  const ctx = useContext(DropdownContext)
  if (!ctx) throw new Error('DropdownTrigger must be used within Dropdown')

  return (
    <button
      type="button"
      aria-haspopup="menu"
      aria-expanded={ctx.open}
      aria-controls={ctx.menuId}
      aria-label={label}
      className={cn(
        'inline-flex items-center gap-2 rounded-[var(--radius-md)] border border-border bg-surface px-3 py-2 text-small font-medium text-foreground transition-colors hover:bg-surface-muted',
        'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
        className,
      )}
      onClick={() => ctx.setOpen(!ctx.open)}
    >
      {children}
      <ChevronDown
        className={cn('size-4 transition-transform', ctx.open && 'rotate-180')}
        aria-hidden
      />
    </button>
  )
}

interface DropdownMenuProps {
  children: ReactNode
  className?: string
  align?: 'start' | 'end'
}

export function DropdownMenu({ children, className, align = 'start' }: DropdownMenuProps) {
  const ctx = useContext(DropdownContext)
  if (!ctx) throw new Error('DropdownMenu must be used within Dropdown')
  if (!ctx.open) return null

  return (
    <div
      id={ctx.menuId}
      role="menu"
      className={cn(
        'absolute z-40 mt-2 min-w-44 overflow-hidden rounded-[var(--radius-md)] border border-border bg-surface py-1 shadow-[var(--shadow-elevated)]',
        align === 'end' ? 'right-0' : 'left-0',
        className,
      )}
    >
      {children}
    </div>
  )
}

interface DropdownItemProps {
  children: ReactNode
  onSelect?: () => void
  active?: boolean
  className?: string
}

export function DropdownItem({ children, onSelect, active, className }: DropdownItemProps) {
  const ctx = useContext(DropdownContext)
  if (!ctx) throw new Error('DropdownItem must be used within Dropdown')

  return (
    <button
      type="button"
      role="menuitem"
      className={cn(
        'flex w-full items-center px-3 py-2 text-left text-small transition-colors hover:bg-surface-muted',
        active && 'bg-primary-muted text-primary',
        className,
      )}
      onClick={() => {
        onSelect?.()
        ctx.setOpen(false)
      }}
    >
      {children}
    </button>
  )
}
