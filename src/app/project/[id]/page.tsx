import { ProjectDetailPage } from '@/views/ProjectDetailPage';

import { getProjectStaticParams } from './model/projectStaticParams';

interface ProjectPageProps {
  params: Promise<{
    id: string;
  }>;
}

export function generateStaticParams() {
  return getProjectStaticParams();
}

export default async function Page({ params }: ProjectPageProps) {
  const resolvedParams = await params;

  return <ProjectDetailPage params={resolvedParams} />;
}