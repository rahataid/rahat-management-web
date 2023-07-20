import ProjectsService from '@services/projects';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { IProjectApiFilters, ProjectsListHookReturn } from 'src/types/project';

export function useProjects(params?: IProjectApiFilters): ProjectsListHookReturn {
  const { data, isLoading, error } = useQuery(['projects', params], async () => {
    const res = await ProjectsService.list(params);
    return res;
  });

  const projects = useMemo(() => data?.data?.rows || [], [data?.data?.rows]);
  const meta = useMemo(() => data?.data?.meta || {}, [data?.data?.meta]);

  return {
    // TEMP for stage
    // projects: ProjectList,
    projects,
    loading: isLoading,
    error,
    meta,
  };
}
