export interface ProjectStaticParam {
  id: string;
}

const projectIds: string[] = ['1', '2', '3'];

export const getProjectStaticParams = (): ProjectStaticParam[] => {
  return projectIds.map((projectId) => ({
    id: projectId,
  }));
};