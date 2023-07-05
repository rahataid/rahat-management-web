import { useGetProjects } from 'src/api/project';

export const metadata = {
  title: 'Dashboard: Projects',
};

function Projects(): JSX.Element {
  const { projects } = useGetProjects();
  return <div>{JSON.stringify(projects)}</div>;
}

export default Projects;
