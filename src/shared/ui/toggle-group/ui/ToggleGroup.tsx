'use client'
import * as React from 'react'
import * as ToggleGroupPrimitive from '@radix-ui/react-toggle-group'
import { classNames } from '@/shared/lib/utils'
import { toggleVariants } from '@/shared/ui/toggle'
import type { ToggleVariantsOptions } from '@/shared/ui/toggle'
import styles from '../ToggleGroup.module.scss'
const ToggleGroupContext = React.createContext<ToggleVariantsOptions>({
  size: 'default',
  variant: 'default',
})
const ToggleGroup = ({
  className,
  variant,
  size,
  children,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Root> & ToggleVariantsOptions) => {
  return (
    <ToggleGroupPrimitive.Root
      data-slot="toggle-group"
      data-variant={variant}
      data-size={size}
      className={classNames(styles.group, className)}
      {...props}
    >
      <ToggleGroupContext.Provider value={{ variant, size }}>
        {children}
      </ToggleGroupContext.Provider>
    </ToggleGroupPrimitive.Root>
  )
}
const ToggleGroupItem = ({
  className,
  children,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof ToggleGroupPrimitive.Item> & ToggleVariantsOptions) => {
  const context = React.useContext(ToggleGroupContext)
  return (
    <ToggleGroupPrimitive.Item
      data-slot="toggle-group-item"
      data-variant={context.variant || variant}
      data-size={context.size || size}
      className={classNames(
        toggleVariants({
          variant: context.variant || variant,
          size: context.size || size,
        }),
        styles.item,
        className
      )}
      {...props}
    >
      {children}
    </ToggleGroupPrimitive.Item>
  )
}
export { ToggleGroup, ToggleGroupItem }
