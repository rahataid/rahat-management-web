'use client';

import { useTransaction } from 'src/api/transactions';
// mui
import { Card, Stack, Typography } from '@mui/material';
import Container from '@mui/material/Container';
// routes
import { useParams } from 'src/routes/hook';
// components
import { useSettingsContext } from 'src/components/settings';
import TransactionDetailsCard from './transaction-details-card';
import TransactionDetailsTableView from './transaction-details-table-view';

export default function TransactionDetailsView() {
  const { transactionDetails, transactionDetailsTableList } = useTransaction();
  const { hash } = useParams();
  const settings = useSettingsContext();

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <TransactionDetailsCard data={transactionDetails} />
      <Card>
        <Typography variant="subtitle2" sx={{ pl: 5, pt: 3, mb: 2 }}>
          Events
        </Typography>
        <Stack direction="column" spacing={3}>
          <TransactionDetailsTableView data={transactionDetailsTableList} />
          <TransactionDetailsTableView data={transactionDetailsTableList} />
          <TransactionDetailsTableView data={transactionDetailsTableList} />
        </Stack>
      </Card>
    </Container>
  );
}
