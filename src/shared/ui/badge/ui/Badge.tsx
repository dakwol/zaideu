import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { classNames } from '@/shared/lib/utils'
import type { BadgeProps, BadgeVariantsOptions } from '../model/types'
import styles from '../Badge.module.scss'
const badgeVariants = ({ variant = 'default', className }: BadgeVariantsOptions = {}) => {
  return classNames(styles.badge, styles[variant], className)
}
const Badge = ({ className, variant, asChild = false, ...props }: BadgeProps) => {
  const Comp = asChild ? Slot : 'span'
  return <Comp data-slot="badge" className={badgeVariants({ variant, className })} {...props} />
}
export { Badge, badgeVariants }
