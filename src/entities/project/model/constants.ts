import {
  ProjectFirstResult,
  ProjectRole,
  ProjectTaskEstimate,
  ProjectType,
  type ProjectStage,
} from './types'

export const PROJECT_TYPE_LABELS: Record<ProjectType, string> = {
  [ProjectType.WebApp]: 'Веб-приложение',
  [ProjectType.MobileApp]: 'Мобильное приложение',
  [ProjectType.ApiService]: 'API / backend-сервис',
  [ProjectType.AiTool]: 'AI-инструмент',
  [ProjectType.BrowserExtension]: 'Расширение для браузера',
  [ProjectType.Landing]: 'Лендинг',
  [ProjectType.Other]: 'Другое',
}

export const PROJECT_FIRST_RESULT_LABELS: Record<ProjectFirstResult, string> = {
  [ProjectFirstResult.WorkingPrototype]: 'Рабочий прототип',
  [ProjectFirstResult.Mvp]: 'MVP',
  [ProjectFirstResult.Demo]: 'Демо-версия',
  [ProjectFirstResult.Landing]: 'Лендинг',
  [ProjectFirstResult.OpenSourceTool]: 'Open source tool',
  [ProjectFirstResult.NotSure]: 'Пока не знаю',
}

export const PROJECT_ROLE_LABELS: Record<ProjectRole, string> = {
  [ProjectRole.FrontendDeveloper]: 'Frontend Developer',
  [ProjectRole.BackendDeveloper]: 'Backend Developer',
  [ProjectRole.FullstackDeveloper]: 'Fullstack Developer',
  [ProjectRole.Designer]: 'Designer',
  [ProjectRole.ProductManager]: 'Product Manager',
  [ProjectRole.QaEngineer]: 'QA Engineer',
  [ProjectRole.DevopsEngineer]: 'DevOps Engineer',
}

export const PROJECT_TYPE_OPTIONS = Object.values(ProjectType)

export const PROJECT_FIRST_RESULT_OPTIONS = Object.values(ProjectFirstResult)

export const PROJECT_ROLE_OPTIONS = Object.values(ProjectRole)

export const PROJECT_TASK_ESTIMATE_OPTIONS = Object.values(ProjectTaskEstimate).filter(
  (taskEstimateValue): taskEstimateValue is ProjectTaskEstimate =>
    typeof taskEstimateValue === 'number'
)

export const FOUNDATION_STAGE: ProjectStage = {
  title: 'Foundation',
  goal: 'Подготовить основу проекта и сделать первый видимый результат.',
  duration: '7 дней',
}
