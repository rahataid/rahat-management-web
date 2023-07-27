import AppSettingService from '@services/app-settings';
import { IAppSettingsContractsApiResponse, IAppSettingsNetwork } from 'src/types/app-settings';
import { create } from 'zustand';

export type AppStateType = {
  contracts: IAppSettingsContractsApiResponse | undefined;
  blockchain: IAppSettingsNetwork | undefined;
};

type AppActionsType = {
  setContracts: () => Promise<void>;
  setBlockchain: () => Promise<void>;
};

export type AppStoreType = AppStateType & AppActionsType;

const useAppStore = create<AppStoreType>((set) => ({
  contracts: undefined,
  blockchain: undefined,
  setContracts: async () => {
    const { data } = await AppSettingService.getBlockchainSettings();

    set({ contracts: data?.value });
  },
  setBlockchain: async () => {
    const { data } = await AppSettingService.getContracts();
    const blockchain = {
      chainId: data?.chainId,
      chainName: data?.chainName,
      rpcUrls: [data?.networkUrl],
      nativeCurrency: {
        name: data?.nativeCurrency?.name,
        symbol: data?.nativeCurrency?.symbol,
        decimals: data?.nativeCurrency?.decimals,
      },
      blockExplorerUrls: [data?.blockExplorerUrls],
    };
    set({ blockchain });
  },
}));

export default useAppStore;
