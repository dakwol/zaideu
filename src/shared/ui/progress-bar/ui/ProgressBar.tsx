'use client'

import { cn } from '@/shared/lib/utils'
import styles from '../ProgressBar.module.scss'

interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
}

export function ProgressBar({ 
  value, 
  max = 100, 
  className,
  showLabel = false,
  size = 'md'
}: ProgressBarProps) {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  
  return (
    <div className={cn(styles.root, className)}>
      <div className={cn(
        styles.track,
        styles[size]
      )}>
        <div
          className={styles.indicator}
          style={{ width: `${percentage}%` }}
        />
      </div>
      {showLabel && (
        <span className={styles.label}>
          {Math.round(percentage)}%
        </span>
      )}
    </div>
  )
}

