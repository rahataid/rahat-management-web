'use client';

import { useSettingsContext } from '@components/settings';
import { useTheme } from '@emotion/react';
import { Button, Container, Stack, Typography } from '@mui/material';
import Grid from '@mui/system/Unstable_Grid/Grid';
import { RouterLink } from '@routes/components';
import { paths } from '@routes/paths';
import ProjectCards from './project-cards';

const ProjectView = () => {
  const theme = useTheme();
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <Grid container>
        <Grid xs={10}>
          <Typography variant="h4">Project</Typography>
        </Grid>
        <Grid xs={2}>
          <Button
            color="success"
            variant="outlined"
            component={RouterLink}
            href={paths.dashboard.general.projects.add}
          >
            Add Project
          </Button>
        </Grid>
      </Grid>
      <Stack direction="row" spacing={3} mt={3}>
        <ProjectCards />
      </Stack>
    </Container>
  );
};

export default ProjectView;
