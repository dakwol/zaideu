import { mockProjectTasks } from '@/entities/task/model/mockTasks'
import { ContributionPage } from '@/views/ContributionPage'
interface ContributionRoutePageProps {
  params: Promise<{
    id: string
    taskId: string
  }>
}
export const generateStaticParams = () => {
  return mockProjectTasks.map(projectTask => ({
    id: projectTask.projectId,
    taskId: projectTask.id,
  }))
}
const ContributionRoutePage = async ({ params }: ContributionRoutePageProps) => {
  const resolvedParams = await params
  return <ContributionPage params={resolvedParams} />
}
export default ContributionRoutePage
