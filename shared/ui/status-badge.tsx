'use client'

import { cn } from '@/shared/lib/utils'
import type { ProjectStatus } from '@/shared/lib/types'

const statusConfig: Record<ProjectStatus, { label: string; className: string }> = {
  active: {
    label: 'Active',
    className: 'bg-success/10 text-success border-success/20',
  },
  slow: {
    label: 'Slow',
    className: 'bg-warning/10 text-warning border-warning/20',
  },
  stalled: {
    label: 'Stalled',
    className: 'bg-destructive/10 text-destructive border-destructive/20',
  },
  revival: {
    label: 'Revival',
    className: 'bg-accent/10 text-accent border-accent/20',
  },
  completed: {
    label: 'Completed',
    className: 'bg-muted text-muted-foreground border-border',
  },
  archived: {
    label: 'Archived',
    className: 'bg-muted text-muted-foreground border-border',
  },
}

interface StatusBadgeProps {
  status: ProjectStatus
  size?: 'sm' | 'default'
  className?: string
}

export function StatusBadge({ status, size = 'default', className }: StatusBadgeProps) {
  const config = statusConfig[status]
  
  return (
    <span
      className={cn(
        'inline-flex items-center font-medium rounded-md border',
        size === 'sm' ? 'px-1.5 py-0.5 text-[10px]' : 'px-2 py-0.5 text-xs',
        config.className,
        className
      )}
    >
      {config.label}
    </span>
  )
}

