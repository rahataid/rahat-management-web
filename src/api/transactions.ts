import { useMemo } from 'react';
import { transactionDetails, transactionList, transactionStats } from 'src/_mock/_transactions';

export function useTransactions() {
  const memoizedValue = useMemo(
    () => ({
      transactions: transactionList,
      transactionStats,
      transactionDetails,
      transactionsLoading: false,
      transactionsError: null,
      transactionsValidating: false,
      transactionsEmpty: false,
    }),
    []
  );

  return memoizedValue;
}
