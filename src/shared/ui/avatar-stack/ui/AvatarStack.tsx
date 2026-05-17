'use client'

import { cn } from '@/shared/lib/utils'
import type { User } from '@/shared/lib/types'
import styles from '../AvatarStack.module.scss'

interface AvatarStackProps {
  users: User[]
  max?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function AvatarStack({ users, max = 4, size = 'md', className }: AvatarStackProps) {
  const displayUsers = users.slice(0, max)
  const remaining = users.length - max
  
  return (
    <div className={cn(styles.stack, className)}>
      {displayUsers.map((user, index) => (
        <div
          key={user.id}
          className={cn(
            styles.item,
            styles[size],
            index > 0 && styles[`overlap-${size}`]
          )}
          title={user.name}
        >
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className={styles.image}
            />
          ) : (
            <span className={styles.initial}>
              {user.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            styles.item,
            styles.counter,
            styles[size],
            styles[`overlap-${size}`]
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  )
}

