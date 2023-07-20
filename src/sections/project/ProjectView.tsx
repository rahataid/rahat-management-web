'use client';

import CustomBreadcrumbs from '@components/custom-breadcrumbs/custom-breadcrumbs';
import Iconify from '@components/iconify/iconify';
import { useSettingsContext } from '@components/settings';
import { Button, Container, Stack } from '@mui/material';
import { RouterLink } from '@routes/components';
import { paths } from '@routes/paths';
import ProjectCards from './project-cards';

const ProjectView = () => {
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Projects: List"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'List' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
        action={
          <Button
            component={RouterLink}
            href={paths.dashboard.general.projects.add}
            variant="outlined"
            startIcon={<Iconify icon="mingcute:add-line" />}
            color="success"
          >
            Add Project
          </Button>
        }
      />

      <Stack direction="row" spacing={3} mt={3}>
        <ProjectCards />
      </Stack>
    </Container>
  );
};

export default ProjectView;
