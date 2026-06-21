'use client'
import { LocaleProvider } from '@/shared/hooks/use-locale'
export const AppLocaleProvider = ({ children }: { children: React.ReactNode }) => {
  return <LocaleProvider>{children}</LocaleProvider>
}
