import VendorsService from '@services/vendors';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import {
  IVendorDetails,
  IVendorDetailsHookReturn,
  IVendorsApiFilters,
  IVendorsListHookReturn,
} from 'src/types/vendors';

export function useVendors(params?: IVendorsApiFilters): IVendorsListHookReturn {
  const { data, isLoading, error } = useQuery(['vendors', params], async () => {
    const res = await VendorsService.list(params);
    return res;
  });

  const vendors = useMemo(() => data?.data?.rows || [], [data?.data?.rows]);
  const meta = useMemo(() => data?.data?.meta || {}, [data?.data?.meta]);

  return {
    vendors,
    loading: isLoading,
    error,
    meta,
  };
}

export function useVendor(walletAddress: string): IVendorDetailsHookReturn {
  const { data, isLoading, error } = useQuery(['vendors', walletAddress], async () => {
    const res = await VendorsService.details(walletAddress);
    return res;
  });

  const vendor = useMemo(() => data?.data || ({} as IVendorDetails), [data?.data]);

  return {
    vendor,
    isLoading,
    error,
  };
}
