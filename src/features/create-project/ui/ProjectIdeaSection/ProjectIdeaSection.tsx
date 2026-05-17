import { PROJECT_TYPE_LABELS, PROJECT_TYPE_OPTIONS } from '@/entities/project/model/constants'
import { ProjectType } from '@/entities/project/model/types'
import { StepHeader } from '@/shared/ui/StepHeader'
import { TextField } from '@/shared/ui/TextField'
import { Textarea } from '@/shared/ui/textarea'
import type { ProjectIdeaSectionProps } from '../../model/types'
import styles from './ProjectIdeaSection.module.scss'

function ProjectIdeaSection({
  title,
  description,
  projectType,
  onTitleChange,
  onDescriptionChange,
  onProjectTypeChange,
}: ProjectIdeaSectionProps) {
  function handleTitleChange(event: React.ChangeEvent<HTMLInputElement>) {
    onTitleChange(event.target.value)
  }

  function handleDescriptionChange(event: React.ChangeEvent<HTMLTextAreaElement>) {
    onDescriptionChange(event.target.value)
  }

  function handleProjectTypeChange(event: React.ChangeEvent<HTMLSelectElement>) {
    onProjectTypeChange(event.target.value as ProjectType)
  }

  return (
    <section className={styles.section}>
      <StepHeader
        eyebrow="Идея"
        title="Расскажите об идее"
        subtitle="Не нужно продумывать всё сразу. Достаточно описать, что вы хотите создать."
      />
      <div className={styles.formGrid}>
        <TextField
          id="project-title"
          label="Название проекта"
          value={title}
          onValueChange={handleTitleChange}
          placeholder="Например, сервис для поиска напарников"
        />
        <label className={styles.field}>
          <span className={styles.label}>Короткое описание</span>
          <Textarea
            className={styles.textarea}
            value={description}
            onChange={handleDescriptionChange}
            placeholder="Что хотите создать и кому это поможет?"
          />
        </label>
        <label className={styles.field}>
          <span className={styles.label}>Тип проекта</span>
          <select
            className={styles.select}
            value={projectType}
            onChange={handleProjectTypeChange}
          >
            {PROJECT_TYPE_OPTIONS.map((projectTypeOption) => (
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
