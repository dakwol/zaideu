'use client'

import { useLocale } from '@/shared/hooks/use-locale'
import { Button } from '@/shared/ui/button'

export function LocaleSwitcher() {
  const { locale, setLocale, t } = useLocale()

  return (
    <div className="flex items-center gap-2">
      <Button
        variant={locale === 'en' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => setLocale('en')}
        className="gap-1"
      >
        {t('locale.en')}
      </Button>
      <Button
        variant={locale === 'ru' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => setLocale('ru')}
        className="gap-1"
      >
        {t('locale.ru')}
      </Button>
    </div>
  )
}
