'use client'
import { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { defaultLocale, Locale, supportedLocales, translate } from '@/shared/lib/i18n'
interface LocaleContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  t: (key: string, params?: Record<string, string | number>) => string
}
const LocaleContext = createContext<LocaleContextValue | undefined>(undefined)
export const LocaleProvider = ({ children }: { children: React.ReactNode }) => {
  const [locale, setLocale] = useState<Locale>(defaultLocale)
  useEffect(() => {
    const saved = window.localStorage.getItem('locale') as Locale | null
    if (saved && supportedLocales.includes(saved)) {
      setLocale(saved)
    }
  }, [])
  useEffect(() => {
    window.localStorage.setItem('locale', locale)
  }, [locale])
  const value = useMemo(
    () => ({
      locale,
      setLocale,
      t: (key: string, params?: Record<string, string | number>) => translate(locale, key, params),
    }),
    [locale]
  )
  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>
}
export const useLocaleContext = () => {
  const context = useContext(LocaleContext)
  if (!context) {
    throw new Error('useLocaleContext must be used inside LocaleProvider')
  }
  return context
}
export const useLocale = () => {
  return useLocaleContext()
}
export const useTranslation = () => {
  const { t } = useLocaleContext()
  return t
}
