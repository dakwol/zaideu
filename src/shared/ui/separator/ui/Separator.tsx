'use client'
import * as React from 'react'
import * as SeparatorPrimitive from '@radix-ui/react-separator'
import { classNames } from '@/shared/lib/utils'
import styles from '../Separator.module.scss'
const Separator = ({
  className,
  orientation = 'horizontal',
  decorative = true,
  ...props
}: React.ComponentProps<typeof SeparatorPrimitive.Root>) => {
  return (
    <SeparatorPrimitive.Root
      data-slot="separator"
      decorative={decorative}
      orientation={orientation}
      className={classNames(styles.separator, className)}
      {...props}
    />
  )
}
export { Separator }
