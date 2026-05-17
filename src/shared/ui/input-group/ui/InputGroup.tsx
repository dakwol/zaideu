'use client'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import { Input } from '@/shared/ui/input'
import { Textarea } from '@/shared/ui/textarea'
import styles from '../InputGroup.module.scss'

function InputGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="input-group"
      role="group"
      className={cn(styles.group, className)}
      {...props}
    />
  )
}

type InputGroupAddonAlign =
  | 'inline-start'
  | 'inline-end'
  | 'block-start'
  | 'block-end'

function inputGroupAddonVariants({
  align = 'inline-start',
  className,
}: {
  align?: InputGroupAddonAlign
  className?: string
} = {}) {
  return cn(styles.addon, styles[`addon-${align}`], className)
}

function InputGroupAddon({
  className,
  align = 'inline-start',
  ...props
}: React.ComponentProps<'div'> & { align?: InputGroupAddonAlign }) {
  return (
    <div
      role="group"
      data-slot="input-group-addon"
      data-align={align}
      className={inputGroupAddonVariants({ align, className })}
      onClick={(e) => {
        if ((e.target as HTMLElement).closest('button')) {
          return
        }
        e.currentTarget.parentElement?.querySelector('input')?.focus()
      }}
      {...props}
    />
  )
}

type InputGroupButtonSize = 'xs' | 'sm' | 'icon-xs' | 'icon-sm'

function inputGroupButtonVariants({
  size = 'xs',
  className,
}: {
  size?: InputGroupButtonSize
  className?: string
} = {}) {
  return cn(styles.button, styles[`button-${size}`], className)
}

function InputGroupButton({
  className,
  type = 'button',
  variant = 'ghost',
  size = 'xs',
  ...props
}: Omit<React.ComponentProps<typeof Button>, 'size'> &
  { size?: InputGroupButtonSize }) {
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

function InputGroupText({ className, ...props }: React.ComponentProps<'span'>) {
  return (
    <span
      className={cn(styles.text, className)}
      {...props}
    />
  )
}

function InputGroupInput({
  className,
  ...props
}: React.ComponentProps<'input'>) {
  return (
    <Input
      data-slot="input-group-control"
      className={cn(styles.input, className)}
      {...props}
    />
  )
}

function InputGroupTextarea({
  className,
  ...props
}: React.ComponentProps<'textarea'>) {
  return (
    <Textarea
      data-slot="input-group-control"
      className={cn(styles.textarea, className)}
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

