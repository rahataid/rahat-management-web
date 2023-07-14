import { Card, CardContent, Grid, Stack, Typography } from '@mui/material';

const BasicInfoCard = () => (
  <Card>
    <CardContent>
      <Stack direction="row" justifyContent="space-between" alignItems="center" spacing={2}>
        <Typography variant="subtitle1">Rahat</Typography>
      </Stack>

      <Stack
        sx={{ p: 2 }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={2}
      >
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="subtitle" sx={{ fontWeight: 600 }}>
            9841411414
          </Typography>
          <Typography variant="body2">Phone</Typography>
        </Grid>

        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="subtitle" sx={{ fontWeight: 600 }}>
            0x1234567890
          </Typography>
          <Typography variant="body2">Wallet Address</Typography>
        </Grid>
      </Stack>
    </CardContent>
  </Card>
);

export default BasicInfoCard;
