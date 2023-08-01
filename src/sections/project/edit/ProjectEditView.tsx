'use client';

import CustomBreadcrumbs from '@components/custom-breadcrumbs/custom-breadcrumbs';
import { useSettingsContext } from '@components/settings';
import { Container } from '@mui/material';
import { paths } from '@routes/paths';
import ProjectEditForm from './project-edit-form';

const ProjectEditView = () => {
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Projects: Update"
        links={[
          { name: 'Dashboard', href: paths.dashboard.root },
          { name: 'Projects', href: paths.dashboard.general.projects.list },
          { name: 'Update' },
        ]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
      />
      <ProjectEditForm />
    </Container>
  );
};

export default ProjectEditView;
