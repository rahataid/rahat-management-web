import BeneficiaryService from '@services/beneficiaries';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import {
  beneficiaryClaimsDetails,
  beneficiaryDetails,
  beneficiaryTransactionList,
} from 'src/_mock/_beneficiaries';
import { BeneficiariesListHookReturn, IBeneficiaryApiFilters } from 'src/types/beneficiaries';

export function useBeneficiaries(params?: IBeneficiaryApiFilters): BeneficiariesListHookReturn {
  const { data, isError, isLoading, error, status } = useQuery({
    queryKey: ['beneficiaries', params],
    queryFn: async () => {
      const res = await BeneficiaryService.list(params);
      return res;
    },
  });

  console.log({ data, isError, isLoading, error, status });

  const memoizedValue = useMemo(
    () => ({
      beneficiaries: data?.data?.rows || [],
      loading: isLoading,
      error,
      meta: data?.data?.meta || {},
    }),
    [data?.data?.rows, error, isLoading, data?.data?.meta]
  );

  return memoizedValue;
}

export function useBeneficiary() {
  const memoizedValue = useMemo(
    () => ({
      beneficiary: beneficiaryDetails,
      beneficiaryClaimsDetails,
      beneficiaryTransactionList,
      beneficiariesLoading: false,
      beneficiariesError: null,
      beneficiariesValidating: false,
      beneficiariesEmpty: false,
    }),
    []
  );

  return memoizedValue;
}
