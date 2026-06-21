'use client'
import { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Activity, Compass, LayoutDashboard, Plus, User } from 'lucide-react'
import { classNames } from '@/shared/lib/utils'
import { useTranslation } from '@/shared/hooks/use-locale'
import { Button } from '@/shared/ui/button'
import { LocaleSwitcher } from '@/shared/ui/locale-switcher'
import styles from '../AppHeader.module.scss'

const navItems = [
  { href: '/', labelKey: 'nav.explore', icon: Compass },
  { href: '/workspace', labelKey: 'nav.workspace', icon: LayoutDashboard },
  { href: '/activity', labelKey: 'nav.activity', icon: Activity },
  { href: '/profile', labelKey: 'nav.profile', icon: User },
]

export const AppHeader = () => {
  const pathname = usePathname()
  const translate = useTranslation()
  const [isCondensed, setIsCondensed] = useState(false)

  useEffect(() => {
    const updateHeaderState = () => {
      setIsCondensed(window.scrollY > 12)
    }

    updateHeaderState()
    window.addEventListener('scroll', updateHeaderState, { passive: true })

    return () => window.removeEventListener('scroll', updateHeaderState)
  }, [])

  return (
    <header className={classNames(styles.siteChrome, isCondensed && styles.condensed)}>
      <div className={styles.nav}>
        <div className={styles.container}>
          <svg className={styles.glassDefs} aria-hidden="true">
            <filter id="app-header-liquid-glass" colorInterpolationFilters="sRGB">
              <feImage
                x="0"
                y="0"
                width="100%"
                height="100%"
                preserveAspectRatio="none"
                result="map"
                href="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100' preserveAspectRatio='none'%3E%3Cdefs%3E%3CradialGradient id='a' cx='18%25' cy='0%25' r='78%25'%3E%3Cstop offset='0%25' stop-color='rgb(255,128,128)'/%3E%3Cstop offset='52%25' stop-color='rgb(128,128,128)'/%3E%3Cstop offset='100%25' stop-color='rgb(44,128,220)'/%3E%3C/radialGradient%3E%3CradialGradient id='b' cx='88%25' cy='100%25' r='82%25'%3E%3Cstop offset='0%25' stop-color='rgb(36,128,255)'/%3E%3Cstop offset='58%25' stop-color='rgb(128,128,128)'/%3E%3Cstop offset='100%25' stop-color='rgb(230,128,62)'/%3E%3C/radialGradient%3E%3ClinearGradient id='c' x1='0' y1='0' x2='1' y2='1'%3E%3Cstop offset='0%25' stop-color='rgb(210,128,70)'/%3E%3Cstop offset='50%25' stop-color='rgb(128,128,128)'/%3E%3Cstop offset='100%25' stop-color='rgb(60,128,215)'/%3E%3C/linearGradient%3E%3C/defs%3E%3Crect width='100' height='100' fill='rgb(128,128,128)'/%3E%3Crect width='100' height='100' fill='url(%23c)' opacity='.42'/%3E%3Crect width='100' height='100' fill='url(%23a)' opacity='.58'/%3E%3Crect width='100' height='100' fill='url(%23b)' opacity='.46'/%3E%3C/svg%3E"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="map"
                xChannelSelector="R"
                yChannelSelector="B"
                scale="-180"
                result="dispRed"
              />
              <feColorMatrix
                in="dispRed"
                type="matrix"
                values="1 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 1 0"
                result="red"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="map"
                xChannelSelector="R"
                yChannelSelector="B"
                scale="-170"
                result="dispGreen"
              />
              <feColorMatrix
                in="dispGreen"
                type="matrix"
                values="0 0 0 0 0 0 1 0 0 0 0 0 0 0 0 0 0 0 1 0"
                result="green"
              />
              <feDisplacementMap
                in="SourceGraphic"
                in2="map"
                scale="-160"
                xChannelSelector="R"
                yChannelSelector="B"
                result="dispBlue"
              />
              <feColorMatrix
                in="dispBlue"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 1 0 0 0 0 0 1 0"
                result="blue"
              />
              <feBlend in="red" in2="green" mode="screen" result="rg" />
              <feBlend in="rg" in2="blue" mode="screen" result="output" />
              <feGaussianBlur in="output" stdDeviation="0.7" />
            </filter>
          </svg>

          <div className={styles.navInner}>
            <div className={styles.leftGroup}>
              <Link href="/" className={styles.logo} aria-label="За идею">
                <span className={styles.logoMark}>
                  <span>за</span>
                  <span>идею_</span>
                </span>
              </Link>

              <nav className={styles.navPrimary} aria-label="Основная навигация">
                {navItems.map(item => {
                  const isActive =
                    pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href))

                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={classNames(
                        styles.navLink,
                        isActive ? styles.navLinkActive : styles.navLinkIdle
                      )}
                      aria-current={isActive ? 'page' : undefined}
                    >
                      <item.icon className={styles.navIcon} />
                      <span className={styles.navText}>{translate(item.labelKey)}</span>
                    </Link>
                  )
                })}
              </nav>
            </div>

            <div className={styles.actions}>
              <LocaleSwitcher />
              <Button size="sm" className={styles.createButton} asChild>
                <Link href="/create-project">
                  <Plus className={styles.createIcon} />
                  <span className={styles.createText}>{translate('buttons.newProject')}</span>
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </header>
  )
}
