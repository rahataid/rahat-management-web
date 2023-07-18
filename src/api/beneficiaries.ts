import BeneficiaryService from '@services/beneficiaries';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import {
  BeneficiariesListHookReturn,
  IBeneficiaryApiFilters,
  IBeneficiaryDetails,
} from 'src/types/beneficiaries';

export function useBeneficiaries(params?: IBeneficiaryApiFilters): BeneficiariesListHookReturn {
  const { data, isLoading, error } = useQuery(['beneficiaries', params], async () => {
    const res = await BeneficiaryService.list(params);
    return res;
  });

  const beneficiaries = useMemo(() => data?.data?.rows || [], [data?.data?.rows]);
  const meta = useMemo(() => data?.data?.meta || {}, [data?.data?.meta]);

  return {
    // TEMP for stage
    // beneficiaries: beneficiaryList,
    beneficiaries,
    loading: isLoading,
    error,
    meta,
  };
}

export function useBeneficiary(uuid: string) {
  const { data, isLoading, error } = useQuery(['beneficiaries', uuid], async () => {
    const res = await BeneficiaryService.details(uuid);
    return res;
  });

  const beneficiary = useMemo(() => data?.data || ({} as IBeneficiaryDetails), [data?.data]);

  return {
    beneficiary,
    isLoading,
    error,
  };
}
