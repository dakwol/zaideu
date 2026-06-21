'use client'
import * as React from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { XIcon } from 'lucide-react'
import { classNames } from '@/shared/lib/utils'
import styles from '../Dialog.module.scss'
const Dialog = ({ ...props }: React.ComponentProps<typeof DialogPrimitive.Root>) => {
  return <DialogPrimitive.Root data-slot="dialog" {...props} />
}
const DialogTrigger = ({ ...props }: React.ComponentProps<typeof DialogPrimitive.Trigger>) => {
  return <DialogPrimitive.Trigger data-slot="dialog-trigger" {...props} />
}
const DialogPortal = ({ ...props }: React.ComponentProps<typeof DialogPrimitive.Portal>) => {
  return <DialogPrimitive.Portal data-slot="dialog-portal" {...props} />
}
const DialogClose = ({ ...props }: React.ComponentProps<typeof DialogPrimitive.Close>) => {
  return <DialogPrimitive.Close data-slot="dialog-close" {...props} />
}
const DialogOverlay = ({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Overlay>) => {
  return (
    <DialogPrimitive.Overlay
      data-slot="dialog-overlay"
      className={classNames(styles.overlay, className)}
      {...props}
    />
  )
}
const DialogContent = ({
  className,
  children,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Content> & {
  showCloseButton?: boolean
}) => {
  return (
    <DialogPortal data-slot="dialog-portal">
      <DialogOverlay />
      <DialogPrimitive.Content
        data-slot="dialog-content"
        className={classNames(styles.content, className)}
        {...props}
      >
        {children}
        {showCloseButton && (
          <DialogPrimitive.Close data-slot="dialog-close" className={styles.close}>
            <XIcon />
            <span className={styles.srOnly}>Close</span>
          </DialogPrimitive.Close>
        )}
      </DialogPrimitive.Content>
    </DialogPortal>
  )
}
const DialogHeader = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div data-slot="dialog-header" className={classNames(styles.header, className)} {...props} />
  )
}
const DialogFooter = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div data-slot="dialog-footer" className={classNames(styles.footer, className)} {...props} />
  )
}
const DialogTitle = ({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Title>) => {
  return (
    <DialogPrimitive.Title
      data-slot="dialog-title"
      className={classNames(styles.title, className)}
      {...props}
    />
  )
}
const DialogDescription = ({
  className,
  ...props
}: React.ComponentProps<typeof DialogPrimitive.Description>) => {
  return (
    <DialogPrimitive.Description
      data-slot="dialog-description"
      className={classNames(styles.description, className)}
      {...props}
    />
  )
}
export {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogOverlay,
  DialogPortal,
  DialogTitle,
  DialogTrigger,
}
