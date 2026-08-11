import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useI18n } from '@/i18n'
import { Drawer } from '@/components/ui/Drawer'
import { PageTransition } from '@/components/motion'
import { PortalSidebar } from './PortalSidebar'
import { PortalTopBar } from './PortalTopBar'

export function PortalLayout() {
  const { t } = useI18n()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-dvh bg-background">
      <a href="#portal-content" className="skip-link">
        {t.nav.skipToContent}
      </a>

      {/* Desktop sidebar */}
      <div className="sticky top-0 hidden h-dvh shrink-0 lg:block">
        <PortalSidebar />
      </div>

      {/* Mobile drawer sidebar */}
      <Drawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        side="left"
        className="w-[min(100%,var(--portal-sidebar-width))] p-0 lg:hidden"
        labelledBy="portal-mobile-nav"
      >
        <span id="portal-mobile-nav" className="sr-only">
          {t.portal.title}
        </span>
        <PortalSidebar onNavigate={() => setMobileOpen(false)} className="w-full border-0" />
      </Drawer>

      <div className="flex min-w-0 flex-1 flex-col">
        <PortalTopBar onOpenSidebar={() => setMobileOpen(true)} />
        <main id="portal-content" className="flex-1 px-4 py-6 md:px-6 md:py-8">
          <PageTransition>
            <Outlet />
          </PageTransition>
        </main>
      </div>
    </div>
  )
}
