import {
  Gender,
  IBeneficiariesList,
  IBeneficiaryClaimsDetails,
  IBeneficiaryDetails,
  IBeneficiaryDetailsTableList,
  IDistributionPoint,
  IGenderFilterOptions,
  IPhoneTypeFilterOptions,
  IStatusFilterOptions,
  ITokenAssignedFilterOptions,
  ITokenClaimedFilterOptions,
  IVillageFilterOptions,
  InternetAccess,
  Status,
} from 'src/types/beneficiaries';
import { _mock } from './_mock';

export const beneficiariesList: IBeneficiariesList = [...Array(30)].map((_, index) => ({
  name: `Beneficiary Name ${index}`,
  cnicNumber: index,
  hasInternetAccess: InternetAccess.YES,
  status: Status.ACTIVE,
  tokensAssigned: 200,
  tokensClaimed: 300,
  distributionPoint: 'Kathmandu',
  address: '0x11111abcde',
}));

export const distributionPointOptions: IDistributionPoint = ['Kathmandu', 'Pokhara', 'Hetauda'];

export const statusFilterOptions: IStatusFilterOptions = ['ACTIVE', 'INACTIVE'];

export const tokenAssignedFilterOptions: ITokenAssignedFilterOptions = [
  'ASSIGNED ACTIVE',
  'ASSIGNED INACTIVE',
];

export const tokenClaimedFilterOptions: ITokenClaimedFilterOptions = [
  'CLAIMED ACTIVE',
  'CLAIMED INACTIVE',
];

export const beneficiaryDetails: IBeneficiaryDetails = {
  name: 'Cristiano Ronaldo',
  phone: 9841123456,
  gender: Gender.MALE,
  cnicNumber: 70707070707,
  district: 'Darchula',
  dailyWaterConsumption: 100,
  dailyDistanceCovered: 20,
  status: Status.ACTIVE,
};

export const beneficiaryClaimsDetails: IBeneficiaryClaimsDetails = {
  claimedDate: '07/Jul/2023',
  receivedDate: '07/Jul/2023',
  claimedAmount: 200,
  receivedAmount: 100,
  walletAddress: '0x77777abcde',
};

export const beneficiaryTransactionList: IBeneficiaryDetailsTableList = [...Array(30)].map(
  (_, index) => ({
    timestamp: String(_mock.time(index)),
    hash: `0x11111abcde${index}`,
    event: 'Currency Exchange Event',
    amount: 200000,
  })
);

export const villageFilterOptions: IVillageFilterOptions = ['DARCHULA', 'MORANG', 'BIRENDRANAGAR'];

export const genderFilterOptions: IGenderFilterOptions = ['MALE', 'FEMALE', 'OTHERS'];

export const phoneTypeFilterOptions: IPhoneTypeFilterOptions = [
  'SMARTPHONE',
  'FEATUREPHONE',
  'DUMBPHONE',
];
