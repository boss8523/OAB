import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from 'react'
import { DEFAULT_LOCALE, LOCALES, type LocaleCode, type TranslationDictionary } from './types'
import { om } from './locales/om'
import { en } from './locales/en'
import { am } from './locales/am'

const dictionaries: Record<LocaleCode, TranslationDictionary> = { om, en, am }
const STORAGE_KEY = 'oab-locale'

interface I18nContextValue {
  locale: LocaleCode
  t: TranslationDictionary
  setLocale: (locale: LocaleCode) => void
  locales: typeof LOCALES
}

const I18nContext = createContext<I18nContextValue | null>(null)

function readStoredLocale(): LocaleCode {
  const stored = localStorage.getItem(STORAGE_KEY)
  if (stored === 'om' || stored === 'am' || stored === 'en') {
    return stored
  }
  return DEFAULT_LOCALE
}

function applyDocumentLocale(locale: LocaleCode) {
  const meta = LOCALES[locale]
  document.documentElement.lang = meta.htmlLang
  document.documentElement.dir = meta.dir
  document.documentElement.dataset.locale = locale
  document.documentElement.dataset.script = meta.usesEthiopicScript
    ? 'ethiopic'
    : 'latin'
}

export function I18nProvider({ children }: { children: ReactNode }) {
  const [locale, setLocaleState] = useState<LocaleCode>(() => {
    if (typeof window === 'undefined') return DEFAULT_LOCALE
    return readStoredLocale()
  })

  useEffect(() => {
    applyDocumentLocale(locale)
    localStorage.setItem(STORAGE_KEY, locale)
  }, [locale])

  const setLocale = useCallback((next: LocaleCode) => {
    setLocaleState(next)
  }, [])

  const value = useMemo<I18nContextValue>(
    () => ({
      locale,
      t: dictionaries[locale],
      setLocale,
      locales: LOCALES,
    }),
    [locale, setLocale],
  )

  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>
}

export function useI18n() {
  const ctx = useContext(I18nContext)
  if (!ctx) {
    throw new Error('useI18n must be used within I18nProvider')
  }
  return ctx
}

export { LOCALES, DEFAULT_LOCALE }
export type { LocaleCode, TranslationDictionary }
