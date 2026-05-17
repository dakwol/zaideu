import {
  PROJECT_FIRST_RESULT_LABELS,
  PROJECT_ROLE_LABELS,
  PROJECT_TYPE_LABELS,
} from '@/entities/project/model/constants'
import { Button } from '@/shared/ui/button'
import { StepHeader } from '@/shared/ui/StepHeader'
import type { ProjectPreviewSectionProps } from '../../model/types'
import styles from './ProjectPreviewSection.module.scss'

function ProjectPreviewSection({
  projectPreview,
  validationMessages,
  onProjectCreate,
}: ProjectPreviewSectionProps) {
  return (
    <section className={styles.section}>
      <StepHeader
        eyebrow="Preview"
        title="Проверьте проект перед публикацией"
        subtitle="Мы подготовили первый шаг. Проверьте и измените, если нужно."
      />

      {validationMessages.length > 0 ? (
        <div className={styles.validationBox} role="alert">
          {validationMessages.map((validationMessage) => (
            <p key={validationMessage}>{validationMessage}</p>
          ))}
        </div>
      ) : null}

      <div className={styles.previewGrid}>
        <article className={styles.previewCard}>
          <p className={styles.previewLabel}>Название</p>
          <p className={styles.previewValue}>
            {projectPreview.title || 'Название пока не добавлено'}
          </p>
        </article>
        <article className={styles.previewCard}>
          <p className={styles.previewLabel}>Описание</p>
          <p className={styles.previewValue}>
            {projectPreview.description || 'Описание пока не добавлено'}
          </p>
        </article>
        <article className={styles.previewCard}>
          <p className={styles.previewLabel}>Тип проекта</p>
          <p className={styles.previewValue}>
            {PROJECT_TYPE_LABELS[projectPreview.projectType]}
          </p>
        </article>
        <article className={styles.previewCard}>
          <p className={styles.previewLabel}>Первый результат</p>
          <p className={styles.previewValue}>
            {PROJECT_FIRST_RESULT_LABELS[projectPreview.firstResult]}
          </p>
        </article>
        <article className={styles.previewCard}>
          <p className={styles.previewLabel}>Роли</p>
          <div className={styles.tags}>
            {projectPreview.roles.map((projectRole) => (
              <span key={projectRole}>{PROJECT_ROLE_LABELS[projectRole]}</span>
            ))}
          </div>
        </article>
        <article className={styles.previewCard}>
          <p className={styles.previewLabel}>Первый этап</p>
          <p className={styles.previewValue}>
            {projectPreview.firstStage.title} · {projectPreview.firstStage.duration}
          </p>
          <p className={styles.previewDescription}>
            {projectPreview.firstStage.goal}
          </p>
        </article>
      </div>

      <article className={styles.tasksCard}>
        <p className={styles.previewLabel}>Стартовые задачи</p>
        <div className={styles.taskList}>
          {projectPreview.tasks.map((projectTask) => (
            <div className={styles.taskItem} key={projectTask.id}>
              <span>{projectTask.title || 'Без названия'}</span>
              <strong>{projectTask.estimateMinutes} мин</strong>
            </div>
          ))}
        </div>
      </article>

      <Button
        className={styles.createButton}
        type="button"
        onClick={onProjectCreate}
      >
        Создать проект
      </Button>
    </section>
  )
}

export { ProjectPreviewSection }
