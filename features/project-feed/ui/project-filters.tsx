'use client'

import { cn } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import type { ProjectStatus, HealthStatus } from '@/shared/lib/types'
import { Filter, X } from 'lucide-react'
import { useTranslation } from '@/shared/hooks/use-locale'

interface ProjectFiltersProps {
  selectedStatus: ProjectStatus | 'all'
  selectedHealth: HealthStatus | 'all'
  selectedTech: string[]
  selectedRoles: string[]
  availableTech: string[]
  availableRoles: string[]
  onStatusChange: (status: ProjectStatus | 'all') => void
  onHealthChange: (health: HealthStatus | 'all') => void
  onTechChange: (tech: string[]) => void
  onRolesChange: (roles: string[]) => void
  className?: string
}

export function ProjectFilters({
  selectedStatus,
  selectedHealth,
  selectedTech,
  selectedRoles,
  availableTech,
  availableRoles,
  onStatusChange,
  onHealthChange,
  onTechChange,
  onRolesChange,
  className,
}: ProjectFiltersProps) {
  const t = useTranslation()
  const hasFilters = selectedStatus !== 'all' || selectedHealth !== 'all' || selectedTech.length > 0 || selectedRoles.length > 0

  const clearFilters = () => {
    onStatusChange('all')
    onHealthChange('all')
    onTechChange([])
    onRolesChange([])
  }

  const toggleTech = (tech: string) => {
    if (selectedTech.includes(tech)) {
      onTechChange(selectedTech.filter(t => t !== tech))
    } else {
      onTechChange([...selectedTech, tech])
    }
  }

  const toggleRole = (role: string) => {
    if (selectedRoles.includes(role)) {
      onRolesChange(selectedRoles.filter(r => r !== role))
    } else {
      onRolesChange([...selectedRoles, role])
    }
  }

  const statuses: Array<{ value: ProjectStatus | 'all'; label: string }> = [
    { value: 'all', label: t('filters.all') },
    { value: 'active', label: t('filters.active') },
    { value: 'slow', label: t('filters.slow') },
    { value: 'stalled', label: t('filters.stalled') },
    { value: 'revival', label: t('filters.revival') },
    { value: 'completed', label: t('filters.completed') },
  ]

  const healthOptions: Array<{ value: HealthStatus | 'all'; label: string; color?: string }> = [
    { value: 'all', label: t('filters.all') },
    { value: 'healthy', label: t('filters.healthy'), color: 'bg-emerald-500' },
    { value: 'slowing', label: t('filters.slowing'), color: 'bg-amber-500' },
    { value: 'at_risk', label: t('filters.atRisk'), color: 'bg-red-500' },
  ]

  return (
    <div className={cn('space-y-4', className)}>
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 text-sm font-medium text-foreground">
          <Filter className="w-4 h-4" />
          {t('buttons.filter')}
        </div>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className="h-7 px-2 text-xs">
            <X className="w-3 h-3 mr-1" />
            {t('buttons.clear')}
          </Button>
        )}
      </div>

      <div className="space-y-3">
        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
            {t('filters.status')}
          </label>
          <div className="flex flex-wrap gap-1.5">
            {statuses.map((status) => (
              <button
                key={status.value}
                onClick={() => onStatusChange(status.value)}
                className={cn(
                  'px-2.5 py-1 text-xs font-medium rounded-md transition-colors',
                  selectedStatus === status.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                )}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
            {t('filters.health')}
          </label>
          <div className="flex flex-wrap gap-1.5">
            {healthOptions.map((option) => (
              <button
                key={option.value}
                onClick={() => onHealthChange(option.value)}
                className={cn(
                  'px-2.5 py-1 text-xs font-medium rounded-md transition-colors flex items-center gap-1.5',
                  selectedHealth === option.value
                    ? 'bg-primary text-primary-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                )}
              >
                {option.color && (
                  <span className={cn('w-2 h-2 rounded-full', option.color)} />
                )}
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
            {t('filters.technology')}
          </label>
          <div className="flex flex-wrap gap-1.5">
            {availableTech.slice(0, 8).map((tech) => (
              <button
                key={tech}
                onClick={() => toggleTech(tech)}
                className={cn(
                  'px-2.5 py-1 text-xs font-medium rounded-md transition-colors',
                  selectedTech.includes(tech)
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                )}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide mb-2 block">
            {t('filters.roles')}
          </label>
          <div className="flex flex-wrap gap-1.5">
            {availableRoles.map((role) => (
              <button
                key={role}
                onClick={() => toggleRole(role)}
                className={cn(
                  'px-2.5 py-1 text-xs font-medium rounded-md transition-colors',
                  selectedRoles.includes(role)
                    ? 'bg-accent text-accent-foreground'
                    : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                )}
              >
                {role}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
