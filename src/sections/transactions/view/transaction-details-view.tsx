'use client';

import { useTransactions } from 'src/api/transactions';
// mui
import Container from '@mui/material/Container';
// routes
import { useParams } from 'src/routes/hook';
// components
import { useSettingsContext } from 'src/components/settings';
import TransactionDetailsCard from './transaction-details-card';



export default function TransactionDetailsView() {
  const { transactionDetails } = useTransactions();
  const { hash } = useParams();
  const settings = useSettingsContext();  

  return (
    <Container maxWidth={settings.themeStretch ? false : 'lg'}>
      <TransactionDetailsCard data={ transactionDetails } />
      
    </Container>
  );
}
