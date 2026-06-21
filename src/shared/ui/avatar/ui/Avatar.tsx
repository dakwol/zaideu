'use client'
import * as React from 'react'
import * as AvatarPrimitive from '@radix-ui/react-avatar'
import { classNames } from '@/shared/lib/utils'
import styles from '../Avatar.module.scss'
const Avatar = ({ className, ...props }: React.ComponentProps<typeof AvatarPrimitive.Root>) => {
  return (
    <AvatarPrimitive.Root
      data-slot="avatar"
      className={classNames(styles.avatar, className)}
      {...props}
    />
  )
}
const AvatarImage = ({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Image>) => {
  return (
    <AvatarPrimitive.Image
      data-slot="avatar-image"
      className={classNames(styles.image, className)}
      {...props}
    />
  )
}
const AvatarFallback = ({
  className,
  ...props
}: React.ComponentProps<typeof AvatarPrimitive.Fallback>) => {
  return (
    <AvatarPrimitive.Fallback
      data-slot="avatar-fallback"
      className={classNames(styles.fallback, className)}
      {...props}
    />
  )
}
export { Avatar, AvatarImage, AvatarFallback }
