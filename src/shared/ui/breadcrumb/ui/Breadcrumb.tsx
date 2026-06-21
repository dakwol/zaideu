import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { ChevronRight, MoreHorizontal } from 'lucide-react'
import { classNames } from '@/shared/lib/utils'
import styles from '../Breadcrumb.module.scss'
const Breadcrumb = ({ ...props }: React.ComponentProps<'nav'>) => {
  return <nav aria-label="breadcrumb" data-slot="breadcrumb" {...props} />
}
const BreadcrumbList = ({ className, ...props }: React.ComponentProps<'ol'>) => {
  return (
    <ol data-slot="breadcrumb-list" className={classNames(styles.list, className)} {...props} />
  )
}
const BreadcrumbItem = ({ className, ...props }: React.ComponentProps<'li'>) => {
  return (
    <li data-slot="breadcrumb-item" className={classNames(styles.item, className)} {...props} />
  )
}
const BreadcrumbLink = ({
  asChild,
  className,
  ...props
}: React.ComponentProps<'a'> & {
  asChild?: boolean
}) => {
  const Comp = asChild ? Slot : 'a'
  return (
    <Comp data-slot="breadcrumb-link" className={classNames(styles.link, className)} {...props} />
  )
}
const BreadcrumbPage = ({ className, ...props }: React.ComponentProps<'span'>) => {
  return (
    <span
      data-slot="breadcrumb-page"
      role="link"
      aria-disabled="true"
      aria-current="page"
      className={classNames(styles.page, className)}
      {...props}
    />
  )
}
const BreadcrumbSeparator = ({ children, className, ...props }: React.ComponentProps<'li'>) => {
  return (
    <li
      data-slot="breadcrumb-separator"
      role="presentation"
      aria-hidden="true"
      className={classNames(styles.separator, className)}
      {...props}
    >
      {children ?? <ChevronRight />}
    </li>
  )
}
const BreadcrumbEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => {
  return (
    <span
      data-slot="breadcrumb-ellipsis"
      role="presentation"
      aria-hidden="true"
      className={classNames(styles.ellipsis, className)}
      {...props}
    >
      <MoreHorizontal className={styles.ellipsisIcon} />
      <span className={styles.srOnly}>More</span>
    </span>
  )
}
export {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbPage,
  BreadcrumbSeparator,
  BreadcrumbEllipsis,
}
