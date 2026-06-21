import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { classNames } from '@/shared/lib/utils'
import { Separator } from '@/shared/ui/separator'
import styles from '../Item.module.scss'
const ItemGroup = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      role="list"
      data-slot="item-group"
      className={classNames(styles.group, className)}
      {...props}
    />
  )
}
const ItemSeparator = ({ className, ...props }: React.ComponentProps<typeof Separator>) => {
  return (
    <Separator
      data-slot="item-separator"
      orientation="horizontal"
      className={classNames(styles.separator, className)}
      {...props}
    />
  )
}
type ItemVariant = 'default' | 'outline' | 'muted'
type ItemSize = 'default' | 'sm'
const itemVariants = ({
  variant = 'default',
  size = 'default',
  className,
}: {
  variant?: ItemVariant
  size?: ItemSize
  className?: string
} = {}) => {
  return classNames(
    styles.item,
    styles[variant],
    size === 'sm' ? styles.sizeSm : styles.sizeDefault,
    className
  )
}
const Item = ({
  className,
  variant = 'default',
  size = 'default',
  asChild = false,
  ...props
}: React.ComponentProps<'div'> & {
  variant?: ItemVariant
  size?: ItemSize
  asChild?: boolean
}) => {
  const Comp = asChild ? Slot : 'div'
  return (
    <Comp
      data-slot="item"
      data-variant={variant}
      data-size={size}
      className={classNames(itemVariants({ variant, size, className }))}
      {...props}
    />
  )
}
type ItemMediaVariant = 'default' | 'icon' | 'image'
const itemMediaVariants = ({
  variant = 'default',
  className,
}: {
  variant?: ItemMediaVariant
  className?: string
} = {}) => {
  return classNames(styles.media, styles[`media-${variant}`], className)
}
const ItemMedia = ({
  className,
  variant = 'default',
  ...props
}: React.ComponentProps<'div'> & {
  variant?: ItemMediaVariant
}) => {
  return (
    <div
      data-slot="item-media"
      data-variant={variant}
      className={classNames(itemMediaVariants({ variant, className }))}
      {...props}
    />
  )
}
const ItemContent = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div data-slot="item-content" className={classNames(styles.content, className)} {...props} />
  )
}
const ItemTitle = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return <div data-slot="item-title" className={classNames(styles.title, className)} {...props} />
}
const ItemDescription = ({ className, ...props }: React.ComponentProps<'p'>) => {
  return (
    <p
      data-slot="item-description"
      className={classNames(styles.description, className)}
      {...props}
    />
  )
}
const ItemActions = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div data-slot="item-actions" className={classNames(styles.actions, className)} {...props} />
  )
}
const ItemHeader = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return <div data-slot="item-header" className={classNames(styles.header, className)} {...props} />
}
const ItemFooter = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return <div data-slot="item-footer" className={classNames(styles.footer, className)} {...props} />
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
