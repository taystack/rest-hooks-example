import React, { createContext, ReactElement, useCallback, useState } from 'react'


const THEME_SETTINGS_KEY = 'pk-theme'
const THEME_DARK = 'dark'
const THEME_LIGHT = 'light'


interface ThemeContextProps {
  theme: string
  toggleTheme: () => void
}

export const ThemeContext = createContext<ThemeContextProps>({ theme: THEME_LIGHT, toggleTheme: () => {} })

export default function ThemeContextProvider({ children }: { children: any }): ReactElement {
  const [theme, setTheme] = useState<string>(localStorage.getItem(THEME_SETTINGS_KEY) || THEME_LIGHT)
  const toggleTheme = useCallback(() => {
    setTheme(old => {
      const newTheme = old === THEME_LIGHT ? THEME_DARK : THEME_LIGHT
      localStorage.setItem(THEME_SETTINGS_KEY, newTheme)
      return newTheme
    })
  }, [setTheme])
  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      <div id={'ThemeContext'} className={theme}>
        {children}
      </div>
    </ThemeContext.Provider>
  )
}
