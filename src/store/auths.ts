import AuthService from '@services/auths';
import { setSession } from '@utils/session';
import { localPersistStorage } from '@utils/state-storage';
import { clearToken, removeUser, removeWalletName, setToken } from '@utils/storage-available';
import { createStore } from '@utils/store-tools';
import { AuthUserType } from 'src/auth/types';
import { IUserRoles, Role } from 'src/types/user';

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
  tokens: {
    access_token: string;
    refresh_token: string;
  };
};

type AuthActionsType = {
  logout: () => Promise<void>;
  loginWallet: (walletAddress: string) => Promise<void>;
  disconnectWallet: () => void;
  setUser: (user: AuthUserType) => void;
  saveLogin: (data: { user: AuthUserType; access_token: string; refresh_token: string }) => void;
  saveAccessToken: (access_token: string) => void;
  // register:()=>Promise<void>
};

export type AuthStoreType = AuthStateType & AuthActionsType;

const initialState: AuthStateType = {
  user: null,
  loading: true,
  walletName: undefined,
  isAuthenticated: false,
  isInitialized: false,
  tokens: {
    access_token: '',
    refresh_token: '',
  },
  role: {
    isAdmin: false,
    isUser: false,
    // isAdminOrUser: false,
    // isDonor: false,
    // isFieldAgent: false,
    // isStakeholder: false,
  },
};

const useAuthStore = createStore<AuthStoreType>(
  (set) => ({
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
      set({
        user,
        loading: false,
        isAuthenticated: true,
        isInitialized: true,
        error: null,
        role: {
          isAdmin: user?.roles.includes(Role.ADMIN),
          isUser: user?.roles.includes(Role.USER),
        },
      });
    },

    logout: async () => {
      setSession(null);
      removeUser();
      clearToken();
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
    saveLogin: ({ user, access_token, refresh_token }) => {
      set({
        user,
        tokens: { access_token, refresh_token },
        loading: false,
        isAuthenticated: true,
        isInitialized: true,
        error: null,
      });
    },
    saveAccessToken: (access_token: string) => {
      set({
        tokens: { ...initialState.tokens, access_token },
      });
    },
  }),
  {
    devtoolsEnabled: true,
    persistOptions: {
      name: 'auth',
      partialize(state) {
        return {
          ...state,
          loading: true,
          isAuthenticated: false,
          isInitialized: false,
        };
      },
      storage: localPersistStorage,
    },
  }
);

export default useAuthStore;
