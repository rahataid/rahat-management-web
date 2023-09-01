import AuthService from '@services/auths';
import { setSession } from '@utils/session';
import {
  clearToken,
  removeUser,
  removeWalletName,
  setToken,
  setUser as setUserLocal,
} from '@utils/storage-available';
import { AuthUserType } from 'src/auth/types';
import { create } from 'zustand';

export type IApiResponseError = {
  group: string;
  meta?: Record<string, string[]> | null;
  message: string;
  name: string;
  success: boolean;
  timestamp: number;
  statusCode: number;
};

type AuthStateType = {
  user: AuthUserType | null;
  walletName?: string | undefined;
  loading: boolean;
  isAuthenticated: boolean;
  isInitialized: boolean;
  error?: IApiResponseError | null;
};

type AuthActionsType = {
  logout: () => Promise<void>;
  loginWallet: (walletAddress: string) => Promise<void>;
  disconnectWallet: () => void;
  setUser: (user: AuthUserType) => void;
};

export type AuthStoreType = AuthStateType & AuthActionsType;

const useAuthStore = create<AuthStoreType>((set) => ({
  user: null,
  loading: true,
  walletName: undefined,
  isAuthenticated: false,
  isInitialized: false,
  loginWallet: async (walletAddress: string) => {
    try {
      const user = await AuthService.loginWallet(walletAddress);
      if (user.data) {
        set({
          user: user.data,
          loading: false,
          isAuthenticated: true,
          isInitialized: true,
          error: null,
        });
      } else {
        set({
          user: null,
          loading: false,
          isAuthenticated: false,
          isInitialized: true,
          error: null,
        });
      }

      setToken(user.data?.walletAddress);

      // return user.data;
    } catch (error) {
      set({
        error,
      });
      console.log(error);
    }
  },
  setUser(user: AuthUserType) {
    setSession(user?.access_token);
    set({
      user,
      loading: false,
      isAuthenticated: true,
      isInitialized: true,
      error: null,
    });
    console.log('user', user);
    setUserLocal(user);
  },

  logout: async () => {
    setSession(null);
    removeUser();
    set({
      user: null,
      loading: false,
      isAuthenticated: false,
      isInitialized: true,
    });
  },
  disconnectWallet: () => {
    setSession(null);
    set({
      user: null,
      loading: false,
      isAuthenticated: false,
      isInitialized: true,
    });
    removeWalletName();
    clearToken();
  },
}));

export default useAuthStore;
