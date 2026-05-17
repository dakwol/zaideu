'use client'

import { cn } from '@/shared/lib/utils'
import type { Stage } from '@/shared/lib/types'
import { TaskCard } from './task-card'
import { ProgressBar } from '@/shared/ui/progress-bar'
import { Calendar, CheckCircle2 } from 'lucide-react'

interface StageCardProps {
  stage: Stage
  isActive?: boolean
  className?: string
  onTakeTask?: (taskId: string) => void
}

function formatDate(date: Date): string {
  return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
}

export function StageCard({ stage, isActive = false, className, onTakeTask }: StageCardProps) {
  const completedTasks = stage.tasks.filter(t => t.completed).length
  const progress = stage.tasks.length > 0 ? (completedTasks / stage.tasks.length) * 100 : 0

  return (
    <div
      className={cn(
        'bg-card border rounded-lg overflow-hidden transition-all duration-200',
        isActive ? 'border-accent shadow-sm' : 'border-border',
        stage.completed && 'opacity-75',
        className
      )}
    >
      <div className={cn(
        'px-4 py-3 border-b',
        isActive ? 'bg-accent/5 border-accent/20' : 'bg-muted/30 border-border'
      )}>
        <div className="flex items-center justify-between gap-3 mb-2">
          <div className="flex items-center gap-2">
            {stage.completed ? (
              <CheckCircle2 className="w-4 h-4 text-success" />
            ) : (
              <div className={cn(
                'w-2 h-2 rounded-full',
                isActive ? 'bg-accent' : 'bg-muted-foreground/30'
              )} />
            )}
            <h3 className="font-semibold text-sm text-card-foreground">
              {stage.title}
            </h3>
          </div>
          <div className="flex items-center gap-1 text-xs text-muted-foreground">
            <Calendar className="w-3.5 h-3.5" />
            <span>{formatDate(stage.deadline)}</span>
          </div>
        </div>

        <p className="text-xs text-muted-foreground mb-3">
          {stage.goal}
        </p>

        <div className="flex items-center gap-2">
          <ProgressBar value={progress} size="sm" className="flex-1" />
          <span className="text-xs font-medium text-muted-foreground">
            {completedTasks}/{stage.tasks.length}
          </span>
        </div>
      </div>

      <div className="p-3 space-y-2">
        {stage.tasks.map((task) => (
          <TaskCard
            key={task.id}
            task={task}
            onTakeTask={onTakeTask}
          />
        ))}
      </div>
    </div>
  )
}

