'use client'

import Link from 'next/link'
import { cn } from '@/shared/lib/utils'
import type { Project, HealthStatus } from '@/shared/lib/types'
import { StatusBadge } from '@/shared/ui/status-badge'
import { ProgressBar } from '@/shared/ui/progress-bar'
import { AvatarStack } from '@/shared/ui/avatar-stack'
import { useTranslation } from '@/shared/hooks/use-locale'
import { Clock, AlertCircle, Users, Zap } from 'lucide-react'

interface ProjectCardProps {
  project: Project
  className?: string
  variant?: 'default' | 'attention'
}

export function ProjectCard({ project, className, variant = 'default' }: ProjectCardProps) {
  const t = useTranslation()
  const needsHelp = project.status === 'slow' || project.status === 'stalled'
  const isAttention = variant === 'attention'

  const getHealthIndicator = (health: HealthStatus) => {
    switch (health) {
      case 'healthy':
        return { color: 'bg-emerald-500', label: t('statusLabels.healthy') }
      case 'slowing':
        return { color: 'bg-amber-500', label: t('statusLabels.slowing') }
      case 'at_risk':
        return { color: 'bg-red-500', label: t('statusLabels.at_risk') }
    }
  }

  const healthIndicator = getHealthIndicator(project.health)

  const formatLastActivity = (date: Date): string => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffHours < 1) return t('duration.updated', { time: t('duration.justNow') })
    if (diffHours < 24) return t('duration.updated', { time: t('duration.hoursAgo', { count: diffHours }) })
    if (diffDays === 1) return t('duration.updated', { time: t('duration.yesterday') })
    return t('duration.updated', { time: t('duration.daysAgo', { count: diffDays }) })
  }

  return (
    <article
      className={cn(
        'group relative bg-card border rounded-lg p-5 transition-all duration-200',
        isAttention ? 'border-amber-500/40 bg-amber-500/5' : 'border-border',
        'hover:border-accent/30 hover:shadow-sm',
        className
      )}
    >
      <div className="flex items-start justify-between gap-3 mb-2">
        <h3 className="font-semibold text-card-foreground group-hover:text-accent transition-colors line-clamp-1">
          {project.title}
        </h3>
        <StatusBadge status={project.status} />
      </div>

      <p className="text-sm text-muted-foreground line-clamp-2 mb-4">
        {project.description}
      </p>

      <div className="flex items-center justify-between gap-4 mb-4">
        <div className="flex flex-wrap gap-1.5 flex-1">
          {project.techStack.slice(0, 3).map((tech) => (
            <span
              key={tech}
              className="px-2 py-0.5 text-xs bg-secondary text-secondary-foreground rounded"
            >
              {tech}
            </span>
          ))}
          {project.techStack.length > 3 && (
            <span className="px-2 py-0.5 text-xs text-muted-foreground">
              +{project.techStack.length - 3}
            </span>
          )}
        </div>
        <AvatarStack users={project.participants} size="sm" />
      </div>

      <div className="space-y-3 mb-4 p-3 bg-secondary/50 rounded-md">
        <div className="flex items-center gap-3">
          <ProgressBar value={project.progress} size="sm" className="flex-1" />
          <span className="text-sm font-medium text-foreground w-10 text-right">
            {project.progress}%
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-muted-foreground flex items-center gap-1.5">
            <Clock className="w-3 h-3" />
            {formatLastActivity(project.updatedAt)}
          </span>
          <span className="flex items-center gap-1.5">
            <span className={cn('w-2 h-2 rounded-full', healthIndicator.color)} />
            <span className="text-muted-foreground">{healthIndicator.label}</span>
          </span>
        </div>

        {(project.overdueTasks > 0 || project.rolesNeeded.length > 0) && (
          <div className="flex flex-wrap gap-2 pt-1">
            {project.overdueTasks > 0 && (
              <span className="flex items-center gap-1 text-xs text-amber-600">
                <AlertCircle className="w-3 h-3" />
                {t('projectDetail.overdueTasks', { count: project.overdueTasks })}
              </span>
            )}
            {project.rolesNeeded.length > 0 && (
              <span className="flex items-center gap-1 text-xs text-blue-600">
                <Users className="w-3 h-3" />
                {t('projectCard.needsRole', { role: project.rolesNeeded[0] })}
              </span>
            )}
          </div>
        )}
      </div>

      <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
        <span>{t('projectDetail.stage')} {project.currentStage} {t('projectDetail.of')} {project.totalStages}</span>
        <span>{project.completedTasks} {t('projectDetail.of')} {project.totalTasks} {t('projectDetail.tasks')}</span>
      </div>

      {project.nextAction && (
        <div className="mb-4 p-2.5 bg-accent/10 border border-accent/20 rounded-md">
          <div className="flex items-start gap-2">
            <Zap className="w-3.5 h-3.5 text-accent mt-0.5 flex-shrink-0" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-foreground truncate">
                {project.nextAction.title}
              </p>
              <p className="text-xs text-muted-foreground">
                {project.nextAction.estimateMinutes >= 60
                  ? `${Math.floor(project.nextAction.estimateMinutes / 60)}${t('duration.h')} ${project.nextAction.estimateMinutes % 60 > 0 ? `${project.nextAction.estimateMinutes % 60}${t('duration.min')}` : ''}`
                  : `${project.nextAction.estimateMinutes}${t('duration.min')}`
                }
              </p>
            </div>
          </div>
        </div>
      )}

      <Link
        href={`/project/${project.id}`}
        className={cn(
          'block w-full text-center py-2 rounded-md text-sm font-medium transition-colors',
          needsHelp
            ? 'bg-accent text-accent-foreground hover:bg-accent/90'
            : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
        )}
      >
        {needsHelp ? t('buttons.helpRevive') : t('buttons.viewProject')}
      </Link>
    </article>
  )
}
