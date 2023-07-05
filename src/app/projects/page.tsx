import { useGetProjects } from 'src/api/project';

function Projects(): JSX.Element {
  const { projects } = useGetProjects();
  return <div>{JSON.stringify(projects)}</div>;
}

export default Projects;
