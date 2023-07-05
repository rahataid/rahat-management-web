import { useSettingsContext } from '@components/settings';

import { Container, Grid } from '@mui/material';
import TransactionsCards from './transaction-cards';

const TransactionsView = () => {
  const settings = useSettingsContext();
  return (
    <Container maxWidth={settings.themeStretch ? false : 'xl'}>
      <h1>Live Transactions</h1>
      <Grid container spacing={3}>
        <Grid item xs={12} md={12}>
          <Grid container spacing={2}>
           <TransactionsCards />
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TransactionsView;
