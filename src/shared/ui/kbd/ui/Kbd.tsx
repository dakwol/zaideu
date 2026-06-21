import { classNames } from '@/shared/lib/utils'
import styles from '../Kbd.module.scss'
const Kbd = ({ className, ...props }: React.ComponentProps<'kbd'>) => {
  return <kbd data-slot="kbd" className={classNames(styles.kbd, className)} {...props} />
}
const KbdGroup = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return <kbd data-slot="kbd-group" className={classNames(styles.group, className)} {...props} />
}
export { Kbd, KbdGroup }
