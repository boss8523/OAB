export interface NavItem {
  key: string
  path: string
  labelKey: keyof import('@/i18n').TranslationDictionary['nav']
}

/** Public platform navigation — order matches product IA. */
export const publicNavItems: NavItem[] = [
  { key: 'home', path: '/', labelKey: 'home' },
  { key: 'about', path: '/about', labelKey: 'about' },
  { key: 'services', path: '/services', labelKey: 'services' },
  { key: 'programs', path: '/programs', labelKey: 'programs' },
  { key: 'market', path: '/market', labelKey: 'market' },
  { key: 'alerts', path: '/alerts', labelKey: 'alerts' },
  { key: 'resources', path: '/resources', labelKey: 'resources' },
  { key: 'news', path: '/news', labelKey: 'news' },
  { key: 'achievements', path: '/achievements', labelKey: 'achievements' },
  { key: 'investment', path: '/investment', labelKey: 'investment' },
  { key: 'contact', path: '/contact', labelKey: 'contact' },
]

export interface PortalNavItem {
  key: string
  path: string
  labelKey: keyof import('@/i18n').TranslationDictionary['portal']
}

export const portalNavItems: PortalNavItem[] = [
  { key: 'dashboard', path: '/portal', labelKey: 'dashboard' },
  { key: 'farmers', path: '/portal/farmers', labelKey: 'farmers' },
  { key: 'field-visits', path: '/portal/field-visits', labelKey: 'fieldVisits' },
  { key: 'requests', path: '/portal/requests', labelKey: 'requests' },
  { key: 'incidents', path: '/portal/incidents', labelKey: 'incidents' },
  { key: 'alerts', path: '/portal/alerts', labelKey: 'alerts' },
  { key: 'reports', path: '/portal/reports', labelKey: 'reports' },
]
