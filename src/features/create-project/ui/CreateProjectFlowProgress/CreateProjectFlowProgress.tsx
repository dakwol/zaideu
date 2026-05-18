import { cn } from '@/shared/lib/utils'
import { CREATE_PROJECT_FLOW_STEPS } from '../../model/constants'
import type { CreateProjectFlowProgressProps } from '../../model/types'
import styles from './CreateProjectFlowProgress.module.scss'

function CreateProjectFlowProgress({
  activeStepIndex,
}: CreateProjectFlowProgressProps) {
  return (
    <div className={styles.progressBlock}>
      <div className={styles.progressMeta}>
        <span>
          Шаг {activeStepIndex + 1} из {CREATE_PROJECT_FLOW_STEPS.length}
        </span>
        <span>Давайте превратим идею в первый шаг</span>
      </div>
      <ol className={styles.progressList} aria-label="Шаги создания проекта">
        {CREATE_PROJECT_FLOW_STEPS.map((flowStep, stepIndex) => (
          <li
            className={cn(
              styles.progressItem,
              stepIndex < activeStepIndex && styles.progressItemDone,
              stepIndex === activeStepIndex && styles.progressItemActive,
            )}
            key={flowStep.id}
          >
            {flowStep.label}
          </li>
        ))}
      </ol>
    </div>
  )
}

export { CreateProjectFlowProgress }
