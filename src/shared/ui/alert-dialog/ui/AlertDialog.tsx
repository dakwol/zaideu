'use client'
import * as React from 'react'
import * as AlertDialogPrimitive from '@radix-ui/react-alert-dialog'
import { classNames } from '@/shared/lib/utils'
import { buttonVariants } from '@/shared/ui/button'
import styles from '../AlertDialog.module.scss'
const AlertDialog = ({ ...props }: React.ComponentProps<typeof AlertDialogPrimitive.Root>) => {
  return <AlertDialogPrimitive.Root data-slot="alert-dialog" {...props} />
}
const AlertDialogTrigger = ({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Trigger>) => {
  return <AlertDialogPrimitive.Trigger data-slot="alert-dialog-trigger" {...props} />
}
const AlertDialogPortal = ({
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Portal>) => {
  return <AlertDialogPrimitive.Portal data-slot="alert-dialog-portal" {...props} />
}
const AlertDialogOverlay = ({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Overlay>) => {
  return (
    <AlertDialogPrimitive.Overlay
      data-slot="alert-dialog-overlay"
      className={classNames(styles.overlay, className)}
      {...props}
    />
  )
}
const AlertDialogContent = ({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Content>) => {
  return (
    <AlertDialogPortal>
      <AlertDialogOverlay />
      <AlertDialogPrimitive.Content
        data-slot="alert-dialog-content"
        className={classNames(styles.content, className)}
        {...props}
      />
    </AlertDialogPortal>
  )
}
const AlertDialogHeader = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="alert-dialog-header"
      className={classNames(styles.header, className)}
      {...props}
    />
  )
}
const AlertDialogFooter = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div
      data-slot="alert-dialog-footer"
      className={classNames(styles.footer, className)}
      {...props}
    />
  )
}
const AlertDialogTitle = ({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Title>) => {
  return (
    <AlertDialogPrimitive.Title
      data-slot="alert-dialog-title"
      className={classNames(styles.title, className)}
      {...props}
    />
  )
}
const AlertDialogDescription = ({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Description>) => {
  return (
    <AlertDialogPrimitive.Description
      data-slot="alert-dialog-description"
      className={classNames(styles.description, className)}
      {...props}
    />
  )
}
const AlertDialogAction = ({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Action>) => {
  return (
    <AlertDialogPrimitive.Action className={classNames(buttonVariants(), className)} {...props} />
  )
}
const AlertDialogCancel = ({
  className,
  ...props
}: React.ComponentProps<typeof AlertDialogPrimitive.Cancel>) => {
  return (
    <AlertDialogPrimitive.Cancel
      className={classNames(buttonVariants({ variant: 'outline' }), className)}
      {...props}
    />
  )
}
export {
  AlertDialog,
  AlertDialogPortal,
  AlertDialogOverlay,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
}
