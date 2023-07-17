import { axiosInstance, endpoints } from '@utils/axios';
import { IBeneficiaryApiFilters } from 'src/types/beneficiaries';

const VendorsService = {
  list: (params?: IBeneficiaryApiFilters) => axiosInstance.get(endpoints.vendors.list, { params }),
};

export default VendorsService;
