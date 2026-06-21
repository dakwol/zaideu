'use client'
import * as React from 'react'
import * as SheetPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'
import { classNames } from '@/shared/lib/utils'
import styles from '../Sheet.module.scss'
const Sheet = ({ ...props }: React.ComponentProps<typeof SheetPrimitive.Root>) => {
  return <SheetPrimitive.Root data-slot="sheet" {...props} />
}
const SheetTrigger = ({ ...props }: React.ComponentProps<typeof SheetPrimitive.Trigger>) => {
  return <SheetPrimitive.Trigger data-slot="sheet-trigger" {...props} />
}
const SheetClose = ({ ...props }: React.ComponentProps<typeof SheetPrimitive.Close>) => {
  return <SheetPrimitive.Close data-slot="sheet-close" {...props} />
}
const SheetPortal = ({ ...props }: React.ComponentProps<typeof SheetPrimitive.Portal>) => {
  return <SheetPrimitive.Portal data-slot="sheet-portal" {...props} />
}
const SheetOverlay = ({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Overlay>) => {
  return (
    <SheetPrimitive.Overlay
      data-slot="sheet-overlay"
      className={classNames(styles.overlay, className)}
      {...props}
    />
  )
}
const SheetContent = ({
  className,
  children,
  side = 'right',
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Content> & {
  side?: 'top' | 'right' | 'bottom' | 'left'
}) => {
  return (
    <SheetPortal>
      <SheetOverlay />
      <SheetPrimitive.Content
        data-slot="sheet-content"
        className={classNames(styles.content, styles[side], className)}
        {...props}
      >
        {children}
        <SheetPrimitive.Close className={styles.close}>
          <XIcon className={styles.closeIcon} />
          <span className={styles.srOnly}>Close</span>
        </SheetPrimitive.Close>
      </SheetPrimitive.Content>
    </SheetPortal>
  )
}
const SheetHeader = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div data-slot="sheet-header" className={classNames(styles.header, className)} {...props} />
  )
}
const SheetFooter = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div data-slot="sheet-footer" className={classNames(styles.footer, className)} {...props} />
  )
}
const SheetTitle = ({ className, ...props }: React.ComponentProps<typeof SheetPrimitive.Title>) => {
  return (
    <SheetPrimitive.Title
      data-slot="sheet-title"
      className={classNames(styles.title, className)}
      {...props}
    />
  )
}
const SheetDescription = ({
  className,
  ...props
}: React.ComponentProps<typeof SheetPrimitive.Description>) => {
  return (
    <SheetPrimitive.Description
      data-slot="sheet-description"
      className={classNames(styles.description, className)}
      {...props}
    />
  )
}
export {
  Sheet,
  SheetTrigger,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetFooter,
  SheetTitle,
  SheetDescription,
}
