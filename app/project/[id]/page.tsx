import ProjectPage from '@/features/project-detail/page'

export default function Page({ params }: { params: { id: string } }) {
  return <ProjectPage params={params} />
}
