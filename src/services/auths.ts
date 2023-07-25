import { axiosInstance, endpoints } from '@utils/axios';

const AuthService = {
  loginWallet: (data) => axiosInstance.post(endpoints.auth.loginWallet, { ...data }),
};

export default AuthService;
