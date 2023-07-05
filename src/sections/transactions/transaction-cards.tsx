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
          {transactionStats?.length &&
            transactionStats.map((el) => (
              <Grid item xs={12} md={3}>
                <SummaryCard
                  color={el.beneficiaryType === 'Banked Beneficiary' ? 'warning' : 'success'}
                  icon={
                    el.transactionType === 'Token Issued'
                      ? 'material-symbols:token'
                      : 'material-symbols:paid'
                  }
                  title={el.transactionType}
                  total={el.total.toString()}
                  subtitle={el.beneficiaryType}
                />
              </Grid>
            ))}
        </Grid>
      </Grid>
    </Grid>
  );
};

export default TransactionsCards;
