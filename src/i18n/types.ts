export type LocaleCode = 'om' | 'am' | 'en'

export type Direction = 'ltr'

export interface LocaleMeta {
  code: LocaleCode
  label: string
  nativeLabel: string
  htmlLang: string
  dir: Direction
  usesEthiopicScript: boolean
}

export const LOCALES: Record<LocaleCode, LocaleMeta> = {
  om: {
    code: 'om',
    label: 'Afaan Oromo',
    nativeLabel: 'Afaan Oromoo',
    htmlLang: 'om',
    dir: 'ltr',
    usesEthiopicScript: false,
  },
  am: {
    code: 'am',
    label: 'Amharic',
    nativeLabel: 'አማርኛ',
    htmlLang: 'am',
    dir: 'ltr',
    usesEthiopicScript: true,
  },
  en: {
    code: 'en',
    label: 'English',
    nativeLabel: 'English',
    htmlLang: 'en',
    dir: 'ltr',
    usesEthiopicScript: false,
  },
}

export const DEFAULT_LOCALE: LocaleCode = 'om'

export type TranslationDictionary = {
  brand: {
    short: string
    full: string
    platform: string
    tagline: string
  }
  nav: {
    home: string
    about: string
    services: string
    programs: string
    market: string
    alerts: string
    resources: string
    news: string
    achievements: string
    investment: string
    contact: string
    portal: string
    openMenu: string
    closeMenu: string
    skipToContent: string
  }
  common: {
    learnMore: string
    getStarted: string
    search: string
    searchPlaceholder: string
    loading: string
    error: string
    empty: string
    retry: string
    save: string
    cancel: string
    close: string
    back: string
    next: string
    previous: string
    viewAll: string
    notifications: string
    profile: string
    settings: string
    theme: string
    light: string
    dark: string
    system: string
    language: string
    comingSoon: string
    foundationNote: string
  }
  home: {
    headline: string
    subhead: string
    ctaPrimary: string
    ctaSecondary: string
    announcement: string
  }
  footer: {
    rights: string
    bureau: string
    quickLinks: string
    contact: string
    address: string
  }
  portal: {
    title: string
    dashboard: string
    farmers: string
    fieldVisits: string
    requests: string
    incidents: string
    alerts: string
    reports: string
    overview: string
    pageHeader: string
    breadcrumbsHome: string
    shellNote: string
    kpiFarmers: string
    kpiVisits: string
    kpiRequests: string
    kpiAlerts: string
    recentActivity: string
    placeholder: string
  }
  states: {
    emptyTitle: string
    emptyDescription: string
    errorTitle: string
    errorDescription: string
    loadingLabel: string
  }
}
