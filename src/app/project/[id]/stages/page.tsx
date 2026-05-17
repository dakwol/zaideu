import { ProjectDetailPage } from '@/views/ProjectDetailPage';

import { getProjectStaticParams } from '../model/projectStaticParams';

interface ProjectStagesPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return getProjectStaticParams();
}

export default async function Page({ params }: ProjectStagesPageProps) {
  const resolvedParams = await params;

  return <ProjectDetailPage params={resolvedParams} />;
}