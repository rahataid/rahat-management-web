import { axiosInstance, endpoints } from '@utils/axios';
import { IBeneficiariesCreateItem, IBeneficiaryApiFilters } from 'src/types/beneficiaries';

const BeneficiaryService = {
  list: (params?: IBeneficiaryApiFilters) =>
    axiosInstance.get(endpoints.beneficiaries.list, { params }),
  create: (data: IBeneficiariesCreateItem) =>
    axiosInstance.post(endpoints.beneficiaries.create, { ...data }),

  details: (uuid: string) => axiosInstance.get(endpoints.beneficiaries.details(uuid)),
};

export default BeneficiaryService;
