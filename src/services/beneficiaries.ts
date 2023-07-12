import { axiosInstance, endpoints } from '@utils/axios';
import { IBeneficiaryApiFilters } from 'src/types/beneficiaries';

const BeneficiaryService = {
  list: (params?: IBeneficiaryApiFilters) =>
    axiosInstance.get(endpoints.beneficiary.list, { params }),
};

export default BeneficiaryService;
