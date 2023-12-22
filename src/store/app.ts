import { localPersistStorage } from '@utils/state-storage';
import { createStore } from '@utils/store-tools';
import { IAppSettingsContractsApiResponse, IAppSettingsNetwork } from 'src/types/app-settings';

export type AppStateType = {
  contracts: IAppSettingsContractsApiResponse | undefined;
  blockchain: IAppSettingsNetwork | undefined;
};

type AppActionsType = {
  setContracts: (data: any) => Promise<void>;
  setBlockchain: (data: any) => Promise<void>;
};

export type AppStoreType = AppStateType & AppActionsType;

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
      storage: localPersistStorage,
    },
  }
);
export default useAppStore;
