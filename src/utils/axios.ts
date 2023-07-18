import axios from 'axios';
// config
import { HOST_API } from 'src/config-global';

// ----------------------------------------------------------------------

export const axiosInstance = axios.create({ baseURL: HOST_API });

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => Promise.reject((error.response && error.response.data) || 'Something went wrong')
);

// ----------------------------------------------------------------------

export const endpoints = {
  beneficiaries: {
    list: '/beneficiaries',
    create: '/beneficiaries',
    details: (address: string) => `/beneficiaries/${address}`,
  },

  campaigns: {
    list: '/campaigns',
  },
};
