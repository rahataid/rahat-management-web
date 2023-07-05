import { ProjectView } from '@sections/project';
import { useGetProjects } from 'src/api/project';

function Projects(): JSX.Element {
  const { projects } = useGetProjects();
  return <ProjectView />;
}

export default Projects;
