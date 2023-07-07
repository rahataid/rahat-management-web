import { useMemo } from 'react';
import { beneficiariesList, beneficiaryClaimsDetails, beneficiaryDetails } from 'src/_mock/_beneficiaries';

export function useBeneficiaries() {
  const memoizedValue = useMemo(
    () => ({
      beneficiaries: beneficiariesList,
      beneficiariesLoading: false,
      beneficiariesError: null,
      beneficiariesValidating: false,
      beneficiariesEmpty: false,
    }),
    []
  );

  return memoizedValue;
}

export function useBeneficiary() {
  const memoizedValue = useMemo(
    () => ({
      beneficiary: beneficiaryDetails,
      beneficiaryClaimsDetails,
      beneficiariesLoading: false,
      beneficiariesError: null,
      beneficiariesValidating: false,
      beneficiariesEmpty: false,
    }),
    []
  );

  return memoizedValue;
}
