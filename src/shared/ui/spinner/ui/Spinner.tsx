import { Loader2Icon } from 'lucide-react'
import { classNames } from '@/shared/lib/utils'
import styles from '../Spinner.module.scss'
const Spinner = ({ className, ...props }: React.ComponentProps<'svg'>) => {
  return (
    <Loader2Icon
      role="status"
      aria-label="Loading"
      className={classNames(styles.spinner, className)}
      {...props}
    />
  )
}
export { Spinner }
