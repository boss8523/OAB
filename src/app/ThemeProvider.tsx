import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import {
  applyTheme,
  getStoredTheme,
  type ThemeMode,
} from '@/lib/theme'

interface ThemeContextValue {
  mode: ThemeMode
  resolved: 'light' | 'dark'
  setMode: (mode: ThemeMode) => void
  toggle: () => void
}

const ThemeContext = createContext<ThemeContextValue | null>(null)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [mode, setModeState] = useState<ThemeMode>(() => {
    if (typeof window === 'undefined') return 'system'
    return getStoredTheme()
  })
  const [resolved, setResolved] = useState<'light' | 'dark'>(() => {
    if (typeof window === 'undefined') return 'light'
    return applyTheme(getStoredTheme())
  })

  useEffect(() => {
    setResolved(applyTheme(mode))

    if (mode !== 'system') return

    const media = window.matchMedia('(prefers-color-scheme: dark)')
    const onChange = () => setResolved(applyTheme('system'))
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [mode])

  const setMode = useCallback((next: ThemeMode) => {
    setModeState(next)
  }, [])

  const toggle = useCallback(() => {
    setModeState((current) => {
      const nextResolved =
        current === 'system'
          ? applyTheme('system') === 'dark'
            ? 'light'
            : 'dark'
          : current === 'dark'
            ? 'light'
            : 'dark'
      return nextResolved
    })
  }, [])

  const value = useMemo(
    () => ({ mode, resolved, setMode, toggle }),
    [mode, resolved, setMode, toggle],
  )

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const ctx = useContext(ThemeContext)
  if (!ctx) {
    throw new Error('useTheme must be used within ThemeProvider')
  }
  return ctx
}
