import type { ReactNode } from 'react'

export interface CheckboxCardProps {
  title: string
  description?: string
  checked: boolean
  children?: ReactNode
  onCheckedChange: (nextChecked: boolean) => void
}
