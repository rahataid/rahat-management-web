import axios from 'axios';
// config
import { HOST_API } from '@config';
import useAuthStore from 'src/store/auths';

// ----------------------------------------------------------------------

const axiosInstance = axios.create({
  baseURL: HOST_API,
});

axiosInstance.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    if (error.response && error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const { tokens } = useAuthStore.getState();
      console.log('tokens', tokens);
      const response = await axiosInstance.post(
        endpoints.auth.refreshToken,
        {
          refresh: tokens.refresh_token,
        }
        // {
        //   headers: {
        //     user: JSON.stringify(user),
        //   },
        // }
      );
      if (response.status === 201 && response.data) {
        const newToken = response.data.access_token;
        const { saveAccessToken } = useAuthStore.getState();
        saveAccessToken(newToken);
        // useAuthStore.setState((state) => {
        //   state.tokens.access_token = newToken;
        // });
        // localStorage.setItem('accessToken', newToken); // Save the new token to local storage
        axios.defaults.headers.common.Authorization = `Bearer ${newToken}`;
        originalRequest.headers.Authorization = `Bearer ${newToken}`; // Set the new token in the retry request
        return axiosInstance(originalRequest);
      }
    }
    return Promise.reject((error.response && error.response.data) || 'Something went wrong');
  }
);

axiosInstance.interceptors.request.use(
  async (config) => {
    const { tokens } = useAuthStore.getState();
    if (tokens.access_token) {
      config.headers.Authorization = `Bearer ${tokens.access_token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default axiosInstance;
// ----------------------------------------------------------------------

export const endpoints = {
  appSettings: {
    blockchain: '/app/blockchain',
    contracts: '/app/contracts',
  },
  auth: {
    loginWallet: '/auth/login-wallet',
    login: '/auth/login',
    register: '/auth/register',
    sendOtp: '/auth/send-otp',
    create: '/users',
    refreshToken: '/auth/refresh',
  },
  beneficiaries: {
    list: '/beneficiaries',
    create: '/beneficiaries',
    update: (uuid: string) => `/beneficiaries/${uuid}`,
    details: (address: string) => `/beneficiaries/${address}`,
    assignProject: (address: string) => `/beneficiaries/${address}/projects`,
    disable: (walletAddress: string) => `/beneficiaries/${walletAddress}/disable`,
    stats: '/beneficiaries/stats',
    geoLoc: '/beneficiaries/geo',
  },
  projects: {
    list: '/projects',
    create: '/projects',
    update: (address: string) => `/projects/${address}`,
    updateCampaign: (address: string) => `/projects/${address}/campaigns`,
    removeCampaignFromProject: (address: string) => `/projects/remove/${address}/campaigns`,
    details: (contractAddress: string) => `/projects/${contractAddress}`,

    beneficiaries: {
      list: (address: string) => `/projects/${address}/beneficiaries`,
      remove: (contractAddress: string) => `/projects/remove/${contractAddress}/beneficiaries`,
    },
  },

  campaigns: {
    list: '/campaigns',
  },
  vendors: {
    list: '/vendors',
    details: (walletAddress: string) => `/vendors/${walletAddress}`,
    update: (walletAddress: string) => `/vendors/${walletAddress}`,
    changeVendorState: (contractAddress: string) =>
      `/vendors/${contractAddress}/changeVendoorState'`,
  },
  transactions: {
    list: '/transactions',
    details: (txHash: string) => `/transactions/${txHash}`,
  },
  administration: {
    users: {
      list: '/users',
      create: '/auth/register',
      disable: (id: number) => `/users/${id}`,
      updateRole: (walletAddress: string) => `/users/${walletAddress}/role`,
      approve: (walletAddress: string) => `/users/${walletAddress}/approve`,
    },
  },
  reports: {
    dashboard: {
      count: '/reports/dashboard/summary',
    },
    byContractAddress: (address: string) => `/reports/project/${address}`,
  },
};
