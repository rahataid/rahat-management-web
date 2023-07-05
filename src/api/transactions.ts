import { useMemo } from 'react';
import { transactionList, transactionStats } from 'src/_mock/_transactions';

export function useTransactions() {
  const memoizedValue = useMemo(
    () => ({
      transactions: transactionList,
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
