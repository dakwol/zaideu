import { ProjectTaskStatus, type ProjectTask } from './types'

export const currentUserId = '1'
export const currentUserName = 'Alex Chen'

export const mockProjectTasks: ProjectTask[] = [
  {
    id: '1-task-login-page',
    projectId: '1',
    title: 'Создать login page',
    description:
      'Собрать первый экран входа с email, password, состояниями загрузки и ошибками.',
    role: 'Frontend',
    estimateMinutes: 60,
    status: ProjectTaskStatus.Available,
    dueLabel: 'Сегодня',
    repositoryUrl: 'https://github.com/example/devflow-analytics',
    figmaUrl: 'https://figma.com/file/example/devflow-auth',
  },
  {
    id: '1-task-mobile-auth',
    projectId: '1',
    title: 'Адаптировать auth экран под мобильные',
    description:
      'Проверить форму входа на узких экранах и поправить spacing, чтобы сценарий не ломался.',
    role: 'Frontend',
    estimateMinutes: 45,
    status: ProjectTaskStatus.InProgress,
    assigneeName: 'Мария',
    assigneeId: '2',
    startedAt: new Date(Date.now() - 3600000 * 5).toISOString(),
    dueLabel: 'Завтра',
    repositoryUrl: 'https://github.com/example/devflow-analytics',
    figmaUrl: 'https://figma.com/file/example/devflow-auth',
  },
  {
    id: '1-task-error-states',
    projectId: '1',
    title: 'Добавить состояния ошибок и загрузки',
    description:
      'Показать пользователю понятный ответ, если сеть упала или данные введены неверно.',
    role: 'Frontend',
    estimateMinutes: 30,
    status: ProjectTaskStatus.InReview,
    assigneeName: currentUserName,
    assigneeId: currentUserId,
    startedAt: new Date(Date.now() - 3600000 * 9).toISOString(),
    dueLabel: 'Сегодня',
    repositoryUrl: 'https://github.com/example/devflow-analytics',
    resultUrl: 'https://github.com/example/devflow-analytics/pull/18',
    resultComment: 'Добавил loading, invalid credentials и network error state.',
  },
  {
    id: '1-task-form-validation',
    projectId: '1',
    title: 'Добавить валидацию формы',
    description:
      'Не отправлять пустые поля и сразу показывать, что нужно исправить.',
    role: 'Frontend',
    estimateMinutes: 30,
    status: ProjectTaskStatus.Available,
    dueLabel: 'На этой неделе',
    repositoryUrl: 'https://github.com/example/devflow-analytics',
  },
  {
    id: '2-task-upload-feedback',
    projectId: '2',
    title: 'Показать прогресс загрузки файла',
    description:
      'Добавить понятный прогресс, чтобы пользователь видел, что файл не завис.',
    role: 'Frontend',
    estimateMinutes: 60,
    status: ProjectTaskStatus.Available,
    dueLabel: 'Сегодня',
    repositoryUrl: 'https://github.com/example/cloudsync-storage',
    figmaUrl: 'https://figma.com/file/example/cloudsync-upload',
  },
  {
    id: '2-task-timeout-copy',
    projectId: '2',
    title: 'Уточнить текст ошибки timeout',
    description:
      'Сделать ошибку загрузки понятной и подсказать пользователю следующий шаг.',
    role: 'UX Writer',
    estimateMinutes: 30,
    status: ProjectTaskStatus.InProgress,
    assigneeName: 'Иван',
    assigneeId: '4',
    startedAt: new Date(Date.now() - 3600000 * 2).toISOString(),
    dueLabel: 'Сегодня',
    repositoryUrl: 'https://github.com/example/cloudsync-storage',
  },
  {
    id: '3-task-empty-review',
    projectId: '3',
    title: 'Сделать empty state для code review',
    description:
      'Показать понятный экран, когда у проекта ещё нет проверок кода.',
    role: 'Frontend',
    estimateMinutes: 45,
    status: ProjectTaskStatus.Available,
    dueLabel: 'Завтра',
    repositoryUrl: 'https://github.com/example/ai-code-review',
    figmaUrl: 'https://figma.com/file/example/ai-review',
  },
  {
    id: '3-task-readme-setup',
    projectId: '3',
    title: 'Описать запуск локальной модели',
    description:
      'Добавить README-раздел, чтобы новый участник мог поднять проект без созвона.',
    role: 'Backend',
    estimateMinutes: 60,
    status: ProjectTaskStatus.Available,
    dueLabel: 'На этой неделе',
    repositoryUrl: 'https://github.com/example/ai-code-review',
  },
]
