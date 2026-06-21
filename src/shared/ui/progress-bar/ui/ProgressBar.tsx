'use client'
import { classNames } from '@/shared/lib/utils'
import styles from '../ProgressBar.module.scss'
interface ProgressBarProps {
  value: number
  max?: number
  className?: string
  showLabel?: boolean
  size?: 'sm' | 'md' | 'lg'
}
export const ProgressBar = ({
  value,
  max = 100,
  className,
  showLabel = false,
  size = 'md',
}: ProgressBarProps) => {
  const percentage = Math.min(Math.max((value / max) * 100, 0), 100)
  return (
    <div className={classNames(styles.root, className)}>
      <div className={classNames(styles.track, styles[size])}>
        <div className={styles.indicator} style={{ width: `${percentage}%` }} />
      </div>
      {showLabel && <span className={styles.label}>{Math.round(percentage)}%</span>}
    </div>
  )
}
