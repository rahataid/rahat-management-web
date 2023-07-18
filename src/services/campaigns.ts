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
  },
};

const CampaignsService = {
  list: () => axiosInstance.get(endpoints.campaigns.list),
  create: (data) => axiosInstance.post(endpoints.campaigns.create, { ...data }),
};

export default CampaignsService;
