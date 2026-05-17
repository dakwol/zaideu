'use client'

import * as React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'

import { cn } from '@/shared/lib/utils'
import type { ToggleProps, ToggleVariantsOptions } from '../model/types'
import styles from '../Toggle.module.scss'

function toggleVariants({
  variant = 'default',
  size = 'default',
  className,
}: ToggleVariantsOptions = {}) {
  const sizeClass = {
    default: styles.sizeDefault,
    sm: styles.sizeSm,
    lg: styles.sizeLg,
  }[size]

  return cn(styles.toggle, styles[variant], sizeClass, className)
}

function Toggle({
  className,
  variant,
  size,
  ...props
}: ToggleProps) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={toggleVariants({ variant, size, className })}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }

