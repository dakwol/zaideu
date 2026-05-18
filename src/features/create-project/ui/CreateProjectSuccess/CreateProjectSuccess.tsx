import { Button } from '@/shared/ui/button'
import { AppHeader } from '@/widgets/AppHeader'
import type { CreateProjectSuccessProps } from '../../model/types'
import styles from './CreateProjectSuccess.module.scss'

function CreateProjectSuccess({ createdProject }: CreateProjectSuccessProps) {
  function handleTakeFirstTaskClick() {
    console.log('take first task', createdProject.tasks[0] ?? null)
  }

  function handleOpenProjectClick() {
    console.log('open project', createdProject)
  }

  function handleShareProjectClick() {
    console.log('share project', createdProject.title)
  }

  return (
    <div className={styles.screen}>
      <AppHeader />
      <main className={styles.main}>
        <section className={styles.card}>
          <div className={styles.copy}>
            <p className={styles.eyebrow}>готово</p>
            <h1 className={styles.title}>Проект создан</h1>
            <p className={styles.subtitle}>
              Мы подготовили первый этап и стартовые задачи. Теперь можно начать
              движение.
            </p>
          </div>
          <div className={styles.nextBlock}>
            <h2>Первый шаг уже готов</h2>
            <p>{createdProject.nextAction}</p>
          </div>
          <div className={styles.actions}>
            <Button
              className={styles.primaryButton}
              type="button"
              onClick={handleTakeFirstTaskClick}
            >
              Взять первую задачу
            </Button>
            <Button
              className={styles.secondaryButton}
              type="button"
              variant="outline"
              onClick={handleOpenProjectClick}
            >
              Открыть проект
            </Button>
            <Button
              className={styles.tertiaryButton}
              type="button"
              variant="ghost"
              onClick={handleShareProjectClick}
            >
              Поделиться проектом
            </Button>
          </div>
        </section>
      </main>
    </div>
  )
}

export { CreateProjectSuccess }
