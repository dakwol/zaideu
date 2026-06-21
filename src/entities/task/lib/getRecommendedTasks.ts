import { ProjectTaskStatus, type ProjectTask } from '../model/types'
const getRecommendedTasks = (tasks: ProjectTask[]): ProjectTask[] => {
  const taskPriorityByStatus: Record<ProjectTaskStatus, number> = {
    [ProjectTaskStatus.Available]: 1,
    [ProjectTaskStatus.InProgress]: 2,
    [ProjectTaskStatus.InReview]: 3,
    [ProjectTaskStatus.Done]: 4,
  }
  return [...tasks]
    .sort(
      (firstTask, secondTask) =>
        taskPriorityByStatus[firstTask.status] - taskPriorityByStatus[secondTask.status]
    )
    .slice(0, 3)
}
export { getRecommendedTasks }
