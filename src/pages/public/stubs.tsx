import { useI18n } from '@/i18n'
import { PublicPlaceholderPage } from './PublicPlaceholderPage'

export function AboutPage() {
  const { t } = useI18n()
  return <PublicPlaceholderPage title={t.nav.about} description={t.brand.tagline} />
}

export function ServicesPage() {
  const { t } = useI18n()
  return <PublicPlaceholderPage title={t.nav.services} />
}

export function ProgramsPage() {
  const { t } = useI18n()
  return <PublicPlaceholderPage title={t.nav.programs} />
}

export function MarketPage() {
  const { t } = useI18n()
  return <PublicPlaceholderPage title={t.nav.market} />
}

export function AlertsPage() {
  const { t } = useI18n()
  return <PublicPlaceholderPage title={t.nav.alerts} />
}

export function ResourcesPage() {
  const { t } = useI18n()
  return <PublicPlaceholderPage title={t.nav.resources} />
}

export function NewsPage() {
  const { t } = useI18n()
  return <PublicPlaceholderPage title={t.nav.news} />
}

export function AchievementsPage() {
  const { t } = useI18n()
  return <PublicPlaceholderPage title={t.nav.achievements} />
}

export function InvestmentPage() {
  const { t } = useI18n()
  return <PublicPlaceholderPage title={t.nav.investment} />
}

export function ContactPage() {
  const { t } = useI18n()
  return <PublicPlaceholderPage title={t.nav.contact} />
}
