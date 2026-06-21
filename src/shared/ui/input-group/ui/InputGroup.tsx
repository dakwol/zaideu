'use client'
import { classNames } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import styles from '../InputGroup.module.scss'
const InputGroup = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={classNames(styles.group, className)}
      {...props}
    />
  )
}
type InputGroupAddonAlign = 'inline-start' | 'inline-end' | 'block-start' | 'block-end'
const inputGroupAddonVariants = ({
  align = 'inline-start',
  className,
}: {
  align?: InputGroupAddonAlign
  className?: string
} = {}) => {
  return classNames(styles.addon, styles[`addon-${align}`], className)
}
const InputGroupAddon = ({
  className,
  align = 'inline-start',
  ...props
}: React.ComponentProps<'div'> & {
  align?: InputGroupAddonAlign
}) => {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={inputGroupAddonVariants({ align, className })}
      onClick={event => {
        if ((event.target as HTMLElement).closest('button')) {
          return
        }
        event.currentTarget.parentElement?.querySelector('input')?.focus()
      }}
      {...props}
    />
  )
}
type InputGroupButtonSize = 'xs' | 'sm' | 'icon-xs' | 'icon-sm'
const inputGroupButtonVariants = ({
  size = 'xs',
  className,
}: {
  size?: InputGroupButtonSize
  className?: string
} = {}) => {
  return classNames(styles.button, styles[`button-${size}`], className)
}
const InputGroupButton = ({
  className,
  type = 'button',
  variant = 'ghost',
  size = 'xs',
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'size'> & {
  size?: InputGroupButtonSize
}) => {
  return (
    <Button
      type={type}
      data-size={size}
      variant={variant}
      className={inputGroupButtonVariants({ size, className })}
      {...props}
    />
  )
}
const InputGroupText = ({ className, ...props }: React.ComponentProps<'span'>) => {
  return <span className={classNames(styles.text, className)} {...props} />
}
const InputGroupInput = ({ className, ...props }: React.ComponentProps<'input'>) => {
  return (
    <Input
      data-slot="input-group-control"
      className={classNames(styles.input, className)}
      {...props}
    />
  )
}
const InputGroupTextarea = ({ className, ...props }: React.ComponentProps<'textarea'>) => {
  return (
    <Textarea
      data-slot="input-group-control"
      className={classNames(styles.textarea, className)}
      {...props}
    />
  )
}
export {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupText,
  InputGroupInput,
  InputGroupTextarea,
}
