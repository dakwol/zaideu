import type * as React from 'react'

export type ButtonVariant = 'default' | 'destructive' | 'outline' | 'secondary' | 'ghost' | 'link'

export type ButtonSize = 'default' | 'sm' | 'lg' | 'icon' | 'icon-sm' | 'icon-lg'

export type ButtonVariantsOptions = {
  variant?: ButtonVariant
  size?: ButtonSize
  className?: string
}

export type ButtonProps = React.ComponentProps<'button'> &
  ButtonVariantsOptions & {
    asChild?: boolean
  }
