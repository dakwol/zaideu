'use client'
import * as React from 'react'
import * as ScrollAreaPrimitive from '@radix-ui/react-scroll-area'
import { classNames } from '@/shared/lib/utils'
import styles from '../ScrollArea.module.scss'
const ScrollArea = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.Root>) => {
  return (
    <ScrollAreaPrimitive.Root
      data-slot="scroll-area"
      className={classNames(styles.root, className)}
      {...props}
    >
      <ScrollAreaPrimitive.Viewport data-slot="scroll-area-viewport" className={styles.viewport}>
        {children}
      </ScrollAreaPrimitive.Viewport>
      <ScrollBar />
      <ScrollAreaPrimitive.Corner />
    </ScrollAreaPrimitive.Root>
  )
}
const ScrollBar = ({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<typeof ScrollAreaPrimitive.ScrollAreaScrollbar>) => {
  return (
    <ScrollAreaPrimitive.ScrollAreaScrollbar
      data-slot="scroll-area-scrollbar"
      orientation={orientation}
      className={classNames(styles.scrollbar, styles[orientation], className)}
      {...props}
    >
      <ScrollAreaPrimitive.ScrollAreaThumb data-slot="scroll-area-thumb" className={styles.thumb} />
    </ScrollAreaPrimitive.ScrollAreaScrollbar>
  )
}
export { ScrollArea, ScrollBar }
