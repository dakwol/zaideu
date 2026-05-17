import { ProjectRole, ProjectTaskEstimate, ProjectType, type ProjectTask } from './types'

export const PROJECT_ROLE_TEMPLATES: Record<ProjectType, ProjectRole[]> = {
  [ProjectType.WebApp]: [
    ProjectRole.FrontendDeveloper,
    ProjectRole.BackendDeveloper,
    ProjectRole.Designer,
  ],
  [ProjectType.MobileApp]: [
    ProjectRole.FullstackDeveloper,
    ProjectRole.Designer,
    ProjectRole.QaEngineer,
  ],
  [ProjectType.ApiService]: [
    ProjectRole.BackendDeveloper,
    ProjectRole.DevopsEngineer,
  ],
  [ProjectType.AiTool]: [
    ProjectRole.FullstackDeveloper,
    ProjectRole.BackendDeveloper,
  ],
  [ProjectType.BrowserExtension]: [
    ProjectRole.FrontendDeveloper,
    ProjectRole.Designer,
  ],
  [ProjectType.Landing]: [
    ProjectRole.FrontendDeveloper,
    ProjectRole.Designer,
  ],
  [ProjectType.Other]: [
    ProjectRole.FrontendDeveloper,
    ProjectRole.BackendDeveloper,
  ],
}

export const PROJECT_TASK_TEMPLATES: Record<ProjectType, ProjectTask[]> = {
  [ProjectType.WebApp]: [
    { id: 'web-app-1', title: 'Создать репозиторий', estimateMinutes: ProjectTaskEstimate.ThirtyMinutes },
    { id: 'web-app-2', title: 'Подготовить структуру проекта', estimateMinutes: ProjectTaskEstimate.SixtyMinutes },
    { id: 'web-app-3', title: 'Настроить базовую страницу', estimateMinutes: ProjectTaskEstimate.SixtyMinutes },
    { id: 'web-app-4', title: 'Добавить README с запуском проекта', estimateMinutes: ProjectTaskEstimate.ThirtyMinutes },
  ],
  [ProjectType.Landing]: [
    { id: 'landing-1', title: 'Подготовить структуру лендинга', estimateMinutes: ProjectTaskEstimate.ThirtyMinutes },
    { id: 'landing-2', title: 'Сверстать первый экран', estimateMinutes: ProjectTaskEstimate.SixtyMinutes },
    { id: 'landing-3', title: 'Добавить адаптив для мобильных устройств', estimateMinutes: ProjectTaskEstimate.SixtyMinutes },
    { id: 'landing-4', title: 'Добавить базовые SEO-мета-теги', estimateMinutes: ProjectTaskEstimate.ThirtyMinutes },
  ],
  [ProjectType.ApiService]: [
    { id: 'api-service-1', title: 'Создать репозиторий', estimateMinutes: ProjectTaskEstimate.ThirtyMinutes },
    { id: 'api-service-2', title: "Описать базовые endpoint'ы", estimateMinutes: ProjectTaskEstimate.SixtyMinutes },
    { id: 'api-service-3', title: 'Настроить структуру сервиса', estimateMinutes: ProjectTaskEstimate.SixtyMinutes },
    { id: 'api-service-4', title: 'Добавить README с запуском API', estimateMinutes: ProjectTaskEstimate.ThirtyMinutes },
  ],
  [ProjectType.MobileApp]: [
    { id: 'mobile-app-1', title: 'Создать репозиторий', estimateMinutes: ProjectTaskEstimate.ThirtyMinutes },
    { id: 'mobile-app-2', title: 'Подготовить структуру приложения', estimateMinutes: ProjectTaskEstimate.SixtyMinutes },
    { id: 'mobile-app-3', title: 'Сделать стартовый экран', estimateMinutes: ProjectTaskEstimate.SixtyMinutes },
    { id: 'mobile-app-4', title: 'Добавить README с запуском проекта', estimateMinutes: ProjectTaskEstimate.ThirtyMinutes },
  ],
  [ProjectType.AiTool]: [
    { id: 'ai-tool-1', title: 'Описать первый пользовательский сценарий', estimateMinutes: ProjectTaskEstimate.ThirtyMinutes },
    { id: 'ai-tool-2', title: 'Подготовить структуру проекта', estimateMinutes: ProjectTaskEstimate.SixtyMinutes },
    { id: 'ai-tool-3', title: 'Сделать базовый интерфейс запроса', estimateMinutes: ProjectTaskEstimate.SixtyMinutes },
    { id: 'ai-tool-4', title: 'Добавить README с запуском проекта', estimateMinutes: ProjectTaskEstimate.ThirtyMinutes },
  ],
  [ProjectType.BrowserExtension]: [
    { id: 'browser-extension-1', title: 'Создать репозиторий', estimateMinutes: ProjectTaskEstimate.ThirtyMinutes },
    { id: 'browser-extension-2', title: 'Подготовить manifest', estimateMinutes: ProjectTaskEstimate.SixtyMinutes },
    { id: 'browser-extension-3', title: 'Сделать popup-интерфейс', estimateMinutes: ProjectTaskEstimate.SixtyMinutes },
    { id: 'browser-extension-4', title: 'Добавить README с запуском проекта', estimateMinutes: ProjectTaskEstimate.ThirtyMinutes },
  ],
  [ProjectType.Other]: [
    { id: 'other-1', title: 'Создать репозиторий', estimateMinutes: ProjectTaskEstimate.ThirtyMinutes },
    { id: 'other-2', title: 'Описать первый результат', estimateMinutes: ProjectTaskEstimate.ThirtyMinutes },
    { id: 'other-3', title: 'Подготовить структуру проекта', estimateMinutes: ProjectTaskEstimate.SixtyMinutes },
    { id: 'other-4', title: 'Добавить README с запуском проекта', estimateMinutes: ProjectTaskEstimate.ThirtyMinutes },
  ],
}
