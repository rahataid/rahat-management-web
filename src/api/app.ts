import { useQuery } from '@tanstack/react-query';
import { getToken } from '@utils/storage-available';
import { isEmpty } from 'lodash';
import AppSettingService from '../services/app-settings';
import useAppStore from '../store/app';

export const useAppSettings = () => {
  const appStore = useAppStore();
  const token = getToken();

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
      enabled: !!token && isEmpty(appStore.blockchain && appStore.contracts),
    }
  );

  return {
    settings,
    ...rest,
  };
};
