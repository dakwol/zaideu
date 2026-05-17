'use client'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import type { Task } from '@/shared/lib/types'
import { useTranslation } from '@/shared/hooks/use-locale'
import { Clock, User, Calendar, X, Check, AlertCircle } from 'lucide-react'

interface TaskDetailModalProps {
  task: Task
  isOpen: boolean
  onClose: () => void
  onTakeTask?: (taskId: string) => void
  onCompleteTask?: (taskId: string) => void
}

function formatDeadline(date: Date): string {
  return date.toLocaleDateString('en-US', { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric',
    hour: 'numeric',
    minute: '2-digit'
  })
}

function formatEstimate(minutes: number, t: (key: string, params?: Record<string, string | number>) => string): string {
  if (minutes < 60) return `${minutes}${t('duration.min')}`
  const hours = Math.floor(minutes / 60)
  const mins = minutes % 60
  return mins > 0 ? `${hours}${t('duration.h')} ${mins}${t('duration.min')}` : `${hours}${t('duration.h')}`
}

function getDeadlineStatus(date: Date, t: (key: string, params?: Record<string, string | number>) => string): { label: string; isOverdue: boolean; isUrgent: boolean } {
  const now = new Date()
  const diff = date.getTime() - now.getTime()
  const hours = diff / (1000 * 60 * 60)
  
  if (hours < 0) return { label: t('taskDetail.overdue'), isOverdue: true, isUrgent: false }
  if (hours < 24) return { label: t('taskDetail.dueSoon'), isOverdue: false, isUrgent: true }
  return { label: '', isOverdue: false, isUrgent: false }
}

export function TaskDetailModal({ 
  task, 
  isOpen, 
  onClose, 
  onTakeTask,
  onCompleteTask 
}: TaskDetailModalProps) {
  const t = useTranslation()

  if (!isOpen) return null
  
  const deadlineStatus = getDeadlineStatus(task.deadline, t)
  const isAvailable = !task.assignedUser && !task.completed
  const isAssignedToMe = task.assignedUser?.id === '1'

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div 
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative bg-card border border-border rounded-lg shadow-lg w-full max-w-lg mx-4 overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-border">
          <h2 className="font-semibold text-foreground">{t('taskDetail.title')}</h2>
          <button
            onClick={onClose}
            className="p-1 rounded hover:bg-secondary transition-colors"
          >
            <X className="w-5 h-5 text-muted-foreground" />
          </button>
        </div>
        
        <div className="p-4 space-y-4">
          <div>
            <h3 className={cn(
              'text-lg font-medium text-foreground mb-2',
              task.completed && 'line-through opacity-60'
            )}>
              {task.title}
            </h3>
            
            {task.completed && (
              <div className="flex items-center gap-2 text-sm text-success">
                <Check className="w-4 h-4" />
                {t('taskDetail.completed')}
              </div>
            )}
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="p-3 bg-secondary rounded-lg">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Clock className="w-4 h-4" />
                {t('taskDetail.estimate')}
              </div>
              <p className="font-medium text-foreground">
                {formatEstimate(task.estimateMinutes, t)}
              </p>
            </div>
            
            <div className={cn(
              'p-3 rounded-lg',
              deadlineStatus.isOverdue 
                ? 'bg-destructive/10' 
                : deadlineStatus.isUrgent 
                  ? 'bg-warning/10' 
                  : 'bg-secondary'
            )}>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <Calendar className="w-4 h-4" />
                {t('taskDetail.deadline')}
                {deadlineStatus.label && (
                  <span className={cn(
                    'text-xs px-1.5 py-0.5 rounded',
                    deadlineStatus.isOverdue 
                      ? 'bg-destructive/20 text-destructive' 
                      : 'bg-warning/20 text-warning'
                  )}>
                    {deadlineStatus.label}
                  </span>
                )}
              </div>
              <p className="font-medium text-foreground">
                {formatDeadline(task.deadline)}
              </p>
            </div>
          </div>
          
          {task.assignedUser && (
            <div className="p-3 bg-secondary rounded-lg">
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-1">
                <User className="w-4 h-4" />
                {t('taskDetail.assignedTo')}
              </div>
              <div className="flex items-center gap-2">
                {task.assignedUser.avatar && (
                  <img 
                    src={task.assignedUser.avatar} 
                    alt={task.assignedUser.name}
                    className="w-6 h-6 rounded-full"
                  />
                )}
                <p className="font-medium text-foreground">
                  {task.assignedUser.name}
                </p>
              </div>
            </div>
          )}
          
          {!task.completed && (
            <div className="pt-2">
              <div className="flex items-start gap-2 p-3 bg-accent/5 border border-accent/20 rounded-lg text-sm">
                <AlertCircle className="w-4 h-4 text-accent mt-0.5 flex-shrink-0" />
                <div>
                  <p className="font-medium text-foreground mb-1">{t('taskDetail.microCommitmentTitle')}</p>
                  <p className="text-muted-foreground">
                    {t('taskDetail.microCommitmentText')}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center gap-3 p-4 border-t border-border bg-muted/30">
          <Button variant="outline" onClick={onClose} className="flex-1">
            {t('buttons.close')}
          </Button>
          
          {isAvailable && onTakeTask && (
            <Button onClick={() => onTakeTask(task.id)} className="flex-1">
              {t('buttons.takeThisTask')}
            </Button>
          )}
          
          {isAssignedToMe && !task.completed && onCompleteTask && (
            <Button onClick={() => onCompleteTask(task.id)} className="flex-1">
              {t('buttons.markComplete')}
            </Button>
          )}
        </div>
      </div>
    </div>
  )
}
