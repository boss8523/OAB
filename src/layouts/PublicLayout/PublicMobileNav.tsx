import { NavLink } from 'react-router-dom'
import { useI18n } from '@/i18n'
import { publicNavItems } from '@/app/navigation'
import { BrandMark } from '@/components/BrandMark'
import { LanguageSwitcher, ThemeToggle } from '@/components/ChromeControls'
import { Drawer } from '@/components/ui/Drawer'
import { cn } from '@/lib/cn'

interface PublicMobileNavProps {
  open: boolean
  onClose: () => void
}

export function PublicMobileNav({ open, onClose }: PublicMobileNavProps) {
  const { t } = useI18n()

  return (
    <Drawer open={open} onClose={onClose} title={t.brand.short} side="right">
      <div className="flex h-full flex-col">
        <div className="border-b border-border px-4 py-4">
          <BrandMark compact />
        </div>
        <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-2 py-3">
          <ul className="space-y-1">
            {publicNavItems.map((item) => (
              <li key={item.key}>
                <NavLink
                  to={item.path}
                  end={item.path === '/'}
                  onClick={onClose}
                  className={({ isActive }) =>
                    cn(
                      'block rounded-[var(--radius-md)] px-3 py-3 text-body font-medium transition-colors',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                      isActive
                        ? 'bg-primary-muted text-primary'
                        : 'text-foreground hover:bg-surface-muted',
                    )
                  }
                >
                  {t.nav[item.labelKey]}
                </NavLink>
              </li>
            ))}
            <li>
              <NavLink
                to="/portal"
                onClick={onClose}
                className={({ isActive }) =>
                  cn(
                    'mt-2 block rounded-[var(--radius-md)] px-3 py-3 text-body font-medium transition-colors',
                    isActive
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-forest text-primary-foreground hover:opacity-95',
                  )
                }
              >
                {t.nav.portal}
              </NavLink>
            </li>
          </ul>
        </nav>
        <div className="flex items-center justify-between gap-2 border-t border-border px-4 py-3">
          <LanguageSwitcher />
          <ThemeToggle />
        </div>
      </div>
    </Drawer>
  )
}
