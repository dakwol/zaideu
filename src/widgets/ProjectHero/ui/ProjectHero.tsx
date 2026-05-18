import { AvatarStack } from '@/shared/ui/avatar-stack'
import { ProgressBar } from '@/shared/ui/progress-bar'
import { StatusBadge } from '@/shared/ui/status-badge'
import type { ProjectStatus } from '@/shared/lib/types'
import type { ProjectHeroProps } from '../model/types'
import styles from './ProjectHero.module.scss'

const projectHealthCopy: Record<
  ProjectStatus,
  { title: string; description: string }
> = {
  active: {
    title: 'Проект активен',
    description: 'Последнее обновление 2 часа назад',
  },
  slow: {
    title: 'Проект замедляется',
    description: 'Нет активности 5 дней',
  },
  stalled: {
    title: 'Проект рискует остановиться',
    description: 'Нет активности 12 дней',
  },
  revival: {
    title: 'Проект возвращается в движение',
    description: 'Команда ищет короткие следующие шаги',
  },
  completed: {
    title: 'Проект завершён',
    description: 'Основной результат уже достигнут',
  },
  archived: {
    title: 'Проект в архиве',
    description: 'Движение временно остановлено',
  },
}

function ProjectHero({ project }: ProjectHeroProps) {
  const healthCopy = projectHealthCopy[project.status]

  return (
    <section className={styles.hero}>
      <div className={styles.copy}>
        <div className={styles.titleRow}>
          <h1>{project.title}</h1>
          <StatusBadge status={project.status} />
        </div>
        <p>{project.description}</p>
        <div className={styles.tags}>
          {project.techStack.map((techStackItem) => (
            <span key={techStackItem}>{techStackItem}</span>
          ))}
        </div>
        <div className={styles.teamRow}>
          <AvatarStack users={project.participants} size="sm" />
          <span>{project.participants.length} участника уже двигают проект</span>
        </div>
      </div>

      <aside className={styles.progressCard}>
        <div>
          <div className={styles.progressHeader}>
            <span>Прогресс</span>
            <strong>{project.progress}%</strong>
          </div>
          <ProgressBar value={project.progress} size="md" />
        </div>
        <div className={styles.progressRow}>
          <span>Текущий этап</span>
          <strong>
            Foundation ({project.currentStage}/{project.totalStages})
          </strong>
        </div>
        <div className={styles.progressRow}>
          <span>Задачи</span>
          <strong>
            {project.completedTasks}/{project.totalTasks}
          </strong>
        </div>
        <div className={styles.healthBlock}>
          <h2>{healthCopy.title}</h2>
          <p>{healthCopy.description}</p>
          {project.overdueTasks > 0 ? (
            <span>{project.overdueTasks} задачи зависли</span>
          ) : null}
        </div>
      </aside>
    </section>
  )
}

export { ProjectHero }
