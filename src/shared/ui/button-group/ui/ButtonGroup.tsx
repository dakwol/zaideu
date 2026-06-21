import { Slot } from '@radix-ui/react-slot'
import { classNames } from '@/shared/lib/utils'
import { Separator } from '@/shared/ui/separator'
import styles from '../ButtonGroup.module.scss'
type ButtonGroupOrientation = 'horizontal' | 'vertical'
const buttonGroupVariants = ({
  orientation = 'horizontal',
  className,
}: {
  orientation?: ButtonGroupOrientation
  className?: string
} = {}) => {
  return classNames(styles.group, styles[orientation], className)
}
const ButtonGroup = ({
  className,
  orientation,
  ...props
}: React.ComponentProps<'div'> & {
  orientation?: ButtonGroupOrientation
}) => {
  return (
    <div
      role="group"
      data-slot="button-group"
      data-orientation={orientation}
      className={buttonGroupVariants({ orientation, className })}
      {...props}
    />
  )
}
const ButtonGroupText = ({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & {
  asChild?: boolean
}) => {
  const Comp = asChild ? Slot : 'div'
  return <Comp className={classNames(styles.text, className)} {...props} />
}
const ButtonGroupSeparator = ({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof Separator>) => {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={classNames(styles.separator, className)}
      {...props}
    />
  )
}
export { ButtonGroup, ButtonGroupSeparator, ButtonGroupText, buttonGroupVariants }
