import { axiosInstance, endpoints } from '@utils/axios';

const AppSettingService = {
  getBlockchainSettings: () => axiosInstance.get(endpoints.appSettings.blockchain),
  getContracts: () => axiosInstance.get(endpoints.appSettings.contracts),
};

export default AppSettingService;
