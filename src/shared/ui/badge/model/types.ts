import type * as React from 'react'

export type BadgeVariant = 'default' | 'secondary' | 'destructive' | 'outline'

export type BadgeVariantsOptions = {
  variant?: BadgeVariant
  className?: string
}

export type BadgeProps = React.ComponentProps<'span'> &
  BadgeVariantsOptions & {
    asChild?: boolean
  }
