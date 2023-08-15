import Iconify from '@components/iconify/iconify';
import {
  Card,
  CardContent,
  CardHeader,
  Chip,
  Grid,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { fDate } from '@utils/format-time';

interface IProjectDetails {
  description: string;
  location: string;
  projectManager: string;
  startDate: string | Date;
  endDate: string | Date;
  vendorsCount: number;
  isLocked: boolean;
}

const lockedTip = 'The project has been locked, you can now distribute tokens to the beneficiaries';
const unlockedTip =
  'The project is unlocked, you can now add vendors, beneficiaries and create tokens';

export const ProjectDetailsCard = ({
  description,
  location,
  projectManager,
  startDate,
  endDate,
  vendorsCount,
  isLocked,
}: IProjectDetails) => (
  <Card>
    <CardHeader
      action={
        <Tooltip title={isLocked ? lockedTip : unlockedTip}>
          <Chip
            variant="soft"
            size="medium"
            icon={
              isLocked ? (
                <Iconify icon="solar:lock-outline" />
              ) : (
                <Iconify icon="clarity:unlock-line" />
              )
            }
            color={isLocked ? 'warning' : 'success'}
            label={isLocked ? 'Locked' : 'Unlocked'}
          />
        </Tooltip>
      }
    />
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
