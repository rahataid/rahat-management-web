import VendorsService from '@services/vendors';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
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

export function useVendorState(walletAdddress: string) {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(
    ['vendors/toogleState'],
    async () => {
      const response = await VendorsService.changeVendorState(walletAdddress);
      return response.data;
    },
    {
      onError: () => {
        enqueueSnackbar('Toggle State errror', { variant: 'error' });
      },
      onSuccess: () => {
        enqueueSnackbar('Toggle State Successfully', { variant: 'success' });
        queryClient.invalidateQueries(['vendors']);
      },
    }
  );
}

export function useUpdateVendor(walletAddress: string) {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    ['campaign/audience/remove'],
    async (data: IVendorDetails) => {
      const res = await VendorsService.update(walletAddress, data);
      return res.data;
    },
    {
      onError: () => {
        enqueueSnackbar('Error Updating Vendor', { variant: 'error' });
      },
      onSuccess: () => {
        enqueueSnackbar('Vendor Updated Removed Successfully', { variant: 'success' });
      },
    }
  );
}
