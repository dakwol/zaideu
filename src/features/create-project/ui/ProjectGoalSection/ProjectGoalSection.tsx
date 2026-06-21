import { classNames } from '@/shared/lib/utils'
import { CREATE_PROJECT_RESULT_OPTIONS } from '../../model/constants'
import { CreateProjectStepHeading } from '../CreateProjectStepHeading'
import type { ProjectGoalSectionProps } from '../../model/types'
import styles from './ProjectGoalSection.module.scss'
const ProjectGoalSection = ({ firstResult, onFirstResultChange }: ProjectGoalSectionProps) => {
  return (
    <section className={styles.section}>
      <CreateProjectStepHeading
        eyebrow="Первый результат"
        title="Какой первый результат хотите получить?"
        subtitle="Это поможет подобрать роли и стартовые задачи."
      />
      <div className={styles.optionsGrid}>
        {CREATE_PROJECT_RESULT_OPTIONS.map(resultOption => {
          const optionIsSelected = firstResult === resultOption.value
          return (
            <button
              className={classNames(
                styles.optionCard,
                optionIsSelected && styles.optionCardSelected
              )}
              key={resultOption.value}
              type="button"
              aria-pressed={optionIsSelected}
              onClick={() => onFirstResultChange(resultOption.value)}
            >
              <span className={styles.optionTitle}>{resultOption.title}</span>
              <span className={styles.optionDescription}>{resultOption.description}</span>
            </button>
          )
        })}
      </div>
    </section>
  )
}
export { ProjectGoalSection }
