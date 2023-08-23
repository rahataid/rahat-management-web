import { CAMPAIGN_HOST_API } from '@config';
import axios from 'axios';
import { ICampaignCreateItem } from 'src/types/campaigns';

export const axiosInstance = axios.create({ baseURL: CAMPAIGN_HOST_API });

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
    details: (id: string) => `/campaigns/${id}`,
    logs: (id: number) => `/campaigns/${id}/logs`,
    bulkAddAudiences: `/audiences/bulk`,
    transports: '/transports',
  },
};

const CampaignsService = {
  list: () => axiosInstance.get(endpoints.campaigns.list),
  create: (data: any) => axiosInstance.post(endpoints.campaigns.create, { ...data }),
  update: (id: string, data: ICampaignCreateItem) =>
    axiosInstance.patch(endpoints.campaigns.update(id), { ...data }),
  details: (id: string) => axiosInstance.get(endpoints.campaigns.details(id)),
  logs: (id: number) => axiosInstance.get(endpoints.campaigns.logs(id)),
  bulkAddAudiences: (data: any) =>
    axiosInstance.post(endpoints.campaigns.bulkAddAudiences, { ...data }),
  transports: () => axiosInstance.get(endpoints.campaigns.transports),
};

export default CampaignsService;
