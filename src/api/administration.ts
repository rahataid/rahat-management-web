import AdministrationService from '@services/administration';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useSnackbar } from 'notistack';
import { useMemo } from 'react';
import {
  IApiResponseError,
  IUserItem,
  IUsersApiFilters,
  IUsersListHookReturn,
} from 'src/types/administration';

export function useUsers(params?: IUsersApiFilters): IUsersListHookReturn {
  const { data, isLoading, error, refetch } = useQuery(['users'], async () => {
    const res = await AdministrationService.list(params);
    return res.data;
  });

  const users = useMemo(
    () =>
      data?.rows.map((u: IUserItem) => ({
        ...u,
        roles: u.roles || 'N/A',
        status: u.isApproved ? 'Approved' : 'Not Approved',
      })) || [],
    [data?.rows]
  );
  const meta = useMemo(() => data?.meta || {}, [data?.meta]);

  return {
    users,
    loading: isLoading,
    error: error as IApiResponseError,
    meta,
    refetchUser: refetch,
  };
}

export function useApproveUserFunc() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(
    ['user/approve'],
    async (walletAddress: string) => {
      const res = await AdministrationService.approve(walletAddress);
      return res.data;
    },
    {
      onError: () => {
        enqueueSnackbar('Error Approving User', { variant: 'error' });
      },
      onSuccess: () => {
        enqueueSnackbar('User Approved', { variant: 'success' });
        queryClient.invalidateQueries(['users']);
      },
    }
  );
}

export function useUpdateRoleFunc() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();

  return useMutation(
    ['user/role/update'],
    async (data: { walletAddress: string; role: string }) => {
      const res = await AdministrationService.updateRole(data.walletAddress, data.role);
      return res.data;
    },
    {
      onError: () => {
        enqueueSnackbar('Error Updating User Role', { variant: 'error' });
      },
      onSuccess: () => {
        enqueueSnackbar('User Role Updated', { variant: 'success' });
        queryClient.invalidateQueries(['users']);
      },
    }
  );
}
