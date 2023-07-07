import SummaryCard from '@components/summary-card';
import { Grid } from '@mui/material';

const VendorsCards = () => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} md={4}>
        <SummaryCard
          color="success"
          icon="material-symbols:paid"
          title="Balance"
          total={20}
          subtitle="tokens"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <SummaryCard
          color="success"
          icon="material-symbols:paid"
          title="Pending"
          total={19}
          subtitle="tokens"
        />
      </Grid>
      <Grid item xs={12} md={4}>
        <SummaryCard
          color="warning"
          icon="material-symbols:token"
          title="Disbursed"
          total={15}
          subtitle="tokens"
        />
      </Grid>
    </Grid>
  );
};

export default VendorsCards;
