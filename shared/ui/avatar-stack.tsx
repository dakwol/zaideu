'use client'

import { cn } from '@/shared/lib/utils'
import type { User } from '@/shared/lib/types'

interface AvatarStackProps {
  users: User[]
  max?: number
  size?: 'sm' | 'md' | 'lg'
  className?: string
}

export function AvatarStack({ users, max = 4, size = 'md', className }: AvatarStackProps) {
  const displayUsers = users.slice(0, max)
  const remaining = users.length - max
  
  const sizeClasses = {
    sm: 'w-6 h-6 text-[10px]',
    md: 'w-8 h-8 text-xs',
    lg: 'w-10 h-10 text-sm',
  }
  
  const overlapClasses = {
    sm: '-ml-2',
    md: '-ml-2.5',
    lg: '-ml-3',
  }
  
  return (
    <div className={cn('flex items-center', className)}>
      {displayUsers.map((user, index) => (
        <div
          key={user.id}
          className={cn(
            'relative rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden',
            sizeClasses[size],
            index > 0 && overlapClasses[size]
          )}
          title={user.name}
        >
          {user.avatar ? (
            <img
              src={user.avatar}
              alt={user.name}
              className="w-full h-full object-cover"
            />
          ) : (
            <span className="font-medium text-muted-foreground">
              {user.name.charAt(0).toUpperCase()}
            </span>
          )}
        </div>
      ))}
      {remaining > 0 && (
        <div
          className={cn(
            'relative rounded-full border-2 border-background bg-secondary flex items-center justify-center font-medium text-secondary-foreground',
            sizeClasses[size],
            overlapClasses[size]
          )}
        >
          +{remaining}
        </div>
      )}
    </div>
  )
}

