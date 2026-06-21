'use client'
import * as React from 'react'
import * as ProgressPrimitive from '@radix-ui/react-progress'
import { classNames } from '@/shared/lib/utils'
import styles from '../Progress.module.scss'
const Progress = ({
  className,
  value,
  ...props
}: React.ComponentProps<typeof ProgressPrimitive.Root>) => {
  return (
    <ProgressPrimitive.Root
      data-slot="progress"
      className={classNames(styles.progress, className)}
      {...props}
    >
      <ProgressPrimitive.Indicator
        data-slot="progress-indicator"
        className={styles.indicator}
        style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
      />
    </ProgressPrimitive.Root>
  )
}
export { Progress }
