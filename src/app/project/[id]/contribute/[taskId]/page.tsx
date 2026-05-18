import { mockProjectTasks } from '@/entities/task/model/mockTasks'
import { ContributionPage } from '@/views/ContributionPage'

interface ContributionRoutePageProps {
  params: Promise<{
    id: string
    taskId: string
  }>
}

export function generateStaticParams() {
  return mockProjectTasks.map((projectTask) => ({
    id: projectTask.projectId,
    taskId: projectTask.id,
  }))
}

export default async function ContributionRoutePage({
  params,
}: ContributionRoutePageProps) {
  const resolvedParams = await params

  return <ContributionPage params={resolvedParams} />
}
