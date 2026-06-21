import type * as React from 'react'
import type * as TogglePrimitive from '@radix-ui/react-toggle'

export type ToggleVariant = 'default' | 'outline'

export type ToggleSize = 'default' | 'sm' | 'lg'

export type ToggleVariantsOptions = {
  variant?: ToggleVariant
  size?: ToggleSize
  className?: string
}

export type ToggleProps = React.ComponentProps<typeof TogglePrimitive.Root> & ToggleVariantsOptions
