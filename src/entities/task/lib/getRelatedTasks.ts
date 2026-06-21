import { ProjectTaskStatus, type ProjectTask } from '../model/types'
const getRelatedTasks = (tasks: ProjectTask[], currentTask: ProjectTask): ProjectTask[] => {
  return tasks
    .filter(
      projectTask =>
        projectTask.id !== currentTask.id && projectTask.status === ProjectTaskStatus.Available
    )
    .slice(0, 3)
}
export { getRelatedTasks }
