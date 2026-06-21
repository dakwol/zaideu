'use client'
import * as React from 'react'
import * as PopoverPrimitive from '@radix-ui/react-popover'
import { classNames } from '@/shared/lib/utils'
import styles from '../Popover.module.scss'
const Popover = ({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Root>) => {
  return <PopoverPrimitive.Root data-slot="popover" {...props} />
}
const PopoverTrigger = ({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Trigger>) => {
  return <PopoverPrimitive.Trigger data-slot="popover-trigger" {...props} />
}
const PopoverContent = ({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof PopoverPrimitive.Content>) => {
  return (
    <PopoverPrimitive.Portal>
      <PopoverPrimitive.Content
        data-slot="popover-content"
        align={align}
        sideOffset={sideOffset}
        className={classNames(styles.content, className)}
        {...props}
      />
    </PopoverPrimitive.Portal>
  )
}
const PopoverAnchor = ({ ...props }: React.ComponentProps<typeof PopoverPrimitive.Anchor>) => {
  return <PopoverPrimitive.Anchor data-slot="popover-anchor" {...props} />
}
export { Popover, PopoverTrigger, PopoverContent, PopoverAnchor }
