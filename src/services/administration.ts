import { axiosInstance, endpoints } from '@utils/axios';
import { IUsersApiFilters } from 'src/types/administration';

const AdministrationService = {
  list: (params?: IUsersApiFilters) =>
    axiosInstance.get(endpoints.administration.users.list, { params }),
  approve: (walletAddress: string) =>
    axiosInstance.patch(endpoints.administration.users.approve(walletAddress)),
};

export default AdministrationService;
