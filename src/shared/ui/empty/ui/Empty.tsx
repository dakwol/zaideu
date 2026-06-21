import { classNames } from '@/shared/lib/utils'
import styles from '../Empty.module.scss'
const Empty = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return <div data-slot="empty" className={classNames(styles.empty, className)} {...props} />
}
const EmptyHeader = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div data-slot="empty-header" className={classNames(styles.header, className)} {...props} />
  )
}
const EmptyMedia = ({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & {
  variant?: 'default' | 'icon'
}) => {
  return (
    <div
      data-slot="empty-icon"
      data-variant={variant}
      className={classNames(styles.media, styles[variant], className)}
      {...props}
    />
  )
}
const EmptyTitle = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return <div data-slot="empty-title" className={classNames(styles.title, className)} {...props} />
}
const EmptyDescription = ({ className, ...props }: React.ComponentProps<'p'>) => {
  return (
    <p
      data-slot="empty-description"
      className={classNames(styles.description, className)}
      {...props}
    />
  )
}
const EmptyContent = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div data-slot="empty-content" className={classNames(styles.content, className)} {...props} />
  )
}
export { Empty, EmptyHeader, EmptyTitle, EmptyDescription, EmptyContent, EmptyMedia }
