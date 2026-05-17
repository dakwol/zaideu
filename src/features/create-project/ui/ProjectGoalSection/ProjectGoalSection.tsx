import {
  PROJECT_FIRST_RESULT_LABELS,
  PROJECT_FIRST_RESULT_OPTIONS,
} from '@/entities/project/model/constants'
import { ProjectFirstResult } from '@/entities/project/model/types'
import { CheckboxCard } from '@/shared/ui/CheckboxCard'
import { StepHeader } from '@/shared/ui/StepHeader'
import type { ProjectGoalSectionProps } from '../../model/types'
import styles from './ProjectGoalSection.module.scss'

function ProjectGoalSection({
  firstResult,
  onFirstResultChange,
}: ProjectGoalSectionProps) {
  return (
    <section className={styles.section}>
      <StepHeader
        eyebrow="Первый результат"
        title="Что должно получиться первым?"
        subtitle="Это поможет подобрать роли и стартовые задачи."
      />
      <div className={styles.optionsGrid}>
        {PROJECT_FIRST_RESULT_OPTIONS.map((firstResultOption) => (
          <CheckboxCard
            key={firstResultOption}
            title={PROJECT_FIRST_RESULT_LABELS[firstResultOption]}
            checked={firstResult === firstResultOption}
            onCheckedChange={() =>
              onFirstResultChange(firstResultOption as ProjectFirstResult)
            }
          />
        ))}
      </div>
    </section>
  )
}

export { ProjectGoalSection }
