import {
  BANK_STATUS,
  GENDER,
  IBankStatusFilterOptions,
  IBeneficiaryClaimsDetails,
  IBeneficiaryDetails,
  IBeneficiaryDetailsTableList,
  IGenderFilterOptions,
  IInternetStatusOptions,
  INTERNET_STATUS,
  IPhoneStatusFilterOptions,
  IStatusFilterOptions,
  ITokenAssignedFilterOptions,
  ITokenClaimedFilterOptions,
  PHONE_STATUS,
} from 'src/types/beneficiaries';
import { _mock } from './_mock';

export const internetAccessOptions: IInternetStatusOptions = Object.values(
  INTERNET_STATUS
) as string[];

export const phoneStatusOptions: IPhoneStatusFilterOptions = Object.values(
  PHONE_STATUS
) as string[];

export const bankStatusOptions: IBankStatusFilterOptions = Object.values(BANK_STATUS) as string[];

export const genderOptions: IGenderFilterOptions = Object.values(GENDER) as string[];

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
  address: {
    location: 'Darchula',
  },
  bankStatus: BANK_STATUS.BANKED,
  createdAt: '123456',
  deletedAt: '78901',
  dob: '01-01-1990',
  email: 'cr7@ronaldo.com',
  gender: GENDER.MALE,
  id: 7,
  internetStatus: INTERNET_STATUS.HOME_INTERNET,
  isApproved: true,
  latitude: 100,
  longitude: 200,
  name: 'Cristiano Ronaldo',
  phone: '9841414141',
  phoneStatus: PHONE_STATUS.FEATURE_PHONE,
  tokensAssigned: 100,
  tokensClaimed: 200,
  updatedAt: '12376',
  uuid: '12361923981237912asdf',
  walletAddress: '0x1231692837abcde',
  _count: {
    projects: 100,
  },
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
