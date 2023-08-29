import AuthService from '@services/auths';
import { setSession } from '@utils/session';
import { clearToken, removeWalletName, setToken, setUser } from '@utils/storage-available';
import { AuthUserType } from 'src/auth/types';
import { IUserRoles } from 'src/types/user';
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
  role: IUserRoles;
};

type AuthActionsType = {
  login: (email: string) => Promise<void>;
  register: (name: string, walletAddress: string, email?: string) => Promise<void>;
  logout: () => Promise<void>;
  loginWallet: (walletAddress: string) => Promise<void>;
  disconnectWallet: () => void;
};

export type AuthStoreType = AuthStateType & AuthActionsType;

const initialState: AuthStateType = {
  user: null,
  loading: true,
  walletName: undefined,
  isAuthenticated: false,
  isInitialized: false,
  role: {
    isDonor: false,
    isFieldAgent: false,
    isStakeholder: false,
  },
};

const useAuthStore = create<AuthStoreType>((set) => ({
  ...initialState,
  loginWallet: async (walletAddress: string) => {
    try {
      const user = await AuthService.loginWallet(walletAddress);
      console.log(user.data);
      if (user.data) {
        set({
          user: user.data,
          loading: false,
          isAuthenticated: true,
          isInitialized: true,
          error: null,
        });
        setUser(user.data);
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
  register: async (name: string, walletAddress: string, email: string) => {
    const data = {
      email: email || null,
      name,
      walletAddress,
    };

    try {
      const response = await AuthService.register(data);

      const { user } = response.data;

      sessionStorage.setItem('accessToken', user?.walletAddress);

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
