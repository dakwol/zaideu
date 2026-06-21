import { ProjectTaskStatus } from '../model/types'
const projectTaskStatusLabels: Record<ProjectTaskStatus, string> = {
  [ProjectTaskStatus.Available]: 'Можно взять',
  [ProjectTaskStatus.InProgress]: 'В работе',
  [ProjectTaskStatus.InReview]: 'На проверке',
  [ProjectTaskStatus.Done]: 'Готово',
}
const formatTaskStatus = (projectTaskStatus: ProjectTaskStatus): string => {
  return projectTaskStatusLabels[projectTaskStatus]
}
export { formatTaskStatus }
