import { axiosInstance, endpoints } from '@utils/axios';
import { IBeneficiaryApiFilters } from 'src/types/beneficiaries';
import { IVendorDetails } from 'src/types/vendors';

const VendorsService = {
  list: (params?: IBeneficiaryApiFilters) => axiosInstance.get(endpoints.vendors.list, { params }),
  details: (walletAddress: string) => axiosInstance.get(endpoints.vendors.details(walletAddress)),
  update: (walletAddress: string,data:IVendorDetails) =>
    axiosInstance.patch(endpoints.vendors.update(walletAddress), { ...data }),
  changeVendorState: (walletAdddress: string) =>
    axiosInstance.patch(endpoints.vendors.changeVendorState(walletAdddress)),
};

export default VendorsService;
