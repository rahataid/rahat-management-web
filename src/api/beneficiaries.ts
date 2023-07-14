import BeneficiaryService from '@services/beneficiaries';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import {
  beneficiaryClaimsDetails,
  beneficiaryDetails,
  beneficiaryTransactionList,
} from 'src/_mock/_beneficiaries';

import {
  BeneficiariesListHookReturn,
  IApiResponseError,
  IBeneficiariesCreateItem,
  IBeneficiaryApiFilters,
} from 'src/types/beneficiaries';

export function useBeneficiaries(params?: IBeneficiaryApiFilters): BeneficiariesListHookReturn {
  const { data, isLoading, error } = useQuery(['beneficiaries', params], async () => {
    const res = await BeneficiaryService.list(params);
    return res;
  });

  const beneficiaries = useMemo(() => data?.data?.rows || [], [data?.data?.rows]);
  const meta = useMemo(() => data?.data?.meta || {}, [data?.data?.meta]);

  return {
    beneficiaries,
    loading: isLoading,
    error,
    meta,
  };
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

export function useBeneficiaryCreate() {
  const create = useMutation({
    mutationFn: async (data: IBeneficiariesCreateItem) => {
      const response = await BeneficiaryService.create(data);
      return response;
    },
  });

  return {
    loading: create.isLoading,
    error: create.error as IApiResponseError,
    mutate: create.mutate,
    isSuccess: create.isSuccess,
  };
}
