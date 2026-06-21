'use client'
import { useState } from 'react'
import { classNames } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import type { Task } from '@/shared/lib/types'
import { useTranslation } from '@/shared/hooks/use-locale'
import { Clock, User, Calendar, Check } from 'lucide-react'
interface TaskCardProps {
  task: Task
  className?: string
  onTakeTask?: (taskId: string) => void
}
export const TaskCard = ({ task, className, onTakeTask }: TaskCardProps) => {
  const translate = useTranslation()
  const [isHovered, setIsHovered] = useState(false)
  const isAvailable = !task.assignedUser && !task.completed
  const deadlineText = formatDeadline(task.deadline, translate)
  const isOverdue = deadlineText === translate('duration.overdue')
  return (
    <div
      className={classNames(
        'group relative bg-card border border-border rounded-lg p-4 transition-all duration-200',
        task.completed && 'opacity-60',
        isAvailable && 'hover:border-accent/40 hover:shadow-sm cursor-pointer',
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="flex items-start gap-3">
        <div
          className={classNames(
            'flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center mt-0.5',
            task.completed ? 'bg-success border-success text-success-foreground' : 'border-border'
          )}
        >
          {task.completed && <Check className="w-3 h-3" />}
        </div>

        <div className="flex-1 min-w-0">
          <h4
            className={classNames(
              'font-medium text-sm text-card-foreground mb-2',
              task.completed && 'line-through'
            )}
          >
            {task.title}
          </h4>

          <div className="flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              <span>{formatEstimate(task.estimateMinutes, translate)}</span>
            </div>

            <div className={classNames('flex items-center gap-1', isOverdue && 'text-destructive')}>
              <Calendar className="w-3.5 h-3.5" />
              <span>{deadlineText}</span>
            </div>

            {task.assignedUser && (
              <div className="flex items-center gap-1">
                <User className="w-3.5 h-3.5" />
                <span>{task.assignedUser.name}</span>
              </div>
            )}
          </div>
        </div>
      </div>

      {isAvailable && isHovered && onTakeTask && (
        <div className="mt-3 pt-3 border-t border-border">
          <Button
            size="sm"
            className="w-full"
            onClick={event => {
              event.stopPropagation()
              onTakeTask(task.id)
            }}
          >
            {translate('buttons.takeThisTask')}
          </Button>
        </div>
      )}
    </div>
  )
}
const formatDeadline = (
  date: Date,
  translate: (key: string, params?: Record<string, string | number>) => string
): string => {
  const now = new Date()
  const diff = date.getTime() - now.getTime()
  const days = Math.ceil(diff / (1000 * 60 * 60 * 24))
  if (days < 0) return translate('duration.overdue')
  if (days === 0) return translate('duration.today')
  if (days === 1) return translate('duration.tomorrow')
  return translate('duration.daysAgo', { count: days })
}
const formatEstimate = (
  minutes: number,
  translate: (key: string, params?: Record<string, string | number>) => string
): string => {
  if (minutes < 60) return `${minutes}${translate('duration.min')}`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0
    ? `${hours}${translate('duration.h')} ${mins}${translate('duration.min')}`
    : `${hours}${translate('duration.h')}`
}
