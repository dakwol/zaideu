import { mockProjectTasks } from '@/entities/task/model/mockTasks'
import { SubmitTaskPage } from '@/views/SubmitTaskPage'
interface SubmitTaskRoutePageProps {
  params: Promise<{
    taskId: string
  }>
}
export const generateStaticParams = () => {
  return mockProjectTasks.map(projectTask => ({
    taskId: projectTask.id,
  }))
}
const SubmitTaskRoutePage = async ({ params }: SubmitTaskRoutePageProps) => {
  const resolvedParams = await params
  return <SubmitTaskPage params={resolvedParams} />
}
export default SubmitTaskRoutePage
