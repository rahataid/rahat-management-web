import {
  Gender,
  IBeneficiaryClaimsDetails,
  IBeneficiaryDetails,
  IBeneficiaryDetailsTableList,
  IDistributionPoint,
  IStatusFilterOptions,
  ITokenAssignedFilterOptions,
  ITokenClaimedFilterOptions,
} from 'src/types/beneficiaries';
import { _mock } from './_mock';

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
  gender: Gender.MALE,
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
