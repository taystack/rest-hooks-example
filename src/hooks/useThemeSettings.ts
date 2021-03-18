import { useCallback, useRef } from 'react'


const THEME_SETTINGS_KEY = 'pk-theme-dark'
const THEME_DARK = 'dark'
const THEME_LIGHT = 'light'

type UseThemeSettings = []

export default function useThemeSettings(): [ string, () => void ] {
  const theme = useRef<string>(localStorage.getItem(THEME_SETTINGS_KEY) || THEME_LIGHT)
  const toggleTheme = useCallback(() => {
    console.log(theme)
    theme.current = theme.current === THEME_LIGHT ? THEME_DARK : THEME_LIGHT
    localStorage.setItem(THEME_SETTINGS_KEY, theme.current)
  }, [theme])
  return [theme.current, toggleTheme]
}