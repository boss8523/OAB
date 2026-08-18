export type ThemeMode = 'light' | 'dark' | 'system'

const STORAGE_KEY = 'oab-theme'

export function getStoredTheme(): ThemeMode {
  const value = localStorage.getItem(STORAGE_KEY)
  if (value === 'light' || value === 'dark' || value === 'system') {
    return value
  }
  return 'system'
}

export function resolveTheme(mode: ThemeMode): 'light' | 'dark' {
  if (mode === 'system') {
    return window.matchMedia('(prefers-color-scheme: dark)').matches
      ? 'dark'
      : 'light'
  }
  return mode
}

export function applyTheme(mode: ThemeMode): 'light' | 'dark' {
  const resolved = resolveTheme(mode)
  const root = document.documentElement
  root.classList.toggle('dark', resolved === 'dark')
  root.dataset.theme = resolved
  localStorage.setItem(STORAGE_KEY, mode)
  return resolved
}
