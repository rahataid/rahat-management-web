import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';

export const ProjectDetailsCard = () => (
    <Card>
      <CardContent>
        <Stack
          sx={{ p: 2 }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={5}
        >
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography>Rumee Singh</Typography>
            <Typography variant="body2">Project Manager</Typography>
          </Grid>

          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="body2">12-Jul-2023</Typography>
            <Typography variant="body2">Created At</Typography>
          </Grid>
        </Stack>
        <Stack
          sx={{ p: 2 }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={5}
        >
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography>Location</Typography>
          </Grid>

          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="body2">Jaleshwor</Typography>
          </Grid>
        </Stack>
        <Stack
          sx={{ p: 2 }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={5}
        >
          <Grid container direction="column" justifyContent="center" alignItems="center">
            <Typography>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Enim nulla, odio natus
              similique minus voluptatum corrupti ducimus suscipit quae animi{' '}
            </Typography>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
