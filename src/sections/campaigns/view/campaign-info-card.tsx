import { Card, CardContent, CardHeader, Grid, Stack, Typography } from '@mui/material';
import { fDateTime } from '@utils/format-time';
import { ICampaignItemApiResponse } from 'src/types/campaigns';

interface CampaignInfoProps {
  campaign: ICampaignItemApiResponse;
}

const CampaignInfoCard = ({ campaign }: CampaignInfoProps) => (
  <Card>
    <CardHeader
      title={campaign?.name}
      // action={
      //   <Grid container direction="column" justifyContent="center" alignItems="flex-start">
      //     <Typography variant="caption">
      //       <Button
      //         component={RouterLink}
      //         href={paths.dashboard.general.campaigns.logs(campaign?.id)}
      //         startIcon={<Iconify icon="solar:eye-bold" />}
      //       >
      //         View Logs
      //       </Button>
      //     </Typography>
      //   </Grid>
      // }
    />
    <CardContent>
      <Stack
        sx={{ p: 2 }}
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        spacing={12}
      >
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="body1">{campaign?.type}</Typography>
          <Typography variant="caption">Type</Typography>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="body1">{fDateTime(campaign.createdAt, 'dd MMM, yyyy p')}</Typography>
          <Typography variant="caption">Start Time</Typography>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="body1">{campaign?.status}</Typography>
          <Typography variant="caption">Status</Typography>
        </Grid>
        <Grid container direction="column" justifyContent="center" alignItems="flex-start">
          <Typography variant="body1">{campaign?.audiences?.length || 0}</Typography>
          <Typography variant="caption">Total Audiences</Typography>
        </Grid>
      </Stack>
    </CardContent>
  </Card>
);

export default CampaignInfoCard;
