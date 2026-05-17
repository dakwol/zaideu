'use client'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import type { ProjectStatus } from '@/shared/lib/types'
import { AlertCircle, Zap, Pause, RefreshCw, ListTodo, Users } from 'lucide-react'

interface ProjectStatusBannerProps {
  status: ProjectStatus
  className?: string
  onAction?: (action: string) => void
}

export function ProjectStatusBanner({ status, className, onAction }: ProjectStatusBannerProps) {
  if (status === 'active' || status === 'completed' || status === 'archived') {
    return null
  }
  
  const bannerConfig = {
    slow: {
      icon: AlertCircle,
      title: 'Project slowed down',
      message: 'This is normal. Teams often lose momentum mid-project. Take a small step to get back on track.',
      bgClass: 'bg-warning/5 border-warning/20',
      iconClass: 'text-warning',
      actions: [
        { label: 'Take a small task', action: 'take_task', icon: ListTodo },
      ],
    },
    stalled: {
      icon: Pause,
      title: 'Project is stalled',
      message: 'No activity for a while. This happens. Here are some ways to restart:',
      bgClass: 'bg-destructive/5 border-destructive/20',
      iconClass: 'text-destructive',
      actions: [
        { label: 'Take small task', action: 'take_task', icon: ListTodo },
        { label: 'Simplify stage', action: 'simplify', icon: RefreshCw },
        { label: 'Change role', action: 'change_role', icon: Users },
        { label: 'Pause project', action: 'pause', icon: Pause },
      ],
    },
    revival: {
      icon: Zap,
      title: 'Project is active again',
      message: 'Great work! The team is back on track. Keep the momentum going.',
      bgClass: 'bg-accent/5 border-accent/20',
      iconClass: 'text-accent',
      actions: [],
    },
  }
  
  const config = bannerConfig[status]
  const Icon = config.icon
  
  return (
    <div className={cn(
      'rounded-lg border p-4',
      config.bgClass,
      className
    )}>
      <div className="flex items-start gap-3">
        <div className={cn(
          'flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center bg-background',
          config.iconClass
        )}>
          <Icon className="w-4 h-4" />
        </div>
        
        <div className="flex-1">
          <h4 className="font-semibold text-sm text-foreground mb-1">
            {config.title}
          </h4>
          <p className="text-sm text-muted-foreground mb-3">
            {config.message}
          </p>
          
          {config.actions.length > 0 && (
            <div className="flex flex-wrap gap-2">
              {config.actions.map((action) => (
                <Button
                  key={action.action}
                  variant="secondary"
                  size="sm"
                  onClick={() => onAction?.(action.action)}
                  className="gap-1.5"
                >
                  <action.icon className="w-3.5 h-3.5" />
                  {action.label}
                </Button>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

