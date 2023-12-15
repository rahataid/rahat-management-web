import SummaryCard from '@components/summary-card';
import { Grid } from '@mui/material';

const LogsCards = ({ data = [] }: any) => {
  const successfulIVR = data.length
    ? data?.filter((log: any) => log.disposition === 'ANSWERED')
    : [];
  const failedIVR = data.length
    ? data?.filter((log: any) => log.disposition === 'NO ANSWER' || log.disposition === 'BUSY')
    : [];

  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <SummaryCard
              color="warning"
              icon="material-symbols:call"
              title=""
              total={data?.length ?? 0}
              subtitle="Total IVR Sent"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SummaryCard
              color="warning"
              icon="material-symbols:call"
              title=""
              total={successfulIVR?.length ?? 0}
              subtitle="Successful IVR"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SummaryCard
              color="warning"
              icon="material-symbols:call"
              title=""
              total={failedIVR?.length ?? 0}
              subtitle="Failed IVR"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LogsCards;
