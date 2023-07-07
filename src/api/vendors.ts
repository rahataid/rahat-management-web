import { useMemo } from 'react';
import { VENDOR, VENDORS } from 'src/_mock/_vendors';

export function useGetVendors() {
  const memoizedValue = useMemo(
    () => ({
      vendors: VENDORS,
      vendorsLoading: false,
      vendorsError: null,
      vendorsValidating: false,
      vendorsEmpty: false,
    }),
    []
  );

  return memoizedValue;
}

export function useGetVendor() {
  const memoizedValue = useMemo(
    () => ({
      vendor: VENDOR,
      vendorLoading: false,
      vendorError: null,
      vendorValidating: false,
      vendorEmpty: false,
    }),
    []
  );

  return memoizedValue;
}
