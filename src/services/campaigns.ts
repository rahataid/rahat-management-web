import { CAMPAIGN_HOST_API } from '@config';
import axios from 'axios';

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
    details: (id: number) => `/campaigns/${id}`,
    logs: (id: number) => `/campaigns/${id}/logs`,
  },
};

const CampaignsService = {
  list: () => axiosInstance.get(endpoints.campaigns.list),
  create: (data: any) => axiosInstance.post(endpoints.campaigns.create, { ...data }),
  details: (id: number) => axiosInstance.get(endpoints.campaigns.details(id)),
  logs: (id: number) => axiosInstance.get(endpoints.campaigns.logs(id)),
};

export default CampaignsService;
