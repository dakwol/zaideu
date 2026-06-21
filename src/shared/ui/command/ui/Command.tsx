'use client'
import * as React from 'react'
import { Command as CommandPrimitive } from 'cmdk'
import { SearchIcon } from 'lucide-react'
import { classNames } from '@/shared/lib/utils'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/shared/ui/dialog'
import styles from '../Command.module.scss'
const Command = ({ className, ...props }: React.ComponentProps<typeof CommandPrimitive>) => {
  return (
    <CommandPrimitive
      data-slot="command"
      className={classNames(styles.command, className)}
      {...props}
    />
  )
}
const CommandDialog = ({
  title = 'Command Palette',
  description = 'Search for a command to run...',
  children,
  className,
  showCloseButton = true,
  ...props
}: React.ComponentProps<typeof Dialog> & {
  title?: string
  description?: string
  className?: string
  showCloseButton?: boolean
}) => {
  return (
    <Dialog {...props}>
      <DialogHeader className={styles.srOnly}>
        <DialogTitle>{title}</DialogTitle>
        <DialogDescription>{description}</DialogDescription>
      </DialogHeader>
      <DialogContent
        className={classNames(styles.dialogContent, className)}
        showCloseButton={showCloseButton}
      >
        <Command className={styles.dialogCommand}>{children}</Command>
      </DialogContent>
    </Dialog>
  )
}
const CommandInput = ({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Input>) => {
  return (
    <div data-slot="command-input-wrapper" className={styles.inputWrapper}>
      <SearchIcon className={styles.searchIcon} />
      <CommandPrimitive.Input
        data-slot="command-input"
        className={classNames(styles.input, className)}
        {...props}
      />
    </div>
  )
}
const CommandList = ({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.List>) => {
  return (
    <CommandPrimitive.List
      data-slot="command-list"
      className={classNames(styles.list, className)}
      {...props}
    />
  )
}
const CommandEmpty = ({ ...props }: React.ComponentProps<typeof CommandPrimitive.Empty>) => {
  return <CommandPrimitive.Empty data-slot="command-empty" className={styles.empty} {...props} />
}
const CommandGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Group>) => {
  return (
    <CommandPrimitive.Group
      data-slot="command-group"
      className={classNames(styles.group, className)}
      {...props}
    />
  )
}
const CommandSeparator = ({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Separator>) => {
  return (
    <CommandPrimitive.Separator
      data-slot="command-separator"
      className={classNames(styles.separator, className)}
      {...props}
    />
  )
}
const CommandItem = ({
  className,
  ...props
}: React.ComponentProps<typeof CommandPrimitive.Item>) => {
  return (
    <CommandPrimitive.Item
      data-slot="command-item"
      className={classNames(styles.item, className)}
      {...props}
    />
  )
}
const CommandShortcut = ({ className, ...props }: React.ComponentProps<'span'>) => {
  return (
    <span
      data-slot="command-shortcut"
      className={classNames(styles.shortcut, className)}
      {...props}
    />
  )
}
export {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
  CommandShortcut,
  CommandSeparator,
}
