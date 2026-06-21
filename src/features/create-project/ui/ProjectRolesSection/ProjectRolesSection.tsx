import { PROJECT_ROLE_LABELS, PROJECT_ROLE_OPTIONS } from '@/entities/project/model/constants'
import { Plus, X } from 'lucide-react'
import { CreateProjectStepHeading } from '../CreateProjectStepHeading'
import type { ProjectRolesSectionProps } from '../../model/types'
import styles from './ProjectRolesSection.module.scss'
const ProjectRolesSection = ({
  selectedRoles,
  rolePickerIsOpen,
  onRolePickerToggle,
  onRoleToggle,
}: ProjectRolesSectionProps) => {
  const availableRoles = PROJECT_ROLE_OPTIONS.filter(
    projectRole => !selectedRoles.includes(projectRole)
  )
  return (
    <section className={styles.section}>
      <CreateProjectStepHeading
        eyebrow="Команда"
        title="Кто может понадобиться?"
        subtitle="Мы предложили стартовую команду. Это можно изменить позже."
      />
      <div className={styles.rolesBlock}>
        <div className={styles.roleTokens} aria-label="Выбранные роли">
          {selectedRoles.map(projectRole => (
            <button
              className={styles.roleToken}
              key={projectRole}
              type="button"
              onClick={() => onRoleToggle(projectRole)}
            >
              {PROJECT_ROLE_LABELS[projectRole]}
              <X aria-hidden="true" />
            </button>
          ))}
        </div>
        <button className={styles.addRoleButton} type="button" onClick={onRolePickerToggle}>
          <Plus aria-hidden="true" />
          Добавить роль
        </button>
        {rolePickerIsOpen ? (
          <div className={styles.rolePicker}>
            {availableRoles.length > 0 ? (
              availableRoles.map(projectRole => (
                <button
                  className={styles.roleChoice}
                  key={projectRole}
                  type="button"
                  onClick={() => onRoleToggle(projectRole)}
                >
                  {PROJECT_ROLE_LABELS[projectRole]}
                </button>
              ))
            ) : (
              <p className={styles.emptyText}>Все роли уже добавлены.</p>
            )}
          </div>
        ) : null}
      </div>
    </section>
  )
}
export { ProjectRolesSection }
