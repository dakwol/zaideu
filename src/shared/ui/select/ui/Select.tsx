'use client'
import * as React from 'react'
import * as SelectPrimitive from '@radix-ui/react-select'
import { CheckIcon, ChevronDownIcon, ChevronUpIcon } from 'lucide-react'
import { classNames } from '@/shared/lib/utils'
import styles from '../Select.module.scss'
const Select = ({ ...props }: React.ComponentProps<typeof SelectPrimitive.Root>) => {
  return <SelectPrimitive.Root data-slot="select" {...props} />
}
const SelectGroup = ({ ...props }: React.ComponentProps<typeof SelectPrimitive.Group>) => {
  return <SelectPrimitive.Group data-slot="select-group" {...props} />
}
const SelectValue = ({ ...props }: React.ComponentProps<typeof SelectPrimitive.Value>) => {
  return <SelectPrimitive.Value data-slot="select-value" {...props} />
}
const SelectTrigger = ({
  className,
  size = 'default',
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger> & {
  size?: 'sm' | 'default'
}) => {
  return (
    <SelectPrimitive.Trigger
      data-slot="select-trigger"
      data-size={size}
      className={classNames(styles.trigger, className)}
      {...props}
    >
      {children}
      <SelectPrimitive.Icon asChild>
        <ChevronDownIcon className={styles.triggerIcon} />
      </SelectPrimitive.Icon>
    </SelectPrimitive.Trigger>
  )
}
const SelectContent = ({
  className,
  children,
  position = 'popper',
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) => {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        data-slot="select-content"
        className={classNames(styles.content, position === 'popper' && styles.popper, className)}
        position={position}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport
          className={classNames(styles.viewport, position === 'popper' && styles.popperViewport)}
        >
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}
const SelectLabel = ({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Label>) => {
  return (
    <SelectPrimitive.Label
      data-slot="select-label"
      className={classNames(styles.label, className)}
      {...props}
    />
  )
}
const SelectItem = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) => {
  return (
    <SelectPrimitive.Item
      data-slot="select-item"
      className={classNames(styles.item, className)}
      {...props}
    >
      <span className={styles.itemIndicator}>
        <SelectPrimitive.ItemIndicator>
          <CheckIcon className={styles.itemIcon} />
        </SelectPrimitive.ItemIndicator>
      </span>
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
    </SelectPrimitive.Item>
  )
}
const SelectSeparator = ({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Separator>) => {
  return (
    <SelectPrimitive.Separator
      data-slot="select-separator"
      className={classNames(styles.separator, className)}
      {...props}
    />
  )
}
const SelectScrollUpButton = ({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) => {
  return (
    <SelectPrimitive.ScrollUpButton
      data-slot="select-scroll-up-button"
      className={classNames(styles.scrollButton, className)}
      {...props}
    >
      <ChevronUpIcon className={styles.scrollIcon} />
    </SelectPrimitive.ScrollUpButton>
  )
}
const SelectScrollDownButton = ({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) => {
  return (
    <SelectPrimitive.ScrollDownButton
      data-slot="select-scroll-down-button"
      className={classNames(styles.scrollButton, className)}
      {...props}
    >
      <ChevronDownIcon className={styles.scrollIcon} />
    </SelectPrimitive.ScrollDownButton>
  )
}
export {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectScrollDownButton,
  SelectScrollUpButton,
  SelectSeparator,
  SelectTrigger,
  SelectValue,
}
