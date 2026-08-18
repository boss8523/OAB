import { useI18n } from '@/i18n'
import { PortalPlaceholderPage } from './PortalPlaceholderPage'

export function PortalFarmersPage() {
  const { t } = useI18n()
  return <PortalPlaceholderPage title={t.portal.farmers} />
}

export function PortalFieldVisitsPage() {
  const { t } = useI18n()
  return <PortalPlaceholderPage title={t.portal.fieldVisits} />
}

export function PortalRequestsPage() {
  const { t } = useI18n()
  return <PortalPlaceholderPage title={t.portal.requests} />
}

export function PortalIncidentsPage() {
  const { t } = useI18n()
  return <PortalPlaceholderPage title={t.portal.incidents} />
}

export function PortalAlertsPage() {
  const { t } = useI18n()
  return <PortalPlaceholderPage title={t.portal.alerts} />
}

export function PortalReportsPage() {
  const { t } = useI18n()
  return <PortalPlaceholderPage title={t.portal.reports} />
}
