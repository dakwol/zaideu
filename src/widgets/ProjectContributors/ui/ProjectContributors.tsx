import { AvatarStack } from '@/shared/ui/avatar-stack'
import type { ProjectContributorsProps } from '../model/types'
import styles from './ProjectContributors.module.scss'

function ProjectContributors({ contributors, tasks }: ProjectContributorsProps) {
  return (
    <section className={styles.section}>
      <div className={styles.heading}>
        <h2>Кто двигает проект</h2>
      </div>
      <div className={styles.list}>
        {contributors.map((contributor) => {
          const currentTask = tasks.find(
            (task) => task.assigneeId === contributor.id,
          )

          return (
            <article className={styles.card} key={contributor.id}>
              <AvatarStack users={[contributor]} size="sm" />
              <div>
                <h3>{contributor.name}</h3>
                <p>{contributor.skills[0] ?? 'Contributor'}</p>
                <span>{contributor.completedTasks} задач завершены</span>
                {currentTask ? (
                  <strong>Сейчас работает над {currentTask.title}</strong>
                ) : null}
              </div>
            </article>
          )
        })}
      </div>
    </section>
  )
}

export { ProjectContributors }
