import { cn } from '@/shared/lib/utils'
import styles from '../Kbd.module.scss'

function Kbd({ className, ...props }: React.ComponentProps<'kbd'>) {
  return (
    <kbd
      data-slot="kbd"
      className={cn(styles.kbd, className)}
      {...props}
    />
  )
}

function KbdGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <kbd
      data-slot="kbd-group"
      className={cn(styles.group, className)}
      {...props}
    />
  )
}

export { Kbd, KbdGroup }

