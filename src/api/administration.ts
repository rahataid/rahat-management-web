import AdministrationService from '@services/administration';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import {
  IApiResponseError,
  IUserItem,
  IUsersApiFilters,
  IUsersListHookReturn,
} from 'src/types/administration';

export function useUsers(params?: IUsersApiFilters): IUsersListHookReturn {
  const { data, isLoading, error } = useQuery(['users', params], async () => {
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
  };
}
