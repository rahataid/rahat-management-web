import CampaignsService from '@services/campaigns';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import { useSnackbar } from 'notistack';
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
    console.log('res', res);
    return res.data as ICampaignLogsApiResponse;
  });

  const logs = useMemo(
    () =>
      ({
        ...data,
        rows: data?.rows?.map((row) => {
          console.log('row?.details', row?.details);
          const detailsWithAttempts = row?.details[0]?.phoneNumber
            ? row?.details?.reduce((acc, detail) => {
                const existingDetail = acc.find((item) => item.phoneNumber === detail.phoneNumber);

                if (existingDetail) {
                  existingDetail.attempts += 1;
                } else {
                  acc.push({ ...detail, attempts: 1 });
                }

                return acc;
              }, [])
            : {};
          console.log('detailsWithAttempts', detailsWithAttempts);
          const totalSuccessfulAnswer =
            !isEmpty(detailsWithAttempts) &&
            detailsWithAttempts.reduce(
              (acc, detail) => (detail.disposition === 'ANSWERED' ? acc + 1 : acc),
              0
            );
          const totalFailure =
            !isEmpty(detailsWithAttempts) &&
            detailsWithAttempts.reduce(
              (acc, detail) => (detail.disposition === 'NO ANSWER' ? acc + 1 : acc),
              0
            );

          return {
            ...row,
            details: detailsWithAttempts,
            totalSuccessfulAnswer,
            totalFailure,
          };
        }),
      } || ({} as ICampaignLogsApiResponse)),
    [data]
  );

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
export function useBulkAddAudiences() {
  const { enqueueSnackbar } = useSnackbar();
  const queryClient = useQueryClient();

  return useMutation(
    ['audiences/bulk/add'],
    async (withDetails) => {
      const response = await CampaignsService.bulkAddAudiences(withDetails);
      return response.data;
    },
    {
      onError: () => {
        enqueueSnackbar('Error registering audiences', { variant: 'error' });
      },
      onSuccess: () => {
        enqueueSnackbar('Audiences registered successfully', { variant: 'success' });
        queryClient.invalidateQueries(['audiences']);
      },
    }
  );
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

export function useRemoveAudience() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    ['campaign/audience/remove'],
    async ({ campaignId, audienceId }: { campaignId: string; audienceId: string }) => {
      const res = await CampaignsService.removeAudienceFromCampaign(campaignId, audienceId);
      return res.data;
    },
    {
      onError: () => {
        enqueueSnackbar('Error Removing Audiences', { variant: 'error' });
      },
      onSuccess: () => {
        enqueueSnackbar('Campaign Audience Removed Successfully', { variant: 'success' });
        queryClient.invalidateQueries(['campaign/id']);
      },
    }
  );
}

export function useRemoveCampaign() {
  const queryClient = useQueryClient();
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    ['campaign/remove'],
    async (id: string) => {
      const res = await CampaignsService.remove(id);
      return res.data;
    },
    {
      onError: () => {
        enqueueSnackbar('Error Removing Campaign', { variant: 'error' });
      },
      onSuccess: () => {
        enqueueSnackbar('Campaign Removed Successfully', { variant: 'success' });
        queryClient.invalidateQueries(['campaigns']);
      },
    }
  );
}

export function useCampaignFileUpload() {
  const { enqueueSnackbar } = useSnackbar();
  return useMutation(
    ['campaign/upload'],
    async (file: any) => {
      const res = await CampaignsService.upload(file);
      return res.data;
    },
    {
      onError: () => {
        enqueueSnackbar('Error Uploading File', { variant: 'error' });
      },
      onSuccess: () => {
        enqueueSnackbar('File Uploaded Successfully', { variant: 'success' });
      },
    }
  );
}

export function useCampaignAudio() {
  const { data, isLoading, error } = useQuery(['campaign/audio'], async () => {
    const res = await CampaignsService.audio();
    return res.data;
  });

  const campaignAudio = useMemo(() => data || [], [data]);

  return {
    campaignAudio,
    isLoading,
    error: error as IApiResponseError,
  };
}
