import { PROJECT_ROLE_LABELS, PROJECT_ROLE_OPTIONS } from '@/entities/project/model/constants'
import { CheckboxCard } from '@/shared/ui/CheckboxCard'
import { StepHeader } from '@/shared/ui/StepHeader'
import type { ProjectRolesSectionProps } from '../../model/types'
import styles from './ProjectRolesSection.module.scss'

function ProjectRolesSection({
  selectedRoles,
  onRoleToggle,
}: ProjectRolesSectionProps) {
  return (
    <section className={styles.section}>
      <StepHeader
        eyebrow="Команда"
        title="Кто может понадобиться?"
        subtitle="Мы предложили роли по типу проекта. Можно изменить."
      />
      <div className={styles.rolesGrid}>
        {PROJECT_ROLE_OPTIONS.map((projectRole) => (
          <CheckboxCard
            key={projectRole}
            title={PROJECT_ROLE_LABELS[projectRole]}
            checked={selectedRoles.includes(projectRole)}
            onCheckedChange={() => onRoleToggle(projectRole)}
          />
        ))}
      </div>
    </section>
  )
}

export { ProjectRolesSection }
