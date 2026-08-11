import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes, useLocation } from 'react-router-dom'
import { PublicLayout } from '@/layouts/PublicLayout'
import { PortalLayout } from '@/layouts/PortalLayout'
import { LoadingState } from '@/components/ui/States'
import { useI18n } from '@/i18n'

const HomePage = lazy(() =>
  import('@/pages/public/HomePage').then((m) => ({ default: m.HomePage })),
)
const AboutPage = lazy(() =>
  import('@/pages/public/stubs').then((m) => ({ default: m.AboutPage })),
)
const ServicesPage = lazy(() =>
  import('@/pages/public/stubs').then((m) => ({ default: m.ServicesPage })),
)
const ProgramsPage = lazy(() =>
  import('@/pages/public/stubs').then((m) => ({ default: m.ProgramsPage })),
)
const MarketPage = lazy(() =>
  import('@/pages/public/stubs').then((m) => ({ default: m.MarketPage })),
)
const AlertsPage = lazy(() =>
  import('@/pages/public/stubs').then((m) => ({ default: m.AlertsPage })),
)
const ResourcesPage = lazy(() =>
  import('@/pages/public/stubs').then((m) => ({ default: m.ResourcesPage })),
)
const NewsPage = lazy(() =>
  import('@/pages/public/stubs').then((m) => ({ default: m.NewsPage })),
)
const AchievementsPage = lazy(() =>
  import('@/pages/public/stubs').then((m) => ({ default: m.AchievementsPage })),
)
const InvestmentPage = lazy(() =>
  import('@/pages/public/stubs').then((m) => ({ default: m.InvestmentPage })),
)
const ContactPage = lazy(() =>
  import('@/pages/public/stubs').then((m) => ({ default: m.ContactPage })),
)

const PortalDashboardPage = lazy(() =>
  import('@/pages/portal/PortalDashboardPage').then((m) => ({
    default: m.PortalDashboardPage,
  })),
)
const PortalFarmersPage = lazy(() =>
  import('@/pages/portal/stubs').then((m) => ({ default: m.PortalFarmersPage })),
)
const PortalFieldVisitsPage = lazy(() =>
  import('@/pages/portal/stubs').then((m) => ({ default: m.PortalFieldVisitsPage })),
)
const PortalRequestsPage = lazy(() =>
  import('@/pages/portal/stubs').then((m) => ({ default: m.PortalRequestsPage })),
)
const PortalIncidentsPage = lazy(() =>
  import('@/pages/portal/stubs').then((m) => ({ default: m.PortalIncidentsPage })),
)
const PortalAlertsPage = lazy(() =>
  import('@/pages/portal/stubs').then((m) => ({ default: m.PortalAlertsPage })),
)
const PortalReportsPage = lazy(() =>
  import('@/pages/portal/stubs').then((m) => ({ default: m.PortalReportsPage })),
)

function RouteFallback() {
  const { t } = useI18n()
  return <LoadingState label={t.common.loading} className="min-h-[40vh]" />
}

function AnimatedRoutes() {
  const location = useLocation()

  return (
    <Suspense fallback={<RouteFallback />}>
      <Routes location={location}>
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="services" element={<ServicesPage />} />
          <Route path="programs" element={<ProgramsPage />} />
          <Route path="market" element={<MarketPage />} />
          <Route path="alerts" element={<AlertsPage />} />
          <Route path="resources" element={<ResourcesPage />} />
          <Route path="news" element={<NewsPage />} />
          <Route path="news/:slug" element={<NewsPage />} />
          <Route path="achievements" element={<AchievementsPage />} />
          <Route path="achievements/:slug" element={<AchievementsPage />} />
          <Route path="investment" element={<InvestmentPage />} />
          <Route path="contact" element={<ContactPage />} />
        </Route>

        <Route path="portal" element={<PortalLayout />}>
          <Route index element={<PortalDashboardPage />} />
          <Route path="dashboard" element={<Navigate to="/portal" replace />} />
          <Route path="farmers" element={<PortalFarmersPage />} />
          <Route path="farmers/:id" element={<PortalFarmersPage />} />
          <Route path="field-visits" element={<PortalFieldVisitsPage />} />
          <Route path="requests" element={<PortalRequestsPage />} />
          <Route path="incidents" element={<PortalIncidentsPage />} />
          <Route path="alerts" element={<PortalAlertsPage />} />
          <Route path="reports" element={<PortalReportsPage />} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Suspense>
  )
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <AnimatedRoutes />
    </BrowserRouter>
  )
}
