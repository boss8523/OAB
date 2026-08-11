import { ArrowRight } from 'lucide-react'
import { useI18n } from '@/i18n'
import { Button } from '@/components/ui/Button'
import { Container, SectionHeader } from '@/components/ui/Container'
import { Badge } from '@/components/ui/Badge'
import { ResponsiveImage } from '@/components/media/ResponsiveImage'
import {
  AnimatedCounter,
  FadeIn,
  ParallaxSection,
  SlideUp,
  StaggerContainer,
  StaggerItem,
} from '@/components/motion'

const HERO_IMAGE =
  'https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=1800&q=80'

const FIELD_IMAGE =
  'https://images.unsplash.com/photo-1574943320219-553eb213f72d?auto=format&fit=crop&w=1400&q=80'

export function HomePage() {
  const { t } = useI18n()

  return (
    <>
      <section className="relative min-h-[min(92dvh,52rem)] overflow-hidden">
        <div className="absolute inset-0">
          <ResponsiveImage
            src={HERO_IMAGE}
            alt=""
            aspect="wide"
            priority
            wrapperClassName="absolute inset-0 aspect-auto h-full rounded-none"
            className="scale-105"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[color-mix(in_oklab,var(--color-forest)_88%,transparent)] via-[color-mix(in_oklab,var(--color-forest)_55%,transparent)] to-[color-mix(in_oklab,var(--color-forest)_25%,transparent)]" />
          <div className="absolute inset-0 bg-gradient-to-t from-[color-mix(in_oklab,var(--color-forest)_70%,transparent)] via-transparent to-transparent" />
        </div>

        <Container className="relative flex min-h-[min(92dvh,52rem)] flex-col justify-end pb-16 pt-28 md:pb-20 md:pt-32">
          <FadeIn>
            <p className="mb-4 font-[family-name:var(--font-display)] text-hero text-primary-foreground md:text-display">
              {t.brand.full}
            </p>
          </FadeIn>
          <SlideUp delayMs={80}>
            <h1 className="max-w-3xl text-h1 text-primary-foreground/95 md:text-hero">
              {t.home.headline}
            </h1>
          </SlideUp>
          <SlideUp delayMs={140}>
            <p className="mt-5 max-w-xl text-body-lg text-primary-foreground/80">
              {t.home.subhead}
            </p>
          </SlideUp>
          <SlideUp delayMs={200}>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button to="/about" size="lg">
                {t.home.ctaPrimary}
              </Button>
              <Button
                to="/portal"
                size="lg"
                variant="outline"
                className="border-primary-foreground/35 bg-transparent text-primary-foreground hover:bg-primary-foreground/10"
                rightIcon={<ArrowRight />}
              >
                {t.home.ctaSecondary}
              </Button>
            </div>
          </SlideUp>
        </Container>
      </section>

      <section className="section-space">
        <Container>
          <SectionHeader
            eyebrow={t.brand.platform}
            title={t.common.foundationNote}
            description={t.brand.tagline}
          />
          <StaggerContainer className="grid gap-6 md:grid-cols-3">
            {[
              { label: t.portal.kpiFarmers, value: 128400 },
              { label: t.portal.kpiVisits, value: 1840 },
              { label: t.portal.kpiAlerts, value: 26 },
            ].map((item, index) => (
              <StaggerItem key={item.label} index={index}>
                <div className="border-t border-border pt-5">
                  <AnimatedCounter value={item.value} className="text-primary" />
                  <p className="mt-2 text-body text-foreground-secondary">{item.label}</p>
                  <Badge tone="primary" className="mt-3">
                    {t.common.comingSoon}
                  </Badge>
                </div>
              </StaggerItem>
            ))}
          </StaggerContainer>
        </Container>
      </section>

      <section className="section-space border-t border-border bg-surface/60">
        <Container className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
          <ParallaxSection intensity={18}>
            <ResponsiveImage
              src={FIELD_IMAGE}
              alt=""
              aspect="photo"
              wrapperClassName="rounded-[var(--radius-xl)]"
            />
          </ParallaxSection>
          <SlideUp>
            <p className="text-label text-primary">{t.brand.short}</p>
            <h2 className="mt-3 text-h2">{t.brand.platform}</h2>
            <p className="mt-4 text-body-lg text-foreground-secondary">{t.home.subhead}</p>
            <div className="mt-8">
              <Button to="/services" variant="secondary" rightIcon={<ArrowRight />}>
                {t.common.learnMore}
              </Button>
            </div>
          </SlideUp>
        </Container>
      </section>
    </>
  )
}
