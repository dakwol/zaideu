import { classNames } from '@/shared/lib/utils'
import type { AlertDescriptionProps, AlertProps, AlertTitleProps } from '../model/types'
import styles from '../Alert.module.scss'
const Alert = ({ className, variant = 'default', ...props }: AlertProps) => {
  return (
    <div
      data-slot="alert"
      role="alert"
      className={classNames(styles.alert, styles[variant], className)}
      {...props}
    />
  )
}
const AlertTitle = ({ className, ...props }: AlertTitleProps) => {
  return <div data-slot="alert-title" className={classNames(styles.title, className)} {...props} />
}
const AlertDescription = ({ className, ...props }: AlertDescriptionProps) => {
  return (
    <div
      data-slot="alert-description"
      className={classNames(styles.description, className)}
      {...props}
    />
  )
}
export { Alert, AlertTitle, AlertDescription }
