import { useMemo } from 'react';
import { transactionDetails, transactionDetailsTableList, transactionList, transactionStats } from 'src/_mock/_transactions';

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

export function useTransaction() {
  const memoizedValue = useMemo(
    () => ({
      transactionDetails,
      transactionDetailsTableList,
      transactionsLoading: false,
      transactionsError: null,
      transactionsValidating: false,
      transactionsEmpty: false,
    }),
    []
  );

  return memoizedValue;
}
