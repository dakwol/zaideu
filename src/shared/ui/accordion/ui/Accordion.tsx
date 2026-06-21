'use client'
import * as React from 'react'
import * as AccordionPrimitive from '@radix-ui/react-accordion'
import { ChevronDownIcon } from 'lucide-react'
import { classNames } from '@/shared/lib/utils'
import styles from '../Accordion.module.scss'
const Accordion = ({ ...props }: React.ComponentProps<typeof AccordionPrimitive.Root>) => {
  return <AccordionPrimitive.Root data-slot="accordion" {...props} />
}
const AccordionItem = ({
  className,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Item>) => {
  return (
    <AccordionPrimitive.Item
      data-slot="accordion-item"
      className={classNames(styles.item, className)}
      {...props}
    />
  )
}
const AccordionTrigger = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Trigger>) => {
  return (
    <AccordionPrimitive.Header className={styles.header}>
      <AccordionPrimitive.Trigger
        data-slot="accordion-trigger"
        className={classNames(styles.trigger, className)}
        {...props}
      >
        {children}
        <ChevronDownIcon className={styles.icon} />
      </AccordionPrimitive.Trigger>
    </AccordionPrimitive.Header>
  )
}
const AccordionContent = ({
  className,
  children,
  ...props
}: React.ComponentProps<typeof AccordionPrimitive.Content>) => {
  return (
    <AccordionPrimitive.Content data-slot="accordion-content" className={styles.content} {...props}>
      <div className={classNames(styles.contentInner, className)}>{children}</div>
    </AccordionPrimitive.Content>
  )
}
export { Accordion, AccordionItem, AccordionTrigger, AccordionContent }
