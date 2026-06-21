import { Button } from '@/shared/ui/button'
import type { ProjectRecoveryBlockProps } from '../model/types'
import styles from './ProjectRecoveryBlock.module.scss'
const ProjectRecoveryBlock = ({ project }: ProjectRecoveryBlockProps) => {
  if (project.status !== 'slow' && project.status !== 'stalled') {
    return null
  }
  return (
    <section className={styles.block}>
      <h2>Проекту нужна помощь</h2>
      <p>
        Проекты часто замедляются на этом этапе. Это нормально. Можно сделать небольшой шаг, чтобы
        вернуть движение.
      </p>
      <div className={styles.actions}>
        <Button size="sm">Взять задачу на 30 минут</Button>
        <Button size="sm" variant="outline">
          Упростить текущий этап
        </Button>
        <Button size="sm" variant="outline">
          Помочь с зависшей задачей
        </Button>
      </div>
    </section>
  )
}
export { ProjectRecoveryBlock }
