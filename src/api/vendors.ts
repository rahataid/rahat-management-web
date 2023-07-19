import VendorsService from '@services/vendors';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';

import { IVendorsApiFilters, VendorsListHookReturn } from 'src/types/vendors';

export function useVendors(params?: IVendorsApiFilters): VendorsListHookReturn {
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
