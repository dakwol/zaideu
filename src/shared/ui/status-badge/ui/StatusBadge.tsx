'use client'

import { cn } from '@/shared/lib/utils'
import type { ProjectStatus } from '@/shared/lib/types'
import styles from '../StatusBadge.module.scss'

const statusConfig: Record<ProjectStatus, { label: string }> = {
  active: {
    label: 'Active',
  },
  slow: {
    label: 'Slow',
  },
  stalled: {
    label: 'Stalled',
  },
  revival: {
    label: 'Revival',
  },
  completed: {
    label: 'Completed',
  },
  archived: {
    label: 'Archived',
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
        styles.badge,
        size === 'sm' ? styles.sm : styles.default,
        styles[status],
        className
      )}
    >
      {config.label}
    </span>
  )
}

