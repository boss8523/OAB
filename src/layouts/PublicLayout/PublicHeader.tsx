import { NavLink } from 'react-router-dom'
import { Menu } from 'lucide-react'
import { useI18n } from '@/i18n'
import { publicNavItems } from '@/app/navigation'
import { BrandMark } from '@/components/BrandMark'
import { LanguageSwitcher, ThemeToggle } from '@/components/ChromeControls'
import { Button } from '@/components/ui/Button'
import { IconButton } from '@/components/ui/IconButton'
import { cn } from '@/lib/cn'

interface PublicHeaderProps {
  onOpenMobileNav: () => void
}

export function PublicHeader({ onOpenMobileNav }: PublicHeaderProps) {
  const { t } = useI18n()

  const desktopItems = publicNavItems.filter((item) =>
    ['home', 'about', 'services', 'programs', 'market', 'news', 'contact'].includes(item.key),
  )

  return (
    <header className="sticky top-0 z-40 border-b border-border/80 bg-background/85 backdrop-blur-md">
      <div className="container-page flex h-[var(--header-height)] items-center justify-between gap-4">
        <BrandMark />

        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {desktopItems.map((item) => (
            <NavLink
              key={item.key}
              to={item.path}
              end={item.path === '/'}
              className={({ isActive }) =>
                cn(
                  'rounded-[var(--radius-md)] px-3 py-2 text-small font-medium transition-colors',
                  'hover:bg-surface-muted hover:text-foreground',
                  'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                  isActive ? 'bg-primary-muted text-primary' : 'text-foreground-secondary',
                )
              }
            >
              {t.nav[item.labelKey]}
            </NavLink>
          ))}
        </nav>

        <div className="flex items-center gap-1 sm:gap-2">
          <div className="hidden sm:block">
            <LanguageSwitcher />
          </div>
          <ThemeToggle />
          <Button to="/portal" variant="primary" size="sm" className="hidden md:inline-flex">
            {t.nav.portal}
          </Button>
          <IconButton
            label={t.nav.openMenu}
            className="lg:hidden"
            onClick={onOpenMobileNav}
          >
            <Menu />
          </IconButton>
        </div>
      </div>
    </header>
  )
}
