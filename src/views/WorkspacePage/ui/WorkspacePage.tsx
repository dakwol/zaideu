'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { AppHeader } from '@/widgets/AppHeader'
import { StatusBadge } from '@/shared/ui/status-badge'
import { ProgressBar } from '@/shared/ui/progress-bar'
import { mockProjects, mockUsers } from '@/shared/lib/mock-data'
import type { Project } from '@/shared/lib/types'
import { 
  Clock, 
  AlertCircle, 
  ArrowRight, 
  Zap, 
  Play, 
  RefreshCw,
  Target,
  Compass
} from 'lucide-react'
import { Button } from '@/shared/ui/button'
import { cn } from '@/shared/lib/utils'
import { useTranslation } from '@/shared/hooks/use-locale'

const currentUser = mockUsers[0]

function getUserProjects(): Project[] {
  return mockProjects.filter(p => 
    p.participants.some(u => u.id === currentUser.id)
  )
}

export function WorkspacePage() {
  const t = useTranslation()

  const userProjects = useMemo(() => getUserProjects(), [])
  
  const activeProjects = useMemo(() => 
    userProjects.filter(p => p.status === 'active' || p.status === 'revival'), 
    [userProjects]
  )
  
  const atRiskProjects = useMemo(() => 
    userProjects.filter(p => p.status === 'slow' || p.status === 'stalled'), 
    [userProjects]
  )
  
  const nextActions = useMemo(() => 
    userProjects
      .filter(p => p.nextAction && p.status !== 'completed')
      .sort((a, b) => {
        const aUrgent = a.status === 'slow' || a.status === 'stalled' ? 1 : 0
        const bUrgent = b.status === 'slow' || b.status === 'stalled' ? 1 : 0
        return bUrgent - aUrgent
      }),
    [userProjects]
  )

  const formatLastActivity = (date: Date) => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)
    
    if (diffHours < 1) return t('duration.updated', { time: t('duration.justNow') })
    if (diffHours < 24) return t('duration.updated', { time: t('duration.hoursAgo', { count: diffHours }) })
    if (diffDays === 1) return t('duration.updated', { time: t('duration.yesterday') })
    return t('duration.updated', { time: t('duration.daysAgo', { count: diffDays }) })
  }

  const formatEstimate = (minutes: number) => {
    if (minutes >= 60) {
      const hours = Math.floor(minutes / 60)
      const mins = minutes % 60
      return mins > 0
        ? `${hours}${t('duration.h')} ${mins}${t('duration.min')}`
        : `${hours}${t('duration.h')}`
    }
    return `${minutes}${t('duration.min')}`
  }

  function NextActionCard({ project }: { project: Project }) {
    if (!project.nextAction) return null
    
    const isUrgent = project.status === 'slow' || project.status === 'stalled'
    
    return (
      <div 
        className={cn(
          'bg-card border rounded-lg p-4 transition-all hover:border-accent/40',
          isUrgent ? 'border-amber-500/40' : 'border-border'
        )}
      >
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex-1 min-w-0">
            <Link 
              href={`/project/${project.id}`}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              {project.title}
            </Link>
            <h3 className="font-semibold text-foreground mt-1 line-clamp-1">
              {project.nextAction.title}
            </h3>
          </div>
          <StatusBadge status={project.status} size="sm" />
        </div>
        
        <div className="flex items-center gap-4 text-xs text-muted-foreground mb-4">
          <span className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            {formatEstimate(project.nextAction.estimateMinutes)}
          </span>
          {project.overdueTasks > 0 && (
            <span className="flex items-center gap-1 text-amber-600">
              <AlertCircle className="w-3 h-3" />
              {project.overdueTasks} {t('workspace.pendingActions')}
            </span>
          )}
        </div>
        
        <div className="flex items-center gap-2">
          <Button size="sm" className="flex-1 gap-1.5">
            <Play className="w-3.5 h-3.5" />
            {t('buttons.continueWork')}
          </Button>
          <Button size="sm" variant="outline" className="gap-1.5">
            <Zap className="w-3.5 h-3.5" />
            {t('buttons.takeTask')}
          </Button>
        </div>
      </div>
    )
  }

  function UserProjectRow({ project }: { project: Project }) {
    const needsAction = project.status === 'slow' || project.status === 'stalled'
    
    return (
      <div className={cn(
        'flex items-center gap-4 p-4 bg-card border rounded-lg transition-all hover:border-accent/40',
        needsAction && 'border-amber-500/30'
      )}>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <Link 
              href={`/project/${project.id}`}
              className="font-medium text-foreground hover:text-accent transition-colors truncate"
            >
              {project.title}
            </Link>
            <StatusBadge status={project.status} size="sm" />
          </div>
          <div className="flex items-center gap-3 text-xs text-muted-foreground">
            <span>{formatLastActivity(project.updatedAt)}</span>
            {project.overdueTasks > 0 && (
              <span className="text-amber-600 flex items-center gap-1">
                <AlertCircle className="w-3 h-3" />
                {project.overdueTasks} {t('workspace.pendingActions')}
              </span>
            )}
          </div>
        </div>
        
        <div className="flex items-center gap-4">
          <div className="w-24">
            <ProgressBar value={project.progress} size="sm" />
            <p className="text-xs text-muted-foreground text-right mt-1">{project.progress}%</p>
          </div>
          
          <Link href={`/project/${project.id}`}>
            <Button variant="ghost" size="sm" className="gap-1">
              {t('buttons.view')}
              <ArrowRight className="w-3 h-3" />
            </Button>
          </Link>
        </div>
      </div>
    )
  }

  function RecoveryActions({ project }: { project: Project }) {
    return (
      <div className="mt-3 p-3 bg-amber-500/5 border border-amber-500/20 rounded-md">
        <p className="text-xs font-medium text-amber-700 mb-2">{t('workspace.recoveryActions')}</p>
        <div className="flex flex-wrap gap-2">
          <button className="text-xs px-2.5 py-1 bg-amber-100 text-amber-800 rounded hover:bg-amber-200 transition-colors">
            {t('workspace.actionTake30')}
          </button>
          <button className="text-xs px-2.5 py-1 bg-amber-100 text-amber-800 rounded hover:bg-amber-200 transition-colors">
            {t('workspace.actionSimplify')}
          </button>
          <button className="text-xs px-2.5 py-1 bg-amber-100 text-amber-800 rounded hover:bg-amber-200 transition-colors">
            {t('workspace.actionReassign')}
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />
      
      <main className="max-w-4xl mx-auto px-4 sm:px-6 py-8">
        <div className="mb-8">
          <h1 className="text-2xl font-bold text-foreground mb-2">{t('workspace.title')}</h1>
          <p className="text-muted-foreground">
            {t('workspace.subtitle')}
          </p>
        </div>
        
        <section className="mb-10">
          <div className="flex items-center gap-2 mb-4">
            <Target className="w-4 h-4 text-accent" />
            <h2 className="font-semibold text-foreground">{t('workspace.nextActions')}</h2>
          </div>
          
          {nextActions.length > 0 ? (
            <div className="grid gap-4 sm:grid-cols-2">
              {nextActions.slice(0, 4).map((project) => (
                <NextActionCard key={project.id} project={project} />
              ))}
            </div>
          ) : (
            <div className="text-center py-8 bg-card border border-border rounded-lg">
              <p className="text-muted-foreground mb-4">{t('workspace.noPendingActions')}</p>
              <Link href="/">
                <Button variant="outline" className="gap-2">
                  <Compass className="w-4 h-4" />
                  {t('buttons.exploreProjects')}
                </Button>
              </Link>
            </div>
          )}
        </section>
        
        <section className="mb-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="font-semibold text-foreground">{t('workspace.yourProjects')}</h2>
            <span className="text-sm text-muted-foreground">{t('workspace.totalProjects', { count: userProjects.length })}</span>
          </div>
          
          {userProjects.length > 0 ? (
            <div className="space-y-3">
              {atRiskProjects.map((project) => (
                <div key={project.id}>
                  <UserProjectRow project={project} />
                  <RecoveryActions project={project} />
                </div>
              ))}
              
              {activeProjects.map((project) => (
                <UserProjectRow key={project.id} project={project} />
              ))}

              {userProjects
                .filter(p => p.status === 'completed')
                .map((project) => (
                  <UserProjectRow key={project.id} project={project} />
                ))
              }
            </div>
          ) : (
            <div className="text-center py-12 bg-card border border-border rounded-lg">
              <p className="text-muted-foreground mb-4">
                {t('workspace.noProjectsYet')}
              </p>
              <Link href="/">
                <Button className="gap-2">
                  <Compass className="w-4 h-4" />
                  {t('workspace.findProject')}
                </Button>
              </Link>
            </div>
          )}
        </section>
        
        <section className="p-6 bg-secondary/50 border border-border rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <h3 className="font-medium text-foreground mb-1">{t('workspace.exploreMore')}</h3>
              <p className="text-sm text-muted-foreground">
                {t('workspace.exploreMoreDescription')}
              </p>
            </div>
            <Link href="/">
              <Button variant="outline" className="gap-2">
                <RefreshCw className="w-4 h-4" />
                {t('workspace.browseProjects')}
              </Button>
            </Link>
          </div>
        </section>
      </main>
    </div>
  )
}
