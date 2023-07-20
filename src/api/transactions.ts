import TransactionsService from '@services/transactions';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import {
  transactionDetails,
  transactionDetailsTableList,
  transactionStats,
} from 'src/_mock/_transactions';
import { ITransactionApiFilters, TransactionListHookReturn } from 'src/types/transactions';

export function useTransactions(params?: ITransactionApiFilters): TransactionListHookReturn {
  const { data, isLoading, error } = useQuery(['transactions', params], async () => {
    const res = await TransactionsService.list(params);
    return res;
  });

  const transactions = useMemo(() => data?.data?.rows || [], [data?.data?.rows]);
  const meta = useMemo(() => data?.data?.meta || {}, [data?.data?.meta]);

  return {
    transactions,
    transactionStats,
    loading: isLoading,
    error,
    meta,
  };
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
