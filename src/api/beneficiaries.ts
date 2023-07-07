import { useMemo } from 'react';
import { beneficiariesList } from 'src/_mock/_beneficiaries';

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
