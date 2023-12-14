import SummaryCard from '@components/summary-card';
import { Grid } from '@mui/material';

const SMSLogsCards = ({ data = [] }: any) => {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <SummaryCard
              color="warning"
              icon="material-symbols:sms"
              title=""
              total={data?.length}
              subtitle="Total SMS Sent"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SummaryCard
              color="warning"
              icon="material-symbols:sms"
              title=""
              total={0}
              subtitle="Banked Beneficiaries"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SummaryCard
              color="warning"
              icon="material-symbols:sms"
              title=""
              total={0}
              subtitle="Unbanked Beneficiaries"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SMSLogsCards;
