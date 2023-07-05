import { useMemo } from 'react';
import { projectsList } from 'src/_mock/_project';

export function useGetProjects() {
  const memoizedValue = useMemo(
    () => ({
      projects: projectsList,
      projectsLoading: false,
      projectsError: null,
      projectsValidating: false,
      projectsEmpty: false,
    }),
    []
  );

  return memoizedValue;
}
