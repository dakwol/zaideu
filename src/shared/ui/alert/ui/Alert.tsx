import { cn } from '@/shared/lib/utils'
import type {
  AlertDescriptionProps,
  AlertProps,
  AlertTitleProps,
} from '../model/types'
import styles from '../Alert.module.scss'

function Alert({
  className,
  variant = 'default',
  ...props
}: AlertProps) {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={cn(styles.alert, styles[variant], className)}
      {...props}
    />
  )
}

function AlertTitle({ className, ...props }: AlertTitleProps) {
  return (
    <div
      data-slot="alert-title"
      className={cn(styles.title, className)}
      {...props}
    />
  )
}

function AlertDescription({
  className,
  ...props
}: AlertDescriptionProps) {
  return (
    <div
      data-slot="alert-description"
      className={cn(styles.description, className)}
      {...props}
    />
  )
}

export { Alert, AlertTitle, AlertDescription }

