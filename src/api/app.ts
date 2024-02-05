import { useQuery } from '@tanstack/react-query';
import { isEmpty } from 'lodash';
import useAuthStore from 'src/store/auths';
import AppSettingService from '../services/app-settings';
import useAppStore from '../store/app';

export const useAppSettings = () => {
  const appStore = useAppStore();
  const { tokens } = useAuthStore.getState();

  const { data: settings, ...rest } = useQuery(
    ['settings'],
    async () => {
      const [contractsResponse, blockchainResponse] = await Promise.all([
        AppSettingService.getContracts(),
        AppSettingService.getBlockchainSettings(),
      ]);
      return {
        contracts: contractsResponse.data?.value,
        blockchain: blockchainResponse.data?.value,
      };
    },
    {
      onSuccess: (data) => {
        appStore.setContracts(data.contracts);
        appStore.setBlockchain(data.blockchain);
      },
      enabled: !!tokens?.access_token && isEmpty(appStore.blockchain && appStore.contracts),
    }
  );

  return {
    settings,
    ...rest,
  };
};
