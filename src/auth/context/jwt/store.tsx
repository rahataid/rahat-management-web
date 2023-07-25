import AuthService from '@services/auths';
import { axiosInstance, endpoints } from 'src/utils/axios';
import { create } from 'zustand';
import { AuthUserType } from '../../types';
import { setSession } from './utils';

type AuthStateType = {
  user: AuthUserType | null;
  loading: boolean;
  isAuthenticated: boolean;
  isInitialized: boolean;
};

type AuthActionsType = {
  login: (email: string) => Promise<void>;
  register: (email: string, password: string, firstName: string, lastName: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWallet: (walletAddress: string) => Promise<void>;
};

type AuthStoreType = AuthStateType & AuthActionsType;

const useAuthStore = create<AuthStoreType>((set) => ({
  user: null,
  loading: true,
  isAuthenticated: false,
  isInitialized: false,
  loginWallet: async (walletAddress: string) => {
    try {
      const user = await AuthService.loginWallet(walletAddress);
      console.log('user', user);
    } catch (error) {
      console.log(error);
    }
  },
  login: async (email: string) => {
    try {
      setSession('123');

      set({
        // user,
        loading: false,
        isAuthenticated: true,
        isInitialized: true,
      });
    } catch (error) {
      set({
        user: null,
        loading: false,
        isAuthenticated: false,
        isInitialized: true,
      });
      throw error;
    }
  },
  register: async (email: string, password: string, firstName: string, lastName: string) => {
    const data = {
      email,
      password,
      firstName,
      lastName,
    };

    try {
      const response = await axiosInstance.post(endpoints.auth.register, data);

      const { accessToken, user } = response.data;

      sessionStorage.setItem('accessToken', accessToken);

      set({
        user,
        loading: false,
        isAuthenticated: true,
        isInitialized: true,
      });
    } catch (error) {
      set({
        user: null,
        loading: false,
        isAuthenticated: false,
        isInitialized: true,
      });
      throw error;
    }
  },
  logout: async () => {
    setSession(null);
    set({
      user: null,
      loading: false,
      isAuthenticated: false,
      isInitialized: true,
    });
  },
}));

export default useAuthStore;
