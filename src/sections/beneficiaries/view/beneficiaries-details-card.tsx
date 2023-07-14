import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { IBeneficiaryDetails } from 'src/types/beneficiaries';

type Props = {
  data: IBeneficiaryDetails;
};

export default function BeneficiariesDetailsCard({ data }: Props) {
  const {
    name,
    status,
    phone,
    gender,
    cnicNumber,
    district,
    dailyWaterConsumption,
    dailyDistanceCovered,
  } = data;
  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography variant="subtitle1">{name}</Typography>
          {/* <Label
            variant="outlined"
            color={
              (status === Status.ACTIVE && 'success') ||
              (status === Status.INACTIVE && 'error') ||
              'default'
            }
          >
            {status}
          </Label> */}
        </Stack>

        <Stack
          sx={{ p: 2 }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={10}
        >
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="body2">{phone}</Typography>
            <Typography variant="body2">Phone</Typography>
          </Grid>

          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="body2">{gender}</Typography>
            <Typography variant="body2">GENDER</Typography>
          </Grid>

          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="body2">{cnicNumber}</Typography>
            <Typography variant="body2">CNIC Number</Typography>
          </Grid>
        </Stack>

        <Stack
          sx={{ p: 2 }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={10}
        >
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="body2">{district}</Typography>
            <Typography variant="body2">District</Typography>
          </Grid>

          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="body2">{dailyWaterConsumption}</Typography>
            <Typography variant="body2">Daily Water Consumption</Typography>
          </Grid>

          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="body2">{dailyDistanceCovered}</Typography>
            <Typography variant="body2">Daily Distance Covered</Typography>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}
