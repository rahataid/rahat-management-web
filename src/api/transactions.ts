import { useMemo } from 'react';
import { transactionsList, transactionStats } from 'src/_mock/_transactions';

export function useTransactions() {
  const memoizedValue = useMemo(
    () => ({
      transactions: transactionsList,
      transactionStats,
      transactionsLoading: false,
      transactionsError: null,
      transactionsValidating: false,
      transactionsEmpty: false,
    }),
    []
  );

  return memoizedValue;
}
