import { FOUNDATION_STAGE } from '@/entities/project/model/constants'
import { CreateProjectStepHeading } from '../CreateProjectStepHeading'
import type { ProjectStageSectionProps } from '../../model/types'
import styles from './ProjectStageSection.module.scss'

function ProjectStageSection({ taskCount }: ProjectStageSectionProps) {
  return (
    <section className={styles.section}>
      <CreateProjectStepHeading
        eyebrow="Первый этап"
        title="Мы подготовили первый этап"
        subtitle="Короткий этап помогает быстрее начать и не потерять фокус."
      />
      <article className={styles.stageCard}>
        <div className={styles.stageHeader}>
          <span className={styles.stageLabel}>Milestone</span>
          <h3 className={styles.stageTitle}>{FOUNDATION_STAGE.title}</h3>
        </div>
        <p className={styles.stageText}>{FOUNDATION_STAGE.goal}</p>
        <div className={styles.stageStats}>
          <span>{FOUNDATION_STAGE.duration}</span>
          <span>{taskCount} задач</span>
        </div>
      </article>
    </section>
  )
}

export { ProjectStageSection }
