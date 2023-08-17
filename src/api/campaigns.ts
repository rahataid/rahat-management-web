import CampaignsService from '@services/campaigns';
import { useMutation, useQuery } from '@tanstack/react-query';
import { useMemo } from 'react';
import {
  CampaignsListHookReturn,
  IApiResponseError,
  ICampaignDetailsHookReturn,
  ICampaignItemApiResponse,
  ICampaignLogsApiResponse,
  ICampaignLogsHookReturn,
} from 'src/types/campaigns';

export function useCampaigns(): CampaignsListHookReturn {
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

export function useCampaign(id: number): ICampaignDetailsHookReturn {
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

export function useCreateCampaign(): {
  createCampaign: (newCampaignData: Partial<ICampaignItemApiResponse>) => Promise<void>;
  isLoading: boolean;
  isSuccess: boolean;
  isError: boolean;
  error: any;
} {
  const createCampaignMutation = useMutation(
    (newCampaignData: Partial<ICampaignItemApiResponse>) =>
      CampaignsService.create(newCampaignData),
    {
      onError: (error) => {
        console.error('Error creating campaign:', error);
      },
      onSuccess: () => {
        console.log('Campaign created successfully!');
      },
    }
  );

  const { isLoading, isError, error, isSuccess } = createCampaignMutation;

  const createCampaign = async (newCampaignData: Partial<ICampaignItemApiResponse>) => {
    try {
      await createCampaignMutation.mutateAsync(newCampaignData);
    } catch (err) {
      console.log(err);
    }
  };

  return {
    createCampaign,
    isLoading,
    isSuccess,
    isError,
    error,
  };
}
