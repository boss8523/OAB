import { useI18n } from '@/i18n'
import { PageHeader } from '@/components/ui/PageHeader'
import { EmptyState } from '@/components/ui/States'
import { Badge } from '@/components/ui/Badge'

interface PortalPlaceholderPageProps {
  title: string
}

export function PortalPlaceholderPage({ title }: PortalPlaceholderPageProps) {
  const { t } = useI18n()

  return (
    <div className="mx-auto max-w-[var(--container-wide)]">
      <PageHeader
        title={title}
        description={t.portal.placeholder}
        breadcrumbs={[
          { label: t.portal.breadcrumbsHome, href: '/portal' },
          { label: title },
        ]}
        actions={<Badge tone="primary">{t.common.comingSoon}</Badge>}
      />
      <EmptyState title={t.states.emptyTitle} description={t.states.emptyDescription} />
    </div>
  )
}
