import * as React from 'react'
import { ChevronLeftIcon, ChevronRightIcon, MoreHorizontalIcon } from 'lucide-react'
import { classNames } from '@/shared/lib/utils'
import { Button, buttonVariants } from '@/shared/ui/button'
import styles from '../Pagination.module.scss'
const Pagination = ({ className, ...props }: React.ComponentProps<'nav'>) => {
  return (
    <nav
      role="navigation"
      aria-label="pagination"
      data-slot="pagination"
      className={classNames(styles.pagination, className)}
      {...props}
    />
  )
}
const PaginationContent = ({ className, ...props }: React.ComponentProps<'ul'>) => {
  return (
    <ul
      data-slot="pagination-content"
      className={classNames(styles.content, className)}
      {...props}
    />
  )
}
const PaginationItem = ({ ...props }: React.ComponentProps<'li'>) => {
  return <li data-slot="pagination-item" {...props} />
}
type PaginationLinkProps = {
  isActive?: boolean
} & Pick<React.ComponentProps<typeof Button>, 'size'> &
  React.ComponentProps<'a'>
const PaginationLink = ({ className, isActive, size = 'icon', ...props }: PaginationLinkProps) => {
  return (
    <a
      aria-current={isActive ? 'page' : undefined}
      data-slot="pagination-link"
      data-active={isActive}
      className={classNames(
        buttonVariants({
          variant: isActive ? 'outline' : 'ghost',
          size,
        }),
        className
      )}
      {...props}
    />
  )
}
const PaginationPrevious = ({
  className,
  ...props
}: React.ComponentProps<typeof PaginationLink>) => {
  return (
    <PaginationLink
      aria-label="Go to previous page"
      size="default"
      className={classNames(styles.previous, className)}
      {...props}
    >
      <ChevronLeftIcon />
      <span className={styles.responsiveLabel}>Previous</span>
    </PaginationLink>
  )
}
const PaginationNext = ({ className, ...props }: React.ComponentProps<typeof PaginationLink>) => {
  return (
    <PaginationLink
      aria-label="Go to next page"
      size="default"
      className={classNames(styles.next, className)}
      {...props}
    >
      <span className={styles.responsiveLabel}>Next</span>
      <ChevronRightIcon />
    </PaginationLink>
  )
}
const PaginationEllipsis = ({ className, ...props }: React.ComponentProps<'span'>) => {
  return (
    <span
      aria-hidden
      data-slot="pagination-ellipsis"
      className={classNames(styles.ellipsis, className)}
      {...props}
    >
      <MoreHorizontalIcon className={styles.ellipsisIcon} />
      <span className={styles.srOnly}>More pages</span>
    </span>
  )
}
export {
  Pagination,
  PaginationContent,
  PaginationLink,
  PaginationItem,
  PaginationPrevious,
  PaginationNext,
  PaginationEllipsis,
}
