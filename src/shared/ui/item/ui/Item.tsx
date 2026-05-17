import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'

import { cn } from '@/shared/lib/utils'
import { Separator } from '@/shared/ui/separator'
import styles from '../Item.module.scss'

function ItemGroup({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={cn(styles.group, className)}
      {...props}
    />
  )
}

function ItemSeparator({
  className,
  ...props
}: React.ComponentProps<typeof Separator>) {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={cn(styles.separator, className)}
      {...props}
    />
  )
}

type ItemVariant = 'default' | 'outline' | 'muted'
type ItemSize = 'default' | 'sm'

function itemVariants({
  variant = 'default',
  size = 'default',
  className,
}: {
  variant?: ItemVariant
  size?: ItemSize
  className?: string
} = {}) {
  return cn(
    styles.item,
    styles[variant],
    size === 'sm' ? styles.sizeSm : styles.sizeDefault,
    className,
  )
}

function Item({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'div'> &
  { variant?: ItemVariant; size?: ItemSize; asChild?: boolean }) {
  const Comp = asChild ? Slot : 'div'
  return (
    <Comp
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={cn(itemVariants({ variant, size, className }))}
      {...props}
    />
  )
}

type ItemMediaVariant = 'default' | 'icon' | 'image'

function itemMediaVariants({
  variant = 'default',
  className,
}: {
  variant?: ItemMediaVariant
  className?: string
} = {}) {
  return cn(styles.media, styles[`media-${variant}`], className)
}

function ItemMedia({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & { variant?: ItemMediaVariant }) {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={cn(itemMediaVariants({ variant, className }))}
      {...props}
    />
  )
}

function ItemContent({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="item-content"
      className={cn(styles.content, className)}
      {...props}
    />
  )
}

function ItemTitle({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="item-title"
      className={cn(styles.title, className)}
      {...props}
    />
  )
}

function ItemDescription({ className, ...props }: React.ComponentProps<'p'>) {
  return (
    <p
      data-slot="item-description"
      className={cn(styles.description, className)}
      {...props}
    />
  )
}

function ItemActions({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="item-actions"
      className={cn(styles.actions, className)}
      {...props}
    />
  )
}

function ItemHeader({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="item-header"
      className={cn(styles.header, className)}
      {...props}
    />
  )
}

function ItemFooter({ className, ...props }: React.ComponentProps<'div'>) {
  return (
    <div
      data-slot="item-footer"
      className={cn(styles.footer, className)}
      {...props}
    />
  )
}

export {
  Item,
  ItemMedia,
  ItemContent,
  ItemActions,
  ItemGroup,
  ItemSeparator,
  ItemTitle,
  ItemDescription,
  ItemHeader,
  ItemFooter,
}

