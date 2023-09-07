'use client'

import * as React from 'react'
import { NextUIProvider } from '@nextui-org/system'
import { ThemeProvider as NextThemesProvider, useTheme } from 'next-themes'
import { ThemeProviderProps } from 'next-themes/dist/types'

export interface ProvidersProps {
  children: React.ReactNode
  themeProps?: ThemeProviderProps
}

export function UIProviders({ children, themeProps }: ProvidersProps) {
  return (
    <NextUIProvider>
      <NextThemesProvider {...themeProps}>{children}</NextThemesProvider>
    </NextUIProvider>
  )
}

export const useThemeModeValue = (lightValue: string, darkValue: string) => {
  const { theme } = useTheme()
  return theme === 'dark' ? darkValue : lightValue
}
