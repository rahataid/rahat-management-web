import TransactionsService from '@services/transactions';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { transactionDetailsTableList, transactionStats } from 'src/_mock/_transactions';
import {
  ITransactionApiFilters,
  ITransactionDetails,
  ITransactionDetailsHookReturn,
  ITransactionListHookReturn,
} from 'src/types/transactions';

export function useTransactions(params?: ITransactionApiFilters): ITransactionListHookReturn {
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

export function useTransaction(txHash: string): ITransactionDetailsHookReturn {
  const { data, isLoading, error } = useQuery(['transaction', txHash], async () => {
    const res = await TransactionsService.details(txHash);
    return res;
  });

  const transaction = useMemo(() => data?.data || ({} as ITransactionDetails), [data?.data]);

  return {
    transaction,
    isLoading,
    error,
  };
}

export function useTransactionDetailsTable(txHash: string) {
  const memoizedValue = useMemo(
    () => ({
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
