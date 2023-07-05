'use client';

import { TransactionsView } from '@sections/transactions';

// TODO:Do not forget the metadata while creating a page
export const metadata = {
  title: 'Dashboard: Transactions',
};

export default function Transactions() {
  return <TransactionsView />;
}
