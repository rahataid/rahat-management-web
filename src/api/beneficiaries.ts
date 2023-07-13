import BeneficiaryService from '@services/beneficiaries';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import {
  beneficiaryClaimsDetails,
  beneficiaryDetails,
  beneficiaryTransactionList,
} from 'src/_mock/_beneficiaries';

import {
  BANK_STATUS,
  BeneficiariesListHookReturn,
  Gender,
  IBeneficiaryApiFilters,
  INTERNET_STATUS,
  PHONE_STATUS,
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

export const GenderFilterOptions = [
  { value: Gender.FEMALE, label: 'Female' },
  { value: Gender.MALE, label: 'Male' },
  { value: Gender.OTHERS, label: 'Others' },
  { value: Gender.UNKNOWN, label: 'Unknown' },
];

export const internetStatusFilterOptions = [
  { value: INTERNET_STATUS.HOME_INTERNET, label: 'Home Internet' },
  { value: INTERNET_STATUS.NO_INTERNET, label: 'No Internet' },
  { value: INTERNET_STATUS.PHONE_INTERNET, label: 'Phone Internet' },
  { value: INTERNET_STATUS.UNKNOWN, label: 'Unknown' },
];
export const bankStatusFilterOptions = [
  { value: BANK_STATUS.BANKED, label: 'Banked' },
  { value: BANK_STATUS.UNBANKED, label: 'Unbanked' },
  { value: BANK_STATUS.UNDERBANKED, label: 'Underbanked' },
  { value: BANK_STATUS.UNKNOWN, label: 'Unknown' },
];

export const phoneStatusFilterOptions = [
  { value: PHONE_STATUS.FEATURE_PHONE, label: 'Feature Phone' },
  { value: PHONE_STATUS.NO_PHONE, label: 'No Phone' },
  { value: PHONE_STATUS.SMART_PHONE, label: 'Smart Phone' },
  { value: PHONE_STATUS.UNKNOWN, label: 'Unknown' },
];
