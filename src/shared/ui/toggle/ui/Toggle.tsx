'use client'
import * as React from 'react'
import * as TogglePrimitive from '@radix-ui/react-toggle'
import { classNames } from '@/shared/lib/utils'
import type { ToggleProps, ToggleVariantsOptions } from '../model/types'
import styles from '../Toggle.module.scss'
const toggleVariants = ({
  variant = 'default',
  size = 'default',
  className,
}: ToggleVariantsOptions = {}) => {
  const sizeClass = {
    default: styles.sizeDefault,
    sm: styles.sizeSm,
    lg: styles.sizeLg,
  }[size]
  return classNames(styles.toggle, styles[variant], sizeClass, className)
}
const Toggle = ({ className, variant, size, ...props }: ToggleProps) => {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={toggleVariants({ variant, size, className })}
      {...props}
    />
  )
}
export { Toggle, toggleVariants }
