import * as React from 'react'
import * as NavigationMenuPrimitive from '@radix-ui/react-navigation-menu'
import { ChevronDownIcon } from 'lucide-react'
import { classNames } from '@/shared/lib/utils'
import styles from '../NavigationMenu.module.scss'
const NavigationMenu = ({
  className,
  children,
  viewport = true,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean
}) => {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={classNames(styles.root, className)}
      {...props}
    >
      {children}
      {viewport && <NavigationMenuViewport />}
    </NavigationMenuPrimitive.Root>
  )
}
const NavigationMenuList = ({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) => {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={classNames(styles.list, className)}
      {...props}
    />
  )
}
const NavigationMenuItem = ({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) => {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={classNames(styles.item, className)}
      {...props}
    />
  )
}
const navigationMenuTriggerStyle = ({
  className,
}: {
  className?: string
} = {}) => {
  return classNames(styles.trigger, className)
}
const NavigationMenuTrigger = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) => {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={navigationMenuTriggerStyle({ className })}
      {...props}
    >
      {children} <ChevronDownIcon className={styles.triggerIcon} aria-hidden="true" />
    </NavigationMenuPrimitive.Trigger>
  )
}
const NavigationMenuContent = ({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) => {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={classNames(styles.content, className)}
      {...props}
    />
  )
}
const NavigationMenuViewport = ({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Viewport>) => {
  return (
    <div className={styles.viewportWrap}>
      <NavigationMenuPrimitive.Viewport
        data-slot="navigation-menu-viewport"
        className={classNames(styles.viewport, className)}
        {...props}
      />
    </div>
  )
}
const NavigationMenuLink = ({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) => {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={classNames(styles.link, className)}
      {...props}
    />
  )
}
const NavigationMenuIndicator = ({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Indicator>) => {
  return (
    <NavigationMenuPrimitive.Indicator
      data-slot="navigation-menu-indicator"
      className={classNames(styles.indicator, className)}
      {...props}
    >
      <div className={styles.indicatorArrow} />
    </NavigationMenuPrimitive.Indicator>
  )
}
export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuContent,
  NavigationMenuTrigger,
  NavigationMenuLink,
  NavigationMenuIndicator,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
}
