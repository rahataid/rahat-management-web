// list cards

import { Grid } from '@mui/material';
import { paths } from '@routes/paths';
import { useRouter } from 'next/navigation';
import { useProjects } from 'src/api/project';
import ProjectCard from './project-card-item';

const ProjectCards = () => {
  const { projects } = useProjects();
  const router = useRouter();

  const onProjectView = (contractAddress: string) => {
    router.push(paths.dashboard.general.projects.details(contractAddress));
  };

  const onProjectEdit = (contractAddress: string) => {
    router.push(paths.dashboard.general.projects.edit(contractAddress));
  };

  return (
    <Grid container spacing={1}>
      {projects.map((project) => (
        <Grid item xs={12} md={4} mt={3}>
          <ProjectCard
            onView={onProjectView}
            onEdit={onProjectEdit}
            onDelete={() => {}}
            key={project.id}
            project={project}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default ProjectCards;
