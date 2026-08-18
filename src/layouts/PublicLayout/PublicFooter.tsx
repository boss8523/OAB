import { Link } from 'react-router-dom'
import { useI18n } from '@/i18n'
import { publicNavItems } from '@/app/navigation'
import { BrandMark } from '@/components/BrandMark'
import { Container } from '@/components/ui/Container'

export function PublicFooter() {
  const { t } = useI18n()
  const year = new Date().getFullYear()
  const footerLinks = publicNavItems.filter((item) =>
    ['about', 'services', 'programs', 'news', 'investment', 'contact'].includes(item.key),
  )

  return (
    <footer className="mt-auto border-t border-border bg-forest text-primary-foreground">
      <Container className="py-12 md:py-16">
        <div className="grid gap-10 md:grid-cols-[1.4fr_1fr_1fr]">
          <div className="space-y-4">
            <BrandMark inverse />
            <p className="max-w-sm text-body text-primary-foreground/75">{t.brand.tagline}</p>
          </div>
          <div>
            <h2 className="text-label text-primary-foreground/60">{t.footer.quickLinks}</h2>
            <ul className="mt-4 space-y-2">
              {footerLinks.map((item) => (
                <li key={item.key}>
                  <Link
                    to={item.path}
                    className="text-body text-primary-foreground/85 transition-colors hover:text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                  >
                    {t.nav[item.labelKey]}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
          <div>
            <h2 className="text-label text-primary-foreground/60">{t.footer.contact}</h2>
            <p className="mt-4 text-body text-primary-foreground/85">{t.footer.bureau}</p>
            <p className="mt-2 text-body text-primary-foreground/70">{t.footer.address}</p>
          </div>
        </div>
        <div className="mt-12 flex flex-col gap-2 border-t border-white/10 pt-6 text-small text-primary-foreground/55 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} {t.footer.bureau}. {t.footer.rights}.
          </p>
          <p>{t.brand.platform}</p>
        </div>
      </Container>
    </footer>
  )
}
