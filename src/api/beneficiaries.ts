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
  GENDER,
  IBeneficiaryApiFilters,
  INTERNET_STATUS,
  PHONE_STATUS,
} from 'src/types/beneficiaries';

export function useBeneficiaries(params?: IBeneficiaryApiFilters): BeneficiariesListHookReturn {
  const { data, isError, isLoading, error, status } = useQuery({
    queryKey: ['beneficiaries', params],
    queryFn: async () => {
      const res = await BeneficiaryService.list(params);
      return res;
    },
  });

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

export const genderFilterOptions = [
  { value: GENDER.FEMALE, label: 'Female' },
  { value: GENDER.MALE, label: 'Male' },
  { value: GENDER.OTHERS, label: 'Others' },
  { value: GENDER.UNKNOWN, label: 'Unknown' },
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
