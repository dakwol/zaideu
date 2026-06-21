'use client'
import * as React from 'react'
import * as RadioGroupPrimitive from '@radix-ui/react-radio-group'
import { CircleIcon } from 'lucide-react'
import { classNames } from '@/shared/lib/utils'
import styles from '../RadioGroup.module.scss'
const RadioGroup = ({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Root>) => {
  return (
    <RadioGroupPrimitive.Root
      data-slot="radio-group"
      className={classNames(styles.group, className)}
      {...props}
    />
  )
}
const RadioGroupItem = ({
  className,
  ...props
}: React.ComponentProps<typeof RadioGroupPrimitive.Item>) => {
  return (
    <RadioGroupPrimitive.Item
      data-slot="radio-group-item"
      className={classNames(styles.item, className)}
      {...props}
    >
      <RadioGroupPrimitive.Indicator data-slot="radio-group-indicator" className={styles.indicator}>
        <CircleIcon className={styles.icon} />
      </RadioGroupPrimitive.Indicator>
    </RadioGroupPrimitive.Item>
  )
}
export { RadioGroup, RadioGroupItem }
