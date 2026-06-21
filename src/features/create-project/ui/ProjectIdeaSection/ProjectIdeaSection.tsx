import { PROJECT_TYPE_LABELS, PROJECT_TYPE_OPTIONS } from '@/entities/project/model/constants'
import { ProjectType } from '@/entities/project/model/types'
import { CreateProjectStepHeading } from '../CreateProjectStepHeading'
import type { ProjectIdeaSectionProps } from '../../model/types'
import styles from './ProjectIdeaSection.module.scss'
const ProjectIdeaSection = ({
  title,
  description,
  projectType,
  onTitleChange,
  onDescriptionChange,
  onProjectTypeChange,
}: ProjectIdeaSectionProps) => {
  const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onTitleChange(event.target.value)
  }
  const handleDescriptionChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    onDescriptionChange(event.target.value)
  }
  const handleProjectTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    onProjectTypeChange(event.target.value as ProjectType)
  }
  return (
    <section className={styles.section}>
      <CreateProjectStepHeading
        eyebrow="Идея"
        title="Что хотите создать?"
        subtitle="Опишите идею в двух словах. Этого достаточно, чтобы начать."
      />
      <div className={styles.formGrid}>
        <label className={styles.field}>
          <span className={styles.label}>Название проекта</span>
          <input
            className={styles.input}
            id="project-title"
            value={title}
            placeholder="Например, сервис для поиска напарников"
            onChange={handleTitleChange}
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Короткое описание</span>
          <textarea
            className={styles.textarea}
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Что хотите создать и кому это поможет?"
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Тип проекта</span>
          <select className={styles.select} value={projectType} onChange={handleProjectTypeChange}>
            {PROJECT_TYPE_OPTIONS.map(projectTypeOption => (
              <option key={projectTypeOption} value={projectTypeOption}>
                {PROJECT_TYPE_LABELS[projectTypeOption]}
              </option>
            ))}
          </select>
        </label>
      </div>
    </section>
  )
}
export { ProjectIdeaSection }
