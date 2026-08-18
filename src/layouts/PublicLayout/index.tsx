import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { useI18n } from '@/i18n'
import { PageTransition } from '@/components/motion'
import { AnnouncementBar } from './AnnouncementBar'
import { PublicHeader } from './PublicHeader'
import { PublicFooter } from './PublicFooter'
import { PublicMobileNav } from './PublicMobileNav'

export function PublicLayout() {
  const { t } = useI18n()
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <div className="flex min-h-dvh flex-col">
      <a href="#main-content" className="skip-link">
        {t.nav.skipToContent}
      </a>
      <AnnouncementBar />
      <PublicHeader onOpenMobileNav={() => setMobileOpen(true)} />
      <PublicMobileNav open={mobileOpen} onClose={() => setMobileOpen(false)} />
      <main id="main-content" className="flex-1">
        <PageTransition>
          <Outlet />
        </PageTransition>
      </main>
      <PublicFooter />
    </div>
  )
}
