import { useI18n } from '@/i18n'
import { PageHeader } from '@/components/ui/PageHeader'
import { Card } from '@/components/ui/Card'
import { StatusBadge } from '@/components/ui/Badge'
import { EmptyState } from '@/components/ui/States'
import { AnimatedCounter, StaggerContainer, StaggerItem } from '@/components/motion'

export function PortalDashboardPage() {
  const { t } = useI18n()

  const kpis = [
    { label: t.portal.kpiFarmers, value: 128400, status: 'success' as const },
    { label: t.portal.kpiVisits, value: 1840, status: 'info' as const },
    { label: t.portal.kpiRequests, value: 96, status: 'warning' as const },
    { label: t.portal.kpiAlerts, value: 26, status: 'danger' as const },
  ]

  return (
    <div className="mx-auto max-w-[var(--container-wide)]">
      <PageHeader
        title={t.portal.pageHeader}
        description={t.portal.shellNote}
        breadcrumbs={[
          { label: t.portal.breadcrumbsHome, href: '/portal' },
          { label: t.portal.dashboard },
        ]}
      />

      <StaggerContainer className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.map((kpi, index) => (
          <StaggerItem key={kpi.label} index={index}>
            <Card className="space-y-3">
              <div className="flex items-center justify-between gap-2">
                <p className="text-small text-foreground-secondary">{kpi.label}</p>
                <StatusBadge status={kpi.status} label={t.portal.overview} />
              </div>
              <AnimatedCounter value={kpi.value} />
            </Card>
          </StaggerItem>
        ))}
      </StaggerContainer>

      <div className="mt-6 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <Card>
          <h2 className="text-h4">{t.portal.recentActivity}</h2>
          <p className="mt-2 text-body text-foreground-secondary">{t.portal.placeholder}</p>
          <div className="mt-6">
            <EmptyState
              title={t.states.emptyTitle}
              description={t.states.emptyDescription}
              className="border-0 bg-surface-muted/50 py-10"
            />
          </div>
        </Card>
        <Card>
          <h2 className="text-h4">{t.portal.alerts}</h2>
          <p className="mt-2 text-body text-foreground-secondary">{t.common.foundationNote}</p>
          <ul className="mt-6 space-y-3">
            {[1, 2, 3].map((item) => (
              <li
                key={item}
                className="flex items-start justify-between gap-3 border-b border-border pb-3 last:border-0"
              >
                <div>
                  <p className="text-body font-medium text-foreground">
                    {t.portal.alerts} #{item}
                  </p>
                  <p className="text-small text-foreground-secondary">{t.common.comingSoon}</p>
                </div>
                <StatusBadge status={item === 1 ? 'danger' : 'warning'} label={t.portal.overview} />
              </li>
            ))}
          </ul>
        </Card>
      </div>
    </div>
  )
}
