import { CAMPAIGN_APP_ID, CAMPAIGN_HOST_API } from '@config';
import axios from 'axios';
import { ICampaignCreateItem } from 'src/types/campaigns';

export const axiosInstance = axios.create({
  baseURL: CAMPAIGN_HOST_API,
  headers: {
    appid: CAMPAIGN_APP_ID,
  },
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

// ----------------------------------------------------------------------

export const endpoints = {
  campaigns: {
    list: '/campaigns',
    create: '/campaigns',
    update: (id: string) => `/campaigns/${id}`,
    trigger: (id: string) => `/campaigns/${id}/trigger`,
    details: (id: string) => `/campaigns/${id}`,
    logs: (id: number) => `/campaigns/${id}/logs`,
    transports: '/transports',
    getByIds: '/campaigns/getByIds',
    remove: (id: string) => `/campaigns/${id}`,
    removeAudienceFromCampaign: (campaignId: string, audienceId: string) =>
      `/campaigns/${campaignId}/audience/${audienceId}/remove`,
  },
  audiences: {
    bulkAddAudiences: `/audiences/bulk`,
    audiences: `/audiences`,
    removeAudience: (id: string) => `/audiences/${id}`,
  },
};

const CampaignsService = {
  list: (ids?: number[]) =>
    axiosInstance.get(endpoints.campaigns.list, {
      params: {
        ids: JSON.stringify(ids),
      },
    }),
  create: (data: any) => axiosInstance.post(endpoints.campaigns.create, { ...data }),
  update: (id: string, data: ICampaignCreateItem) =>
    axiosInstance.patch(endpoints.campaigns.update(id), { ...data }),
  details: (id: string) => axiosInstance.get(endpoints.campaigns.details(id)),
  trigger: (id: string) => axiosInstance.get(endpoints.campaigns.trigger(id)),
  logs: (id: number) => axiosInstance.get(endpoints.campaigns.logs(id)),
  transports: () => axiosInstance.get(endpoints.campaigns.transports),
  getByIds: (ids: number[]) =>
    axiosInstance.get(endpoints.campaigns.getByIds, {
      params: {
        ids: JSON.stringify(ids),
      },
    }),
  remove: (id: string) => axiosInstance.delete(endpoints.campaigns.remove(id)),
  removeAudienceFromCampaign: (campaignId: string, audienceId: string) =>
    axiosInstance.delete(endpoints.campaigns.removeAudienceFromCampaign(campaignId, audienceId)),
  audiences: () => axiosInstance.get(endpoints.audiences.audiences),
  bulkAddAudiences: (data: any) => axiosInstance.post(endpoints.audiences.bulkAddAudiences, data),
  removeAudience: (id: string) => axiosInstance.delete(endpoints.audiences.removeAudience(id)),
};

export default CampaignsService;
