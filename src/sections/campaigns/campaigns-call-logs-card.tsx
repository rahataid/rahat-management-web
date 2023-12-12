import SummaryCard from '@components/summary-card';
import { Grid } from '@mui/material';

type Props = {
  data: {
    totalIVRSent: number;
    successfulIVR: number;
    failedIVR: number;
  };
};

const LogsCards = ({ data }: Props) => {
  const { totalIVRSent, successfulIVR, failedIVR } = data;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <SummaryCard
              color="warning"
              icon="material-symbols:call"
              title=""
              total={totalIVRSent}
              subtitle="Total IVR Sent"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SummaryCard
              color="warning"
              icon="material-symbols:call"
              title=""
              total={successfulIVR}
              subtitle="Successful IVR"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SummaryCard
              color="warning"
              icon="material-symbols:call"
              title=""
              total={failedIVR}
              subtitle="Failed IVR"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default LogsCards;
