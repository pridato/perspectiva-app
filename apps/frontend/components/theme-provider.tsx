'use client'

import * as React from 'react'
import {
  ThemeProvider as NextThemesProvider,
  type ThemeProviderProps,
} from 'next-themes'

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return <>{children}</>
  }

  return (
    <NextThemesProvider
      {...props}
      enableSystem={true}
      disableTransitionOnChange={true}
      attribute="class"
      defaultTheme="light"
      enableColorScheme={false}
      storageKey="perspectiva-theme"
    >
      {children}
    </NextThemesProvider>
  )
}
