import axios from 'axios';
// config
import { HOST_API } from '@config';

// ----------------------------------------------------------------------

const token = sessionStorage.getItem('accessToken');
console.log('token', `Bearer ${token}`);

export const axiosInstance = axios.create({
  baseURL: HOST_API,
  headers: { Authorization: `Bearer ${token}` },
});

axiosInstance.interceptors.response.use(
  (res) => res,
  (error) => {
    console.log('error', error);
    return Promise.reject((error.response && error.response.data) || 'Something went wrong');
  }
);

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
  },
  beneficiaries: {
    list: '/beneficiaries',
    create: '/beneficiaries',
    update: (uuid: string) => `/beneficiaries/${uuid}`,
    details: (address: string) => `/beneficiaries/${address}`,
    assignProject: (address: string) => `/beneficiaries/${address}/projects`,
    disable: (walletAddress: string) => `/beneficiaries/${walletAddress}/disable`,
  },
  projects: {
    list: '/projects',
    create: '/projects',
    update: (address: string) => `/projects/${address}`,
    details: (contractAddress: string) => `/projects/${contractAddress}`,

    beneficiaries: {
      list: (address: string) => `/projects/${address}/beneficiaries`,
    },
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
      create: '/auth/register',
      disable: (id: number) => `/users/${id}`,
      updateRole: (walletAddress: string) => `/users/${walletAddress}/role`,
      approve: (walletAddress: string) => `/users/${walletAddress}/approve`,
    },
  },
};
