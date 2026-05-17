import { FOUNDATION_STAGE } from '@/entities/project/model/constants'
import { StepHeader } from '@/shared/ui/StepHeader'
import styles from './ProjectStageSection.module.scss'

function ProjectStageSection() {
  return (
    <section className={styles.section}>
      <StepHeader
        eyebrow="Первый этап"
        title="Первый этап проекта"
        subtitle="Короткий этап помогает быстрее начать и не потерять фокус."
      />
      <article className={styles.stageCard}>
        <div>
          <p className={styles.stageLabel}>Название</p>
          <h3 className={styles.stageTitle}>{FOUNDATION_STAGE.title}</h3>
        </div>
        <div>
          <p className={styles.stageLabel}>Цель</p>
          <p className={styles.stageText}>{FOUNDATION_STAGE.goal}</p>
        </div>
        <div>
          <p className={styles.stageLabel}>Длительность</p>
          <p className={styles.stageText}>{FOUNDATION_STAGE.duration}</p>
        </div>
      </article>
      <p className={styles.rule}>Этап не может быть длиннее 7 дней.</p>
    </section>
  )
}

export { ProjectStageSection }
