import { useEffect, useState } from 'react'

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() => {
    if (typeof window === 'undefined') return false
    return window.matchMedia('(prefers-reduced-motion: reduce)').matches
  })

  useEffect(() => {
    const media = window.matchMedia('(prefers-reduced-motion: reduce)')
    const onChange = () => setReduced(media.matches)
    media.addEventListener('change', onChange)
    return () => media.removeEventListener('change', onChange)
  }, [])

  return reduced
}

export function useIsLowPowerDevice(): boolean {
  const [lowPower, setLowPower] = useState(false)

  useEffect(() => {
    const connection = (
      navigator as Navigator & {
        connection?: { saveData?: boolean; effectiveType?: string }
      }
    ).connection

    const coarse = window.matchMedia('(pointer: coarse)').matches
    const saveData = Boolean(connection?.saveData)
    const slowNetwork =
      connection?.effectiveType === '2g' || connection?.effectiveType === 'slow-2g'

    setLowPower(Boolean(saveData || slowNetwork || (coarse && window.innerWidth < 768)))
  }, [])

  return lowPower
}
