import Label from '@components/label/label';
import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';
import { calculateAge } from '@utils/format-time';
import { IBeneficiaryDetails } from 'src/types/beneficiaries';

type Props = {
  beneficiary: IBeneficiaryDetails;
  isActive: boolean | null;
};

export default function BeneficiariesDetailsCard({ beneficiary, isActive }: Props) {
  const { name, bankStatus, dob, internetAccess, phoneOwnership, gender, phone } = beneficiary;
  return (
    <Card>
      <CardContent>
        <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
          <Typography variant="subtitle1">{name}</Typography>
          <Label
            variant="outlined"
            color={(isActive && 'success') || (!isActive && 'error') || 'default'}
          >
            {isActive ? 'Approved' : 'Not Approved'}
          </Label>
        </Stack>

        <Stack
          sx={{ p: 2 }}
          direction="row"
          justifyContent="space-between"
          alignItems="center"
          spacing={10}
        >
          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="body1">{phone}</Typography>
            <Typography variant="caption">Phone</Typography>
          </Grid>

          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="body1">{gender}</Typography>
            <Typography variant="caption">GENDER</Typography>
          </Grid>

          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="body1">{calculateAge(dob)}</Typography>
            <Typography variant="caption">Age</Typography>
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
            <Typography variant="body1">{bankStatus}</Typography>
            <Typography variant="caption">Bank Status</Typography>
          </Grid>

          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="body1">{internetAccess}</Typography>
            <Typography variant="caption">Internet Access</Typography>
          </Grid>

          <Grid container direction="column" justifyContent="center" alignItems="flex-start">
            <Typography variant="body1">{phoneOwnership}</Typography>
            <Typography variant="caption">Phone Ownership</Typography>
          </Grid>
        </Stack>
      </CardContent>
    </Card>
  );
}
