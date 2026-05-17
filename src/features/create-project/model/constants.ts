import { ProjectTaskEstimate } from '@/entities/project/model/types'

export const CREATE_PROJECT_NEXT_ACTION =
  'Взять первую задачу из этапа Foundation.'

export const CREATE_PROJECT_VALIDATION_MESSAGES = {
  missingTitle: 'Добавьте название проекта.',
  missingDescription: 'Опишите идею коротко.',
  missingRoles: 'Выберите хотя бы одну роль.',
  missingTasks: 'Добавьте хотя бы одну стартовую задачу.',
  missingTaskTitle: 'Заполните названия всех стартовых задач.',
}

export const NEW_TASK_TEMPLATE = {
  title: 'Новая маленькая задача',
  estimateMinutes: ProjectTaskEstimate.SixtyMinutes,
}
