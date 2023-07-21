import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { fDate } from '@utils/format-time';

interface IProjectDetails {
  description: string;
  location: string;
  projectManager: string;
  startDate: string | Date;
  endDate: string | Date;
  vendorsCount: number;
}

export const ProjectDetailsCard = ({
  description,
  location,
  projectManager,
  startDate,
  endDate,
  vendorsCount,
}: IProjectDetails) => (
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
          <Typography>{projectManager}</Typography>
          <Typography variant="body2">Project Manager</Typography>
        </Grid>

        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="body2">{vendorsCount}</Typography>
          <Typography variant="body2">Vendors</Typography>
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
          <Typography variant="body2">{fDate(startDate)}</Typography>
          <Typography variant="body2">Start Date</Typography>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="body2">{fDate(endDate)}</Typography>
          <Typography variant="body2">End Date</Typography>
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
          <Typography>{description}</Typography>
        </Grid>
      </Stack>
    </CardContent>
  </Card>
);
