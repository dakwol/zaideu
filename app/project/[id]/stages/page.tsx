import StagesPage from '@/features/project-stages/page'

export default function Page({ params }: { params: { id: string } }) {
  return <StagesPage params={params} />
}
