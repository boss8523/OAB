import { useI18n } from '@/i18n'
import { Container } from '@/components/ui/Container'
import { PageHeader } from '@/components/ui/PageHeader'
import { Badge } from '@/components/ui/Badge'
import { Button } from '@/components/ui/Button'
import { SlideUp } from '@/components/motion'

interface PublicPlaceholderPageProps {
  title: string
  description?: string
}

export function PublicPlaceholderPage({ title, description }: PublicPlaceholderPageProps) {
  const { t } = useI18n()

  return (
    <div className="section-space">
      <Container>
        <SlideUp>
          <PageHeader
            title={title}
            description={description ?? t.common.foundationNote}
            breadcrumbs={[
              { label: t.nav.home, href: '/' },
              { label: title },
            ]}
            actions={<Badge tone="primary">{t.common.comingSoon}</Badge>}
          />
          <div className="max-w-2xl space-y-4 border-t border-border pt-8">
            <p className="text-body-lg text-foreground-secondary">{t.common.foundationNote}</p>
            <Button to="/" variant="outline">
              {t.common.back}
            </Button>
          </div>
        </SlideUp>
      </Container>
    </div>
  )
}
