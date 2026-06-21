import { ProjectDetailPage } from '@/views/ProjectDetailPage'
import { getProjectStaticParams } from '../model/projectStaticParams'
interface ProjectStagesPageProps {
  params: Promise<{
    id: string
  }>
}
export const generateStaticParams = () => {
  return getProjectStaticParams()
}
const Page = async ({ params }: ProjectStagesPageProps) => {
  const resolvedParams = await params
  return <ProjectDetailPage params={resolvedParams} />
}
export default Page
