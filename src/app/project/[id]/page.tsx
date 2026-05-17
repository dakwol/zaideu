import { ProjectDetailPage } from '@/views/ProjectDetailPage'

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = await params

  return <ProjectDetailPage params={resolvedParams} />
}
