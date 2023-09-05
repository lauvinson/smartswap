import { useCallback, useEffect, useState } from 'react'

function isWindowVisible() {
  if (typeof document !== 'undefined') {
    return document.visibilityState !== 'hidden'
  }
  // 为服务器端提供默认值
  return true
}

/**
 * Returns whether the window is currently visible to the user.
 */
export default function useIsWindowVisible(): boolean {
  const [focused, setFocused] = useState<boolean>(isWindowVisible())
  const listener = useCallback(() => {
    setFocused(isWindowVisible())
  }, [])

  useEffect(() => {
    if (typeof document === 'undefined') return undefined

    document.addEventListener('visibilitychange', listener)
    return () => {
      if (typeof document === 'undefined') return
      document.removeEventListener('visibilitychange', listener)
    }
  }, [listener])

  return focused
}
