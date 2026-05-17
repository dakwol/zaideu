import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/shared/lib/utils'
import { Separator } from '@/shared/ui/separator'
import styles from '../ButtonGroup.module.scss'

type ButtonGroupOrientation = 'horizontal' | 'vertical'

function buttonGroupVariants({
  orientation = 'horizontal',
  className,
}: {
  orientation?: ButtonGroupOrientation
  className?: string
} = {}) {
  return cn(styles.group, styles[orientation], className)
}

function ButtonGroup({
  className,
  orientation,
  ...props
}: React.ComponentProps<'div'> & { orientation?: ButtonGroupOrientation }) {
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

function ButtonGroupText({
  className,
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & {
  asChild?: boolean
}) {
  const Comp = asChild ? Slot : 'div'

  return (
    <Comp
      className={cn(styles.text, className)}
      {...props}
    />
  )
}

function ButtonGroupSeparator({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="button-group-separator"
      orientation={orientation}
      className={cn(styles.separator, className)}
      {...props}
    />
  )
}

export {
  ButtonGroup,
  ButtonGroupSeparator,
  ButtonGroupText,
  buttonGroupVariants,
}

