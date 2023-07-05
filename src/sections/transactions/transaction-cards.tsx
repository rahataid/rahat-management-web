import { useTransactions } from 'src/api/transactions';

import SummaryCard from '@components/summary-card';
import { Grid } from '@mui/material';

/**
 * {
 *  "bankedCash":50,
 * "unBankedCash":40,
 * "bankedToken":23,
 * "unbankedToken":50
 * }
 */

const TransactionsCards = () => {
  const { transactionStats } = useTransactions();
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} md={12}>
        <Grid container spacing={2}>
          <Grid item xs={12} md={3}>
            <SummaryCard
              color='success'
              icon='material-symbols:paid'
              title='Cash Distributed'
              total={transactionStats.bankedCash}
              subtitle='Banked Beneficiary'
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <SummaryCard
              color='success'
              icon='material-symbols:paid'
              title='Cash Distributed'
              total={transactionStats.unbankedCash}
              subtitle='Unbanked Beneficiary'
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <SummaryCard
              color='warning'
              icon='material-symbols:token'
              title='Token Issued'
              total={transactionStats.bankedToken}
              subtitle='Banked Beneficiary'
            />
          </Grid>
          <Grid item xs={12} md={3}>
            <SummaryCard
              color='warning'
              icon='material-symbols:token'
              title='Token Issued'
              total={transactionStats.unbankedToken}
              subtitle='Unbanked Beneficiary'
            />
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TransactionsCards;
