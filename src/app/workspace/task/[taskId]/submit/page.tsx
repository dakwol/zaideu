import { mockProjectTasks } from '@/entities/task/model/mockTasks'
import { SubmitTaskPage } from '@/views/SubmitTaskPage'

interface SubmitTaskRoutePageProps {
  params: Promise<{
    taskId: string
  }>
}

export function generateStaticParams() {
  return mockProjectTasks.map((projectTask) => ({
    taskId: projectTask.id,
  }))
}

export default async function SubmitTaskRoutePage({
  params,
}: SubmitTaskRoutePageProps) {
  const resolvedParams = await params

  return <SubmitTaskPage params={resolvedParams} />
}
