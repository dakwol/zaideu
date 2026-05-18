import { Pencil, Plus, RefreshCw, Trash2 } from 'lucide-react'

import { PROJECT_TASK_ESTIMATE_OPTIONS } from '@/entities/project/model/constants'
import { ProjectTaskEstimate } from '@/entities/project/model/types'
import { getTaskImportanceDescription } from '@/features/create-project/lib/getTaskImportanceDescription'
import { Button } from '@/shared/ui/button'
import { CreateProjectStepHeading } from '../CreateProjectStepHeading'
import type { ProjectTasksSectionProps } from '../../model/types'
import styles from './ProjectTasksSection.module.scss'

function ProjectTasksSection({
  tasks,
  hasTemplateTaskUpdateAvailable,
  onTaskTitleChange,
  onTaskEstimateChange,
  onTaskDelete,
  onTaskAdd,
  onTasksRegenerate,
  onTemplateTasksApply,
}: ProjectTasksSectionProps) {
  function handleTaskEstimateChange(taskId: string, nextEstimate: string) {
    onTaskEstimateChange(taskId, Number(nextEstimate) as ProjectTaskEstimate)
  }

  return (
    <section className={styles.section}>
      <CreateProjectStepHeading
        eyebrow="Стартовые задачи"
        title="С чего можно начать уже сегодня"
        subtitle="Мы подготовили маленькие задачи, чтобы проект сразу начал двигаться."
      />
      <div className={styles.headerActions}>
        {hasTemplateTaskUpdateAvailable ? (
          <Button
            className={styles.actionButton}
            type="button"
            variant="outline"
            onClick={onTemplateTasksApply}
          >
            <RefreshCw aria-hidden="true" />
            Обновить по типу проекта
          </Button>
        ) : null}
        <Button
          className={styles.actionButton}
          type="button"
          variant="outline"
          onClick={onTasksRegenerate}
        >
          <RefreshCw aria-hidden="true" />
          Сгенерировать заново
        </Button>
      </div>

      <div className={styles.tasksList}>
        {tasks.map((projectTask) => (
          <article className={styles.taskCard} key={projectTask.id}>
            <div className={styles.taskTopline}>
              <Pencil aria-hidden="true" />
              <select
                className={styles.estimateSelect}
                value={projectTask.estimateMinutes}
                aria-label="Оценка задачи"
                onChange={(event) =>
                  handleTaskEstimateChange(projectTask.id, event.target.value)
                }
              >
                {PROJECT_TASK_ESTIMATE_OPTIONS.map((taskEstimateMinutes) => (
                  <option
                    key={taskEstimateMinutes}
                    value={taskEstimateMinutes}
                  >
                    {taskEstimateMinutes} минут
                  </option>
                ))}
              </select>
              <Button
                className={styles.deleteButton}
                type="button"
                variant="ghost"
                size="icon-sm"
                aria-label="Удалить задачу"
                onClick={() => onTaskDelete(projectTask.id)}
              >
                <Trash2 aria-hidden="true" />
              </Button>
            </div>
            <input
              className={styles.taskTitleInput}
              value={projectTask.title}
              aria-label="Название задачи"
              onChange={(event) =>
                onTaskTitleChange(projectTask.id, event.target.value)
              }
            />
            <p className={styles.taskReason}>
              {getTaskImportanceDescription(projectTask.title)}
            </p>
          </article>
        ))}
      </div>

      <Button
        className={styles.addButton}
        type="button"
        variant="outline"
        onClick={onTaskAdd}
      >
        <Plus aria-hidden="true" />
        Добавить задачу
      </Button>
    </section>
  )
}

export { ProjectTasksSection }
