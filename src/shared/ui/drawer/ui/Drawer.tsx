'use client'
import * as React from 'react'
import { Drawer as DrawerPrimitive } from 'vaul'
import { classNames } from '@/shared/lib/utils'
import styles from '../Drawer.module.scss'
const Drawer = ({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Root>) => {
  return <DrawerPrimitive.Root data-slot="drawer" {...props} />
}
const DrawerTrigger = ({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Trigger>) => {
  return <DrawerPrimitive.Trigger data-slot="drawer-trigger" {...props} />
}
const DrawerPortal = ({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Portal>) => {
  return <DrawerPrimitive.Portal data-slot="drawer-portal" {...props} />
}
const DrawerClose = ({ ...props }: React.ComponentProps<typeof DrawerPrimitive.Close>) => {
  return <DrawerPrimitive.Close data-slot="drawer-close" {...props} />
}
const DrawerOverlay = ({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Overlay>) => {
  return (
    <DrawerPrimitive.Overlay
      data-slot="drawer-overlay"
      className={classNames(styles.overlay, className)}
      {...props}
    />
  )
}
const DrawerContent = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Content>) => {
  return (
    <DrawerPortal data-slot="drawer-portal">
      <DrawerOverlay />
      <DrawerPrimitive.Content
        data-slot="drawer-content"
        className={classNames(styles.content, className)}
        {...props}
      >
        <div className={styles.handle} />
        {children}
      </DrawerPrimitive.Content>
    </DrawerPortal>
  )
}
const DrawerHeader = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div data-slot="drawer-header" className={classNames(styles.header, className)} {...props} />
  )
}
const DrawerFooter = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div data-slot="drawer-footer" className={classNames(styles.footer, className)} {...props} />
  )
}
const DrawerTitle = ({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Title>) => {
  return (
    <DrawerPrimitive.Title
      data-slot="drawer-title"
      className={classNames(styles.title, className)}
      {...props}
    />
  )
}
const DrawerDescription = ({
  className,
  ...props
}: React.ComponentProps<typeof DrawerPrimitive.Description>) => {
  return (
    <DrawerPrimitive.Description
      data-slot="drawer-description"
      className={classNames(styles.description, className)}
      {...props}
    />
  )
}
export {
  Drawer,
  DrawerPortal,
  DrawerOverlay,
  DrawerTrigger,
  DrawerClose,
  DrawerContent,
  DrawerHeader,
  DrawerFooter,
  DrawerTitle,
  DrawerDescription,
}
