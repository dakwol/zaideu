'use client'

import { classNames } from '@/shared/lib/utils'
import type { ActivityItem as ActivityItemType } from '@/shared/lib/types'
import { useTranslation } from '@/shared/hooks/use-locale'
import { CheckCircle2, UserPlus, Milestone, FileText, Settings } from 'lucide-react'

interface ActivityItemProps {
  activity: ActivityItemType
  className?: string
}

const activityIcons = {
  task_completed: CheckCircle2,
  stage_completed: Milestone,
  user_joined: UserPlus,
  user_update: FileText,
  project_update: Settings,
}

const activityColors = {
  task_completed: 'text-success bg-success/10',
  stage_completed: 'text-accent bg-accent/10',
  user_joined: 'text-accent bg-accent/10',
  user_update: 'text-muted-foreground bg-muted',
  project_update: 'text-muted-foreground bg-muted',
}

export const ActivityItem = ({ activity, className }: ActivityItemProps) => {
  const translate = useTranslation()
  const Icon = activityIcons[activity.type]
  const colorClass = activityColors[activity.type]

  const formatTimestamp = (date: Date): string => {
    const now = new Date()
    const diff = now.getTime() - date.getTime()
    const minutes = Math.floor(diff / 60000)
    const hours = Math.floor(diff / 3600000)
    const days = Math.floor(diff / 86400000)

    if (minutes < 1) return translate('duration.justNow')
    if (minutes < 60) return translate('duration.minutesAgo', { count: minutes })
    if (hours < 24) return translate('duration.hoursAgo', { count: hours })
    if (days === 1) return translate('duration.yesterday')
    if (days < 7) return translate('duration.daysAgo', { count: days })
    return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
  }

  return (
    <div className={classNames('flex items-start gap-3 py-3', className)}>
      <div
        className={classNames(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center',
          colorClass
        )}
      >
        <Icon className="w-4 h-4" />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-0.5">
          <span className="font-medium text-sm text-foreground">{activity.user.name}</span>
          <span className="text-xs text-muted-foreground">
            {formatTimestamp(activity.timestamp)}
          </span>
        </div>
        <p className="text-sm text-muted-foreground">{activity.description}</p>
      </div>
    </div>
  )
}
