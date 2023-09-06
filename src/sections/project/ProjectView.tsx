'use client';

import CustomBreadcrumbs from '@components/custom-breadcrumbs/custom-breadcrumbs';
import Iconify from '@components/iconify/iconify';
import { useSettingsContext } from '@components/settings';
import { Button, Container, Stack } from '@mui/material';
import { paths } from '@routes/paths';
import { useSnackbar } from 'notistack';
import useAuthStore from 'src/store/auths';
import ProjectCards from './project-cards';

const ProjectView = () => {
  const settings = useSettingsContext();
  const roles = useAuthStore((state) => state.role);
  const notistick = useSnackbar();
  const onProjectAddTemp = () => {
    notistick.enqueueSnackbar('Please contact admin to create a new project.', {
      variant: 'warning',
    });
  };

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <CustomBreadcrumbs
        heading="Projects: List"
        links={[{ name: 'Dashboard', href: paths.dashboard.root }, { name: 'List' }]}
        sx={{
          mb: { xs: 3, md: 5 },
        }}
        action={
          roles.isAdmin && (
            <Button
              // component={RouterLink}
              onClick={onProjectAddTemp}
              // href={paths.dashboard.general.projects.add}
              variant="outlined"
              startIcon={<Iconify icon="mingcute:add-line" />}
              color="success"
            >
              Add Project
            </Button>
          )
        }
      />

      <Stack direction="row" spacing={3} mt={3}>
        <ProjectCards />
      </Stack>
    </Container>
  );
};

export default ProjectView;
