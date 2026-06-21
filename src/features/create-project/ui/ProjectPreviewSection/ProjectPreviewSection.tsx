import { PROJECT_ROLE_LABELS } from '@/entities/project/model/constants'
import { CreateProjectStepHeading } from '../CreateProjectStepHeading'
import type { ProjectPreviewSectionProps } from '../../model/types'
import styles from './ProjectPreviewSection.module.scss'
const ProjectPreviewSection = ({ projectPreview }: ProjectPreviewSectionProps) => {
  return (
    <section className={styles.section}>
      <CreateProjectStepHeading
        eyebrow="Проверка"
        title="Проект готов к старту"
        subtitle="Проверьте первый шаг перед публикацией."
      />

      <div className={styles.reviewCard}>
        <div className={styles.reviewRow}>
          <span>Название</span>
          <strong>{projectPreview.title || 'Название пока не добавлено'}</strong>
        </div>
        <div className={styles.reviewRow}>
          <span>Роли</span>
          <strong>
            {projectPreview.roles.map(projectRole => PROJECT_ROLE_LABELS[projectRole]).join(', ') ||
              'Роли пока не выбраны'}
          </strong>
        </div>
        <div className={styles.reviewRow}>
          <span>Первый этап</span>
          <strong>
            {projectPreview.firstStage.title}, {projectPreview.firstStage.duration}
          </strong>
        </div>
        <div className={styles.reviewRow}>
          <span>Задачи</span>
          <strong>{projectPreview.tasks.length} стартовых задач</strong>
        </div>
      </div>
      <p className={styles.reviewMessage}>
        Теперь люди смогут подключиться и начать движение по проекту.
      </p>
    </section>
  )
}
export { ProjectPreviewSection }
