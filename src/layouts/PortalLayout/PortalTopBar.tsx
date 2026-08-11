import { Bell, Menu, UserRound } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useI18n } from '@/i18n'
import { LanguageSwitcher, ThemeToggle } from '@/components/ChromeControls'
import { IconButton } from '@/components/ui/IconButton'
import { SearchInput } from '@/components/ui/SearchInput'
import { Tooltip } from '@/components/ui/Tooltip'

interface PortalTopBarProps {
  onOpenSidebar: () => void
}

export function PortalTopBar({ onOpenSidebar }: PortalTopBarProps) {
  const { t } = useI18n()

  return (
    <header className="sticky top-0 z-30 flex h-[var(--header-height)] items-center gap-3 border-b border-border bg-background/90 px-4 backdrop-blur-md md:px-6">
      <IconButton
        label={t.nav.openMenu}
        className="lg:hidden"
        onClick={onOpenSidebar}
      >
        <Menu />
      </IconButton>

      <div className="hidden max-w-md flex-1 md:block">
        <SearchInput
          label={t.common.search}
          placeholder={t.common.searchPlaceholder}
        />
      </div>

      <div className="ml-auto flex items-center gap-1 sm:gap-2">
        <LanguageSwitcher compact />
        <ThemeToggle />
        <Tooltip content={t.common.notifications}>
          <IconButton label={t.common.notifications} variant="ghost">
            <Bell />
          </IconButton>
        </Tooltip>
        <Tooltip content={t.common.profile}>
          <IconButton label={t.common.profile} variant="surface">
            <UserRound />
          </IconButton>
        </Tooltip>
        <Link
          to="/"
          className="ml-1 hidden rounded-[var(--radius-md)] px-2 py-1.5 text-small text-foreground-secondary transition-colors hover:text-foreground sm:inline"
        >
          {t.nav.home}
        </Link>
      </div>
    </header>
  )
}
