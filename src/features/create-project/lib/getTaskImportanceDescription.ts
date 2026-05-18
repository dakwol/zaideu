import { TASK_IMPORTANCE_DESCRIPTIONS } from '../model/constants'

function getTaskImportanceDescription(taskTitle: string): string {
  const normalizedTaskTitle = taskTitle.trim()

  return (
    TASK_IMPORTANCE_DESCRIPTIONS[normalizedTaskTitle] ??
    'Эта задача помогает сделать следующий шаг маленьким и понятным.'
  )
}

export { getTaskImportanceDescription }
