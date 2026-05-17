import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/shared/lib/utils'
import type { ButtonProps, ButtonVariantsOptions } from '../model/types'
import styles from '../Button.module.scss'

function buttonVariants({
  variant = 'default',
  size = 'default',
  className,
}: ButtonVariantsOptions = {}) {
  const sizeClass = {
    default: styles.sizeDefault,
    sm: styles.sizeSm,
    lg: styles.sizeLg,
    icon: styles.sizeIcon,
    'icon-sm': styles.sizeIconSm,
    'icon-lg': styles.sizeIconLg,
  }[size]

  return cn(styles.button, styles[variant], sizeClass, className)
}

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: ButtonProps) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={buttonVariants({ variant, size, className })}
      {...props}
    />
  )
}

export { Button, buttonVariants }

