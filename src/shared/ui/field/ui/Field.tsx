'use client'
import { useMemo } from 'react'
import { classNames } from '@/shared/lib/utils'
import { Label } from '@/shared/ui/label'
import { Separator } from '@/shared/ui/separator'
import styles from '../Field.module.scss'
const FieldSet = ({ className, ...props }: React.ComponentProps<'fieldset'>) => {
  return <fieldset data-slot="field-set" className={classNames(styles.set, className)} {...props} />
}
const FieldLegend = ({
  className,
  variant = 'legend',
  ...props
}: React.ComponentProps<'legend'> & {
  variant?: 'legend' | 'label'
}) => {
  return (
    <legend
      data-slot="field-legend"
      data-variant={variant}
      className={classNames(styles.legend, className)}
      {...props}
    />
  )
}
const FieldGroup = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return <div data-slot="field-group" className={classNames(styles.group, className)} {...props} />
}
type FieldOrientation = 'vertical' | 'horizontal' | 'responsive'
const fieldVariants = ({
  orientation = 'vertical',
  className,
}: {
  orientation?: FieldOrientation
  className?: string
} = {}) => {
  return classNames(styles.field, styles[orientation], className)
}
const Field = ({
  className,
  orientation = 'vertical',
  ...props
}: React.ComponentProps<'div'> & {
  orientation?: FieldOrientation
}) => {
  return (
    <div
      role="group"
      data-slot="field"
      data-orientation={orientation}
      className={classNames(fieldVariants({ orientation }), className)}
      {...props}
    />
  )
}
const FieldContent = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return (
    <div data-slot="field-content" className={classNames(styles.content, className)} {...props} />
  )
}
const FieldLabel = ({ className, ...props }: React.ComponentProps<typeof Label>) => {
  return (
    <Label data-slot="field-label" className={classNames(styles.label, className)} {...props} />
  )
}
const FieldTitle = ({ className, ...props }: React.ComponentProps<'div'>) => {
  return <div data-slot="field-label" className={classNames(styles.title, className)} {...props} />
}
const FieldDescription = ({ className, ...props }: React.ComponentProps<'p'>) => {
  return (
    <p
      data-slot="field-description"
      className={classNames(styles.description, className)}
      {...props}
    />
  )
}
const FieldSeparator = ({
  children,
  className,
  ...props
}: React.ComponentProps<'div'> & {
  children?: React.ReactNode
}) => {
  return (
    <div
      data-slot="field-separator"
      data-content={!!children}
      className={classNames(styles.separator, className)}
      {...props}
    >
      <Separator className={styles.separatorLine} />
      {children && (
        <span className={styles.separatorContent} data-slot="field-separator-content">
          {children}
        </span>
      )}
    </div>
  )
}
const FieldError = ({
  className,
  children,
  errors,
  ...props
}: React.ComponentProps<'div'> & {
  errors?: Array<
    | {
        message?: string
      }
    | undefined
  >
}) => {
  const content = useMemo(() => {
    if (children) {
      return children
    }
    if (!errors) {
      return null
    }
    if (errors.length === 1 && errors[0]?.message) {
      return errors[0].message
    }
    return (
      <ul className={styles.errorList}>
        {errors.map((error, index) => error?.message && <li key={index}>{error.message}</li>)}
      </ul>
    )
  }, [children, errors])
  if (!content) {
    return null
  }
  return (
    <div
      role="alert"
      data-slot="field-error"
      className={classNames(styles.error, className)}
      {...props}
    >
      {content}
    </div>
  )
}
export {
  Field,
  FieldLabel,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLegend,
  FieldSeparator,
  FieldSet,
  FieldContent,
  FieldTitle,
}
