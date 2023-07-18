import CampaignsService from '@services/campaigns';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import { CampaignssListHookReturn } from 'src/types/campaigns';

export function useCampaigns(): CampaignssListHookReturn {
  const { data, isLoading, error } = useQuery(['campaigns'], async () => {
    const res = await CampaignsService.list();
    return res;
  });
  const campaigns = useMemo(() => data?.data?.rows || [], [data?.data?.rows]);

  const meta = useMemo(() => data?.data?.meta || {}, [data?.data?.meta]);

  return {
    campaigns,
    meta,
    isLoading,
    error,
  };
}
