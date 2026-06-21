'use client'
import { useLocale } from '@/shared/hooks/use-locale'
import { Button } from '@/shared/ui/button'
import styles from '../LocaleSwitcher.module.scss'
export const LocaleSwitcher = () => {
  const { locale, setLocale, t } = useLocale()
  return (
    <div className={styles.switcher}>
      <Button
        variant={locale === 'en' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => setLocale('en')}
        className={styles.button}
      >
        {t('locale.en')}
      </Button>
      <Button
        variant={locale === 'ru' ? 'secondary' : 'ghost'}
        size="sm"
        onClick={() => setLocale('ru')}
        className={styles.button}
      >
        {t('locale.ru')}
      </Button>
    </div>
  )
}
