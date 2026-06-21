'use client'
import * as React from 'react'
import * as TabsPrimitive from '@radix-ui/react-tabs'
import { classNames } from '@/shared/lib/utils'
import styles from '../Tabs.module.scss'
const Tabs = ({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.Root>) => {
  return (
    <TabsPrimitive.Root
      data-slot="tabs"
      className={classNames(styles.tabs, className)}
      {...props}
    />
  )
}
const TabsList = ({ className, ...props }: React.ComponentProps<typeof TabsPrimitive.List>) => {
  return (
    <TabsPrimitive.List
      data-slot="tabs-list"
      className={classNames(styles.list, className)}
      {...props}
    />
  )
}
const TabsTrigger = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Trigger>) => {
  return (
    <TabsPrimitive.Trigger
      data-slot="tabs-trigger"
      className={classNames(styles.trigger, className)}
      {...props}
    />
  )
}
const TabsContent = ({
  className,
  ...props
}: React.ComponentProps<typeof TabsPrimitive.Content>) => {
  return (
    <TabsPrimitive.Content
      data-slot="tabs-content"
      className={classNames(styles.content, className)}
      {...props}
    />
  )
}
export { Tabs, TabsList, TabsTrigger, TabsContent }
