import type * as React from 'react'

export type AlertVariant = 'default' | 'destructive'

export type AlertProps = React.ComponentProps<'div'> & {
  variant?: AlertVariant
}

export type AlertTitleProps = React.ComponentProps<'div'>

export type AlertDescriptionProps = React.ComponentProps<'div'>
