import { classNames } from '@/shared/lib/utils'
import styles from '../Skeleton.module.scss'
const Skeleton = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return <div data-slot="skeleton" className={classNames(styles.skeleton, className)} {...props} />
}
export { Skeleton }
