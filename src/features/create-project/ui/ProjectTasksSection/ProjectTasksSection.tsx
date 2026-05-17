import { PROJECT_TASK_ESTIMATE_OPTIONS } from '@/entities/project/model/constants'
import { ProjectTaskEstimate } from '@/entities/project/model/types'
import { Button } from '@/shared/ui/button'
import { StepHeader } from '@/shared/ui/StepHeader'
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
      <div className={styles.headerRow}>
        <StepHeader
          eyebrow="Стартовые задачи"
          title="Стартовые задачи"
          subtitle="Это первые маленькие шаги. Каждая задача должна занимать от 30 до 120 минут."
        />
        <div className={styles.headerActions}>
          {hasTemplateTaskUpdateAvailable ? (
            <Button
              className={styles.secondaryButton}
              type="button"
              variant="outline"
              onClick={onTemplateTasksApply}
            >
              Обновить задачи по шаблону
            </Button>
          ) : null}
          <Button
            className={styles.secondaryButton}
            type="button"
            variant="outline"
            onClick={onTasksRegenerate}
          >
            Сгенерировать заново
          </Button>
        </div>
      </div>

      <div className={styles.tasksList}>
        {tasks.map((projectTask, taskIndex) => (
          <article className={styles.taskRow} key={projectTask.id}>
            <div className={styles.taskNumber}>{taskIndex + 1}</div>
            <label className={styles.taskTitleField}>
              <span className={styles.fieldLabel}>Задача</span>
              <input
                className={styles.input}
                value={projectTask.title}
                onChange={(event) =>
                  onTaskTitleChange(projectTask.id, event.target.value)
                }
              />
            </label>
            <label className={styles.estimateField}>
              <span className={styles.fieldLabel}>Оценка</span>
              <select
                className={styles.select}
                value={projectTask.estimateMinutes}
                onChange={(event) =>
                  handleTaskEstimateChange(projectTask.id, event.target.value)
                }
              >
                {PROJECT_TASK_ESTIMATE_OPTIONS.map((taskEstimateMinutes) => (
                  <option
                    key={taskEstimateMinutes}
                    value={taskEstimateMinutes}
                  >
                    {taskEstimateMinutes} мин
                  </option>
                ))}
              </select>
            </label>
            <button
              className={styles.deleteButton}
              type="button"
              onClick={() => onTaskDelete(projectTask.id)}
            >
              Удалить
            </button>
          </article>
        ))}
      </div>

      <Button
        className={styles.addButton}
        type="button"
        variant="outline"
        onClick={onTaskAdd}
      >
        Добавить задачу
      </Button>
    </section>
  )
}

export { ProjectTasksSection }
