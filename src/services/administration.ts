import { axiosInstance, endpoints } from '@utils/axios';
import { IUsersApiFilters } from 'src/types/administration';

const AdministrationService = {
  list: (params?: IUsersApiFilters) =>
    axiosInstance.get(endpoints.administration.users.list, { params }),
};

export default AdministrationService;