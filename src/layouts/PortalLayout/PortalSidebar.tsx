import { NavLink } from 'react-router-dom'
import {
  LayoutDashboard,
  Users,
  MapPinned,
  Inbox,
  TriangleAlert,
  Bell,
  FileBarChart,
  type LucideIcon,
} from 'lucide-react'
import { useI18n } from '@/i18n'
import { portalNavItems } from '@/app/navigation'
import { BrandMark } from '@/components/BrandMark'
import { cn } from '@/lib/cn'

const icons: Record<string, LucideIcon> = {
  dashboard: LayoutDashboard,
  farmers: Users,
  'field-visits': MapPinned,
  requests: Inbox,
  incidents: TriangleAlert,
  alerts: Bell,
  reports: FileBarChart,
}

interface PortalSidebarProps {
  className?: string
  onNavigate?: () => void
}

export function PortalSidebar({ className, onNavigate }: PortalSidebarProps) {
  const { t } = useI18n()

  return (
    <aside
      className={cn(
        'flex h-full w-[var(--portal-sidebar-width)] flex-col border-r border-border bg-surface',
        className,
      )}
    >
      <div className="border-b border-border px-4 py-4">
        <BrandMark to="/portal" compact />
        <p className="mt-2 text-small text-foreground-secondary">{t.portal.title}</p>
      </div>
      <nav aria-label="Portal" className="flex-1 overflow-y-auto px-2 py-3">
        <ul className="space-y-1">
          {portalNavItems.map((item) => {
            const Icon = icons[item.key] ?? LayoutDashboard
            return (
              <li key={item.key}>
                <NavLink
                  to={item.path}
                  end={item.path === '/portal'}
                  onClick={onNavigate}
                  className={({ isActive }) =>
                    cn(
                      'flex items-center gap-3 rounded-[var(--radius-md)] px-3 py-2.5 text-small font-medium transition-colors',
                      'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring',
                      isActive
                        ? 'bg-primary-muted text-primary'
                        : 'text-foreground-secondary hover:bg-surface-muted hover:text-foreground',
                    )
                  }
                >
                  <Icon className="size-4 shrink-0" aria-hidden />
                  <span className="truncate">{t.portal[item.labelKey]}</span>
                </NavLink>
              </li>
            )
          })}
        </ul>
      </nav>
      <div className="border-t border-border px-4 py-3">
        <p className="text-small text-foreground-secondary">{t.common.foundationNote}</p>
      </div>
    </aside>
  )
}
