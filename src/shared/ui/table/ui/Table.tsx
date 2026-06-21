'use client'
import * as React from 'react'
import { classNames } from '@/shared/lib/utils'
import styles from '../Table.module.scss'
const Table = ({ className, ...props }: React.ComponentProps<'table'>) => {
  return (
    <div data-slot="table-container" className={styles.container}>
      <table data-slot="table" className={classNames(styles.table, className)} {...props} />
    </div>
  )
}
const TableHeader = ({ className, ...props }: React.ComponentProps<'thead'>) => {
  return (
    <thead data-slot="table-header" className={classNames(styles.header, className)} {...props} />
  )
}
const TableBody = ({ className, ...props }: React.ComponentProps<'tbody'>) => {
  return <tbody data-slot="table-body" className={classNames(styles.body, className)} {...props} />
}
const TableFooter = ({ className, ...props }: React.ComponentProps<'tfoot'>) => {
  return (
    <tfoot data-slot="table-footer" className={classNames(styles.footer, className)} {...props} />
  )
}
const TableRow = ({ className, ...props }: React.ComponentProps<'tr'>) => {
  return <tr data-slot="table-row" className={classNames(styles.row, className)} {...props} />
}
const TableHead = ({ className, ...props }: React.ComponentProps<'th'>) => {
  return <th data-slot="table-head" className={classNames(styles.head, className)} {...props} />
}
const TableCell = ({ className, ...props }: React.ComponentProps<'td'>) => {
  return <td data-slot="table-cell" className={classNames(styles.cell, className)} {...props} />
}
const TableCaption = ({ className, ...props }: React.ComponentProps<'caption'>) => {
  return (
    <caption
      data-slot="table-caption"
      className={classNames(styles.caption, className)}
      {...props}
    />
  )
}
export { Table, TableHeader, TableBody, TableFooter, TableHead, TableRow, TableCell, TableCaption }
