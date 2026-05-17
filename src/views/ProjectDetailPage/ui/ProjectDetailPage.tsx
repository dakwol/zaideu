'use client'

import { notFound } from 'next/navigation'
import Link from 'next/link'
import { AppHeader } from '@/widgets/AppHeader'
import { StatusBadge } from '@/shared/ui/status-badge'
import { ProgressBar } from '@/shared/ui/progress-bar'
import { AvatarStack } from '@/shared/ui/avatar-stack'
import { Button } from '@/shared/ui/button'
import { getProjectById, getJournalEntriesByProjectId } from '@/shared/lib/mock-data'
import { cn } from '@/shared/lib/utils'
import { useTranslation } from '@/shared/hooks/use-locale'
import {
  ArrowLeft,
  Clock,
  Calendar,
  Check,
  AlertTriangle,
  Zap,
  CheckCircle2,
} from 'lucide-react'

interface ProjectPageProps {
  params: { id: string }
}

export function ProjectDetailPage({ params }: ProjectPageProps) {
  const t = useTranslation()
  const project = getProjectById(params.id)
  const journalEntries = getJournalEntriesByProjectId(params.id)

  if (!project) {
    notFound()
  }

  const currentStage = project.stages.find(s => !s.completed)
  const completedStages = project.stages.filter(s => s.completed).length
  const totalTasks = project.stages.reduce((acc, s) => acc + s.tasks.length, 0)
  const completedTasks = project.stages.reduce((acc, s) => acc + s.tasks.filter(t => t.completed).length, 0)

  const nextActions = project.stages
    .flatMap(s => s.tasks)
    .filter(t => !t.completed)
    .slice(0, 3)

  const contributorMap = new Map<string, { user: typeof project.participants[0], count: number }>()
  project.stages.forEach(stage => {
    stage.tasks.filter(t => t.completed && t.assignedUser).forEach(task => {
      const userId = task.assignedUser!.id
      const existing = contributorMap.get(userId)
      if (existing) {
        existing.count++
      } else {
        contributorMap.set(userId, { user: task.assignedUser!, count: 1 })
      }
    })
  })
  const topContributors = Array.from(contributorMap.values()).sort((a, b) => b.count - a.count).slice(0, 3)

  const healthConfig = {
    healthy: { color: 'bg-emerald-500', textColor: 'text-emerald-600', label: t('statusLabels.healthy'), icon: CheckCircle2 },
    slowing: { color: 'bg-amber-500', textColor: 'text-amber-600', label: t('statusLabels.slowing'), icon: AlertTriangle },
    at_risk: { color: 'bg-red-500', textColor: 'text-red-600', label: t('statusLabels.at_risk'), icon: AlertTriangle },
  }

  const health = healthConfig[project.health]

  const formatEstimate = (minutes: number) => {
    if (minutes < 60) return `${minutes}${t('duration.min')}`
    const hours = Math.floor(minutes / 60)
    const mins = minutes % 60
    return mins > 0
      ? `${hours}${t('duration.h')} ${mins}${t('duration.min')}`
      : `${hours}${t('duration.h')}`
  }

  const formatDeadline = (date: Date) => {
    const now = new Date()
    const diff = date.getTime() - now.getTime()
    const days = Math.ceil(diff / (1000 * 60 * 60 * 24))

    if (days < 0) return t('duration.overdue')
    if (days === 0) return t('duration.today')
    if (days === 1) return t('duration.tomorrow')
    return t('duration.daysAgo', { count: days })
  }

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  const getRelativeTime = (date: Date) => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const days = Math.floor(diff / (1000 * 60 * 60 * 24))
    const hours = Math.floor(diff / (1000 * 60 * 60))

    if (hours < 1) return t('duration.justNow')
    if (hours < 24) return t('duration.hoursAgo', { count: hours })
    if (days === 1) return t('duration.yesterday')
    return t('duration.daysAgo', { count: days })
  }

  return (
    <div className="min-h-screen bg-background">
      <AppHeader />

      <main className="max-w-5xl mx-auto px-4 sm:px-6 py-8">
        <div className="flex items-center gap-2 text-sm mb-6">
          <Link
            href="/"
            className="flex items-center gap-1 text-muted-foreground hover:text-foreground transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            {t('projectDetail.backToProjects')}
          </Link>
        </div>

        <section className="mb-8">
          <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-6">
            <div className="space-y-3">
              <div className="flex items-center gap-3">
                <h1 className="text-2xl font-bold text-foreground">
                  {project.title}
                </h1>
                <StatusBadge status={project.status} />
              </div>

              <p className="text-muted-foreground max-w-xl">
                {project.description}
              </p>

              <div className="flex flex-wrap gap-1.5">
                {project.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="flex items-center gap-3 pt-1">
                <AvatarStack users={project.participants} size="sm" />
                <span className="text-sm text-muted-foreground">
                  {project.participants.length} {t('profile.projectsLabel')}
                </span>
              </div>
            </div>

            <div className="lg:w-72 space-y-4 p-4 bg-card border border-border rounded-lg">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-card-foreground">{t('projectDetail.progress')}</span>
                  <span className="text-sm font-bold text-card-foreground">{project.progress}%</span>
                </div>
                <ProgressBar value={project.progress} size="md" />
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t('projectDetail.stage')}</span>
                <span className="font-medium text-card-foreground">
                  {currentStage?.title || t('projectDetail.completed')} ({completedStages + 1}/{project.stages.length})
                </span>
              </div>

              <div className="flex items-center justify-between text-sm">
                <span className="text-muted-foreground">{t('projectDetail.tasks')}</span>
                <span className="font-medium text-card-foreground">
                  {completedTasks} {t('profile.completed')} {t('profile.tasksLabel')}
                </span>
              </div>

              <div className={cn(
                'flex items-center gap-3 p-3 rounded-md border',
                project.health === 'healthy' && 'bg-emerald-500/5 border-emerald-500/20',
                project.health === 'slowing' && 'bg-amber-500/5 border-amber-500/20',
                project.health === 'at_risk' && 'bg-red-500/5 border-red-500/20',
              )}>
                <div className={cn('w-2.5 h-2.5 rounded-full', health.color)} />
                <div className="flex-1">
                  <p className={cn('text-sm font-medium', health.textColor)}>
                    {health.label}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t('projectDetail.processedBy')}: {getRelativeTime(project.updatedAt)}
                    {project.overdueTasks > 0 && (
                      <span className="text-destructive"> • {t('projectDetail.overdueTasks', { count: project.overdueTasks })}</span>
                    )}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mb-8">
          <div className="bg-accent/5 border-2 border-accent/30 rounded-xl p-6">
            <div className="flex items-center gap-2 mb-4">
              <Zap className="w-5 h-5 text-accent" />
              <h2 className="text-lg font-semibold text-foreground">{t('projectDetail.nextActions')}</h2>
            </div>

            {nextActions.length > 0 ? (
              <div className="space-y-3">
                {nextActions.map((task, index) => {
                  const deadlineText = formatDeadline(task.deadline)
                  const isOverdue = deadlineText === t('duration.overdue')

                  return (
                    <div
                      key={task.id}
                      className={cn(
                        'flex items-center gap-4 p-4 bg-card border rounded-lg transition-all hover:shadow-sm',
                        index === 0 ? 'border-accent/40 shadow-sm' : 'border-border'
                      )}
                    >
                      <div className={cn(
                        'flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold',
                        index === 0 ? 'bg-accent text-accent-foreground' : 'bg-muted text-muted-foreground'
                      )}>
                        {index + 1}
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-card-foreground truncate">
                          {task.title}
                        </h3>
                        <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                          <span className="flex items-center gap-1">
                            <Clock className="w-3.5 h-3.5" />
                            {formatEstimate(task.estimateMinutes)}
                          </span>
                          <span className={cn(
                            'flex items-center gap-1',
                            isOverdue && 'text-destructive'
                          )}>
                            <Calendar className="w-3.5 h-3.5" />
                            {deadlineText}
                          </span>
                        </div>
                      </div>
                    </div>
                  )
                })}
              </div>
            ) : (
              <p className="text-muted-foreground">{t('projectDetail.noNextActions')}</p>
            )}
          </div>
        </section>

        <section className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 bg-card border border-border rounded-lg">
            <h3 className="text-sm font-semibold text-foreground mb-3">{t('projectDetail.topContributors')}</h3>
            <div className="space-y-3">
              {topContributors.map((contributor) => (
                <div key={contributor.user.id} className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-3">
                    <AvatarStack users={[contributor.user]} size="sm" />
                    <div>
                      <p className="font-medium text-foreground">{contributor.user.name}</p>
                      <p className="text-xs text-muted-foreground">{contributor.count} {t('profile.completed')}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="p-6 bg-card border border-border rounded-lg col-span-2">
            <h3 className="text-sm font-semibold text-foreground mb-3">{t('projectDetail.projectOverview')}</h3>
            <div className="space-y-3 text-sm text-muted-foreground">
              {journalEntries.map((entry) => (
                <div key={entry.id} className="border-b border-border pb-3 last:border-0">
                  <p>{entry.whatWasDone}</p>
                  <p className="text-xs text-muted-foreground mt-1">{formatDate(entry.timestamp)}</p>
                </div>
              ))}
            </div>
          </div>
        </section>
      </main>
    </div>
  )
}
