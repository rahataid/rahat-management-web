import CampaignsService from '@services/campaigns';
import { useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import {
  CampaignsListHookReturn,
  IApiResponseError,
  ICampaignDetailsHookReturn,
  ICampaignItemApiResponse,
  ICampaignLogsApiResponse,
  ICampaignLogsHookReturn,
  ITransportDetailsHookReturn,
} from 'src/types/campaigns';

export function useCampaigns(params?: number[]): CampaignsListHookReturn {
  const { data, isLoading, error } = useQuery(['campaigns', params], async () => {
    const res = await CampaignsService.list(params);
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

export function useCampaign(id: string): ICampaignDetailsHookReturn {
  const { data, isLoading, error } = useQuery(['campaign/id'], async () => {
    const res = await CampaignsService.details(id);
    return res.data as ICampaignItemApiResponse;
  });

  const campaign = useMemo(() => data || ({} as ICampaignItemApiResponse), [data]);

  return {
    campaign,
    isLoading,
    error: error as IApiResponseError,
  };
}

export function useCampaignLogs(id: number): ICampaignLogsHookReturn {
  const { data, isLoading, error } = useQuery(['campaign/id/logs'], async () => {
    const res = await CampaignsService.logs(id);
    return res.data as ICampaignLogsApiResponse;
  });

  const logs = useMemo(() => data || ({} as ICampaignLogsApiResponse), [data]);

  return {
    logs,
    isLoading,
    error: error as IApiResponseError,
  };
}

export function useTransports(): ITransportDetailsHookReturn {
  const { data, isLoading, error } = useQuery(['transports'], async () => {
    const res = await CampaignsService.transports();
    return res;
  });
  const transports = useMemo(() => data?.data || [], [data?.data]);

  return {
    transports,
    isLoading,
    error,
  };
}

export function useAudiences() {
  const { data, isLoading, error } = useQuery(['audiences'], async () => {
    const res = await CampaignsService.audiences();
    return res.data;
  });
  const audiences = useMemo(() => data || [], [data]);

  return {
    audiences,
    isLoading,
    error,
  };
}
