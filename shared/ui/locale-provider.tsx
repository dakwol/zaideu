'use client'

import { LocaleProvider } from '@/shared/hooks/use-locale'

export function AppLocaleProvider({ children }: { children: React.ReactNode }) {
  return <LocaleProvider>{children}</LocaleProvider>
}
