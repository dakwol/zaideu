'use client'

import Link from 'next/link'
import { classNames } from '@/shared/lib/utils'
import type { Project, HealthStatus } from '@/shared/lib/types'
import { StatusBadge } from '@/shared/ui/status-badge'
import { ProgressBar } from '@/shared/ui/progress-bar'
import { AvatarStack } from '@/shared/ui/avatar-stack'
import { useTranslation } from '@/shared/hooks/use-locale'
import { AlertCircle, ArrowRight, Clock, GitBranch, Timer, Users, Zap } from 'lucide-react'
import styles from '../ProjectCard.module.scss'

interface ProjectCardProps {
  project: Project
  className?: string
  variant?: 'default' | 'attention'
}

export const ProjectCard = ({ project, className, variant = 'default' }: ProjectCardProps) => {
  const translate = useTranslation()
  const needsHelp = project.status === 'slow' || project.status === 'stalled'
  const isAttention = variant === 'attention'

  const getHealthIndicator = (health: HealthStatus) => {
    switch (health) {
      case 'healthy':
        return {
          className: styles.healthHealthy,
          label: translate('statusLabels.healthy'),
          description: 'Momentum is visible',
        }
      case 'slowing':
        return {
          className: styles.healthSlowing,
          label: translate('statusLabels.slowing'),
          description: 'Needs a small push',
        }
      case 'at_risk':
        return {
          className: styles.healthAtRisk,
          label: translate('statusLabels.at_risk'),
          description: 'Next action matters',
        }
    }
  }

  const healthIndicator = getHealthIndicator(project.health)

  const formatLastActivity = (date: Date): string => {
    const now = new Date()
    const diffMs = now.getTime() - date.getTime()
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60))
    const diffDays = Math.floor(diffHours / 24)

    if (diffHours < 1) return translate('duration.updated', { time: translate('duration.justNow') })
    if (diffHours < 24)
      return translate('duration.updated', {
        time: translate('duration.hoursAgo', { count: diffHours }),
      })
    if (diffDays === 1)
      return translate('duration.updated', { time: translate('duration.yesterday') })
    return translate('duration.updated', {
      time: translate('duration.daysAgo', { count: diffDays }),
    })
  }

  return (
    <article
      className={classNames(
        styles.card,
        isAttention && styles.cardAttention,
        project.status === 'stalled' && styles.cardStalled,
        project.status === 'revival' && styles.cardRevival,
        className
      )}
    >
      <div className={styles.header}>
        <div className={styles.titleGroup}>
          <p className={styles.stageLabel}>
            <GitBranch aria-hidden="true" />
            {translate('projectDetail.stage')} {project.currentStage}{' '}
            {translate('projectDetail.of')} {project.totalStages}
          </p>
          <h3>{project.title}</h3>
        </div>
        <StatusBadge status={project.status} />
      </div>

      <p className={styles.description}>{project.description}</p>

      <div className={styles.metaRow}>
        <div className={styles.tags}>
          {project.techStack.slice(0, 3).map(tech => (
            <span key={tech}>{tech}</span>
          ))}
          {project.techStack.length > 3 && (
            <span className={styles.mutedTag}>+{project.techStack.length - 3}</span>
          )}
        </div>
        <AvatarStack users={project.participants} size="sm" className={styles.avatars} />
      </div>

      <div className={styles.progressPanel}>
        <div className={styles.progressHeader}>
          <span>{translate('projectDetail.progress')}</span>
          <strong>{project.progress}%</strong>
        </div>
        <ProgressBar value={project.progress} size="sm" />

        <div className={styles.healthRow}>
          <span>
            <Clock aria-hidden="true" />
            {formatLastActivity(project.updatedAt)}
          </span>
          <span>
            <span className={classNames(styles.healthDot, healthIndicator.className)} />
            {healthIndicator.label}
          </span>
        </div>
        <p className={styles.healthDescription}>{healthIndicator.description}</p>
      </div>

      <div className={styles.signalGrid}>
        <div>
          <span className={styles.signalLabel}>{translate('projectDetail.tasks')}</span>
          <strong>
            {project.completedTasks}/{project.totalTasks}
          </strong>
        </div>
        <div>
          <span className={styles.signalLabel}>Team</span>
          <strong>{project.participants.length}</strong>
        </div>
        <div>
          <span className={styles.signalLabel}>Open roles</span>
          <strong>{project.rolesNeeded.length}</strong>
        </div>
      </div>

      {(project.overdueTasks > 0 || project.rolesNeeded.length > 0) && (
        <div className={styles.helpSignals}>
          {project.overdueTasks > 0 && (
            <span className={styles.overdueSignal}>
              <AlertCircle aria-hidden="true" />
              {translate('projectDetail.overdueTasks', { count: project.overdueTasks })}
            </span>
          )}
          {project.rolesNeeded.length > 0 && (
            <span className={styles.roleSignal}>
              <Users aria-hidden="true" />
              {translate('projectCard.needsRole', { role: project.rolesNeeded[0] })}
            </span>
          )}
        </div>
      )}

      {project.nextAction && (
        <div className={styles.nextAction}>
          <div className={styles.nextActionIcon}>
            <Zap aria-hidden="true" />
          </div>
          <div className={styles.nextActionContent}>
            <span>Nearest micro-task</span>
            <strong>{project.nextAction.title}</strong>
            <p>
              <Timer aria-hidden="true" />
              {project.nextAction.estimateMinutes >= 60
                ? `${Math.floor(project.nextAction.estimateMinutes / 60)}${translate('duration.h')} ${
                    project.nextAction.estimateMinutes % 60 > 0
                      ? `${project.nextAction.estimateMinutes % 60}${translate('duration.min')}`
                      : ''
                  }`
                : `${project.nextAction.estimateMinutes}${translate('duration.min')}`}
            </p>
          </div>
        </div>
      )}

      <Link
        href={`/project/${project.id}`}
        className={classNames(styles.action, needsHelp && styles.actionPrimary)}
      >
        {needsHelp ? translate('buttons.helpRevive') : translate('buttons.viewProject')}
        <ArrowRight aria-hidden="true" />
      </Link>
    </article>
  )
}
