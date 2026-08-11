import { Moon, Sun, Languages } from 'lucide-react'
import { useI18n } from '@/i18n'
import { useTheme } from '@/app/ThemeProvider'
import { IconButton } from '@/components/ui/IconButton'
import {
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
} from '@/components/ui/Dropdown'
import { Tooltip } from '@/components/ui/Tooltip'

export function LanguageSwitcher({ compact = false }: { compact?: boolean }) {
  const { t, locale, setLocale, locales } = useI18n()

  return (
    <Dropdown>
      <DropdownTrigger
        label={t.common.language}
        className={compact ? 'border-0 bg-transparent px-2 shadow-none' : undefined}
      >
        <Languages className="size-4" aria-hidden />
        <span className="hidden sm:inline">{locales[locale].nativeLabel}</span>
      </DropdownTrigger>
      <DropdownMenu align="end">
        {(Object.keys(locales) as Array<keyof typeof locales>).map((code) => (
          <DropdownItem
            key={code}
            active={locale === code}
            onSelect={() => setLocale(code)}
          >
            {locales[code].nativeLabel}
          </DropdownItem>
        ))}
      </DropdownMenu>
    </Dropdown>
  )
}

export function ThemeToggle() {
  const { t } = useI18n()
  const { resolved, toggle } = useTheme()
  const label = resolved === 'dark' ? t.common.light : t.common.dark

  return (
    <Tooltip content={`${t.common.theme}: ${label}`}>
      <IconButton label={label} onClick={toggle} variant="ghost">
        {resolved === 'dark' ? <Sun /> : <Moon />}
      </IconButton>
    </Tooltip>
  )
}
