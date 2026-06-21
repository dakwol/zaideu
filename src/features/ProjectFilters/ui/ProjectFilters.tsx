'use client'
import { classNames } from '@/shared/lib/utils'
import { Button } from '@/shared/ui/button'
import type { ProjectStatus, HealthStatus } from '@/shared/lib/types'
import { Filter, X } from 'lucide-react'
import { useTranslation } from '@/shared/hooks/use-locale'
import styles from '../ProjectFilters.module.scss'
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
export const ProjectFilters = ({
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
}: ProjectFiltersProps) => {
  const translate = useTranslation()
  const hasFilters =
    selectedStatus !== 'all' ||
    selectedHealth !== 'all' ||
    selectedTech.length > 0 ||
    selectedRoles.length > 0
  const clearFilters = () => {
    onStatusChange('all')
    onHealthChange('all')
    onTechChange([])
    onRolesChange([])
  }
  const toggleTech = (tech: string) => {
    if (selectedTech.includes(tech)) {
      onTechChange(selectedTech.filter(item => item !== tech))
    } else {
      onTechChange([...selectedTech, tech])
    }
  }
  const toggleRole = (role: string) => {
    if (selectedRoles.includes(role)) {
      onRolesChange(selectedRoles.filter(item => item !== role))
    } else {
      onRolesChange([...selectedRoles, role])
    }
  }
  const statuses: Array<{
    value: ProjectStatus | 'all'
    label: string
  }> = [
    { value: 'all', label: translate('filters.all') },
    { value: 'active', label: translate('filters.active') },
    { value: 'slow', label: translate('filters.slow') },
    { value: 'stalled', label: translate('filters.stalled') },
    { value: 'revival', label: translate('filters.revival') },
    { value: 'completed', label: translate('filters.completed') },
  ]
  const healthOptions: Array<{
    value: HealthStatus | 'all'
    label: string
    indicatorClassName?: string
  }> = [
    { value: 'all', label: translate('filters.all') },
    {
      value: 'healthy',
      label: translate('filters.healthy'),
      indicatorClassName: styles.healthHealthy,
    },
    {
      value: 'slowing',
      label: translate('filters.slowing'),
      indicatorClassName: styles.healthSlowing,
    },
    {
      value: 'at_risk',
      label: translate('filters.atRisk'),
      indicatorClassName: styles.healthAtRisk,
    },
  ]
  return (
    <div className={classNames(styles.filters, className)}>
      <div className={styles.header}>
        <div className={styles.title}>
          <Filter aria-hidden="true" />
          {translate('buttons.filter')}
        </div>
        {hasFilters && (
          <Button variant="ghost" size="sm" onClick={clearFilters} className={styles.clearButton}>
            <X aria-hidden="true" />
            {translate('buttons.clear')}
          </Button>
        )}
      </div>

      <div className={styles.groups}>
        <div className={styles.group}>
          <span className={styles.label}>{translate('filters.status')}</span>
          <div className={styles.options}>
            {statuses.map(status => (
              <button
                key={status.value}
                type="button"
                onClick={() => onStatusChange(status.value)}
                className={classNames(
                  styles.option,
                  selectedStatus === status.value && styles.optionSelected
                )}
              >
                {status.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.group}>
          <span className={styles.label}>{translate('filters.health')}</span>
          <div className={styles.options}>
            {healthOptions.map(option => (
              <button
                key={option.value}
                type="button"
                onClick={() => onHealthChange(option.value)}
                className={classNames(
                  styles.option,
                  styles.optionWithIndicator,
                  selectedHealth === option.value && styles.optionSelected
                )}
              >
                {option.indicatorClassName && (
                  <span className={classNames(styles.healthDot, option.indicatorClassName)} />
                )}
                {option.label}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.group}>
          <span className={styles.label}>{translate('filters.technology')}</span>
          <div className={styles.options}>
            {availableTech.slice(0, 8).map(tech => (
              <button
                key={tech}
                type="button"
                onClick={() => toggleTech(tech)}
                className={classNames(
                  styles.option,
                  selectedTech.includes(tech) && styles.optionSelected
                )}
              >
                {tech}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.group}>
          <span className={styles.label}>{translate('filters.roles')}</span>
          <div className={styles.options}>
            {availableRoles.map(role => (
              <button
                key={role}
                type="button"
                onClick={() => toggleRole(role)}
                className={classNames(
                  styles.option,
                  selectedRoles.includes(role) && styles.optionSelected
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
