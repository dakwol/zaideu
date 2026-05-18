'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { LocaleSwitcher } from '@/shared/ui/locale-switcher'
import { useTranslation } from '@/shared/hooks/use-locale'
import { Compass, LayoutDashboard, Activity, User, Plus } from 'lucide-react'

const navItems = [
  { href: '/', labelKey: 'nav.explore', icon: Compass },
  { href: '/workspace', labelKey: 'nav.workspace', icon: LayoutDashboard },
  { href: '/activity', labelKey: 'nav.activity', icon: Activity },
  { href: '/profile', labelKey: 'nav.profile', icon: User },
]

export function AppHeader() {
  const pathname = usePathname()
  const t = useTranslation()

  return (
    <header className="sticky top-0 z-50 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b border-border">
      <div className="max-w-6xl mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-14">
          <div className="flex items-center gap-8">
            <Link href="/" className="flex items-center gap-2">
              <span className="grid text-foreground text-xl font-black leading-[0.88] tracking-normal lowercase">
                <span>за</span>
                <span>идею_</span>
              </span>
            </Link>

            <nav className="flex items-center gap-1">
              {navItems.map((item) => {
                const isActive = pathname === item.href ||
                  (item.href !== '/' && pathname.startsWith(item.href))

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={cn(
                      'flex items-center gap-2 px-3 py-2 text-sm font-medium rounded-md transition-colors',
                      isActive
                        ? 'text-foreground bg-secondary'
                        : 'text-muted-foreground hover:text-foreground hover:bg-secondary/50'
                    )}
                  >
                    <item.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{t(item.labelKey)}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="flex items-center gap-2">
            <LocaleSwitcher />
            <Button size="sm" className="gap-1.5" asChild>
              <Link href="/create-project">
                <Plus className="w-4 h-4" />
                <span className="hidden sm:inline">{t('buttons.newProject')}</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </header>
  )
}
