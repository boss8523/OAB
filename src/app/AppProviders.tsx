import type { ReactNode } from 'react'
import { I18nProvider } from '@/i18n'
import { ThemeProvider } from '@/app/ThemeProvider'

export function AppProviders({ children }: { children: ReactNode }) {
  return (
    <ThemeProvider>
      <I18nProvider>{children}</I18nProvider>
    </ThemeProvider>
  )
}
