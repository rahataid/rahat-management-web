import SummaryCard from '@components/summary-card';
import { Grid } from '@mui/material';

type Props = {
  data: {
    totalSMSSent: number;
    bankedBeneficiaries: number;
    unbankedBeneficiaries: number;
  };
};

const SMSLogsCards = ({ data }: Props) => {
  const { totalSMSSent, bankedBeneficiaries, unbankedBeneficiaries } = data;
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={4}>
            <SummaryCard
              color="warning"
              icon="material-symbols:sms"
              title=""
              total={totalSMSSent}
              subtitle="Total SMS Sent"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SummaryCard
              color="warning"
              icon="material-symbols:sms"
              title=""
              total={bankedBeneficiaries}
              subtitle="Banked Beneficiaries"
            />
          </Grid>
          <Grid item xs={12} md={4}>
            <SummaryCard
              color="warning"
              icon="material-symbols:sms"
              title=""
              total={unbankedBeneficiaries}
              subtitle="Unbanked Beneficiaries"
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default SMSLogsCards;
