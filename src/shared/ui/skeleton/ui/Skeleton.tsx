import { cn } from '@/shared/lib/utils'
import styles from '../Skeleton.module.scss'

function Skeleton({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="skeleton"
      className={cn(styles.skeleton, className)}
      {...props}
    />
  )
}

export { Skeleton }

