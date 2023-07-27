import { axiosInstance, endpoints } from '@utils/axios';

const AuthService = {
  loginWallet: (walletAddress: string) =>
    axiosInstance.post(endpoints.auth.loginWallet, { walletAddress }),
  register: (data) => axiosInstance.post(endpoints.auth.register, { ...data }),
};

export default AuthService;
