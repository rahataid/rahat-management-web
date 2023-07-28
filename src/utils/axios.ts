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
  appSettings: {
    blockchain: '/app/blockchain',
    contracts: '/app/contracts',
  },
  auth: {
    loginWallet: '/auths/login-wallet',
    login: '/auths/login',
    // todo:change to the real enpoint
    register: '/users/register',
    create: '/users',
  },
  beneficiaries: {
    list: '/beneficiaries',
    create: '/beneficiaries',
    details: (address: string) => `/beneficiaries/${address}`,
    assignProject: (address: string) => `/beneficiaries/${address}/projects`,
  },
  projects: {
    list: '/projects',
    create: '/projects',
    details: (contractAddress: string) => `/projects/${contractAddress}`,
  },
  projectBeneficiaries: {
    list: (address: string) => `/projects/${address}/beneficiaries`,
  },

  campaigns: {
    list: '/campaigns',
  },
  vendors: {
    list: '/vendors',
    details: (walletAddress: string) => `/vendors/${walletAddress}`,
  },
  transactions: {
    list: '/transactions',
    details: (txHash: string) => `/transactions/${txHash}`,
  },
  administration: {
    users: {
      list: '/users',
      approve: (walletAddress: string) => `/users/${walletAddress}/approve`,
    },
  },
};
