import { axiosInstance, endpoints } from '@utils/axios';
import { IBeneficiariesCreateItem, IBeneficiaryApiFilters } from 'src/types/beneficiaries';

const BeneficiaryService = {
  list: (params?: IBeneficiaryApiFilters) =>
    axiosInstance.get(endpoints.beneficiary.list, { params }),
  create: (data: IBeneficiariesCreateItem) =>
    axiosInstance.post(endpoints.beneficiary.create, { ...data }),

  details: (uuid: string) => axiosInstance.get(endpoints.beneficiary.details(uuid)),
};

export default BeneficiaryService;
