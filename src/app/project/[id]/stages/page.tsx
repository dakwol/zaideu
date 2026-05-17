import { ProjectStagesPage } from '@/views/ProjectStagesPage'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params

  return <ProjectStagesPage params={resolvedParams} />
}
