import { createStore } from '@utils/store-tools';
import { IAppSettingsContractsApiResponse, IAppSettingsNetwork } from 'src/types/app-settings';
import { PersistStorage } from 'zustand/middleware';

export type AppStateType = {
  contracts: IAppSettingsContractsApiResponse | undefined;
  blockchain: IAppSettingsNetwork | undefined;
};

type AppActionsType = {
  setContracts: (data: any) => Promise<void>;
  setBlockchain: (data: any) => Promise<void>;
};

export type AppStoreType = AppStateType & AppActionsType;

const storage: PersistStorage<AppStoreType> = {
  getItem: (name) => {
    const str = localStorage.getItem(name);
    if (!str) return null;
    return JSON.parse(str);
  },
  setItem: (name, value) => {
    localStorage.setItem(name, JSON.stringify(value));
  },
  removeItem: (name) => localStorage.removeItem(name),
};

const useAppStore = createStore<AppStoreType>(
  (set) => ({
    contracts: undefined,
    blockchain: undefined,
    setContracts: async (value) => {
      // const { data } = await AppSettingService.getContracts();

      set({ contracts: value });
    },
    setBlockchain: async (value: any) => {
      // const {
      //   data: { value },
      // } = await AppSettingService.getBlockchainSettings();
      const blockchain = {
        chainId: value?.chainId,
        chainName: value?.chainName,
        chainWebSocket: value?.chainWebSocket,
        rpcUrls: [value?.rpcUrl],
        nativeCurrency: {
          name: value.nativeCurrency.name as string,
          symbol: value?.nativeCurrency?.symbol,
          decimals: value?.nativeCurrency?.decimals,
        },
      };
      set({ blockchain });
    },
  }),
  {
    devtoolsEnabled: true,
    persistOptions: {
      name: 'app-network-settings',
      storage,
    },
  }
);

export default useAppStore;
