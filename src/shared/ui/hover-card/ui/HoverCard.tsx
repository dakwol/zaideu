'use client'
import * as React from 'react'
import * as HoverCardPrimitive from '@radix-ui/react-hover-card'
import { classNames } from '@/shared/lib/utils'
import styles from '../HoverCard.module.scss'
const HoverCard = ({ ...props }: React.ComponentProps<typeof HoverCardPrimitive.Root>) => {
  return <HoverCardPrimitive.Root data-slot="hover-card" {...props} />
}
const HoverCardTrigger = ({
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Trigger>) => {
  return <HoverCardPrimitive.Trigger data-slot="hover-card-trigger" {...props} />
}
const HoverCardContent = ({
  className,
  align = 'center',
  sideOffset = 4,
  ...props
}: React.ComponentProps<typeof HoverCardPrimitive.Content>) => {
  return (
    <HoverCardPrimitive.Portal data-slot="hover-card-portal">
      <HoverCardPrimitive.Content
        data-slot="hover-card-content"
        align={align}
        sideOffset={sideOffset}
        className={classNames(styles.content, className)}
        {...props}
      />
    </HoverCardPrimitive.Portal>
  )
}
export { HoverCard, HoverCardTrigger, HoverCardContent }
