import {
  BANK_STATUS,
  Gender,
  IBeneficiaryClaimsDetails,
  IBeneficiaryDetails,
  IBeneficiaryDetailsTableList,
  IFilterOptions,
  INTERNET_STATUS,
  PHONE_STATUS,
} from 'src/types/beneficiaries';

export const internetAccessOptions: IFilterOptions = Object.values(INTERNET_STATUS) as string[];

export const bankStatusOptions: IFilterOptions = Object.values(BANK_STATUS) as string[];
export const phoneStatusOptions: IFilterOptions = Object.values(PHONE_STATUS) as string[];

export const beneficiaryDetails: IBeneficiaryDetails = {
  name: 'Cristiano Ronaldo',
  gender: Gender.MALE,
  dob: '07/Jul/2023',
  phone: '0123456789',
  email: '',
  address: {
    location: '213',
  },
  bankStatus: BANK_STATUS.BANKED,
  phoneStatus: PHONE_STATUS.FEATURE_PHONE,
  internetStatus: INTERNET_STATUS.HOME_INTERNET,
  tokensClaimed: 20,
  tokensAssigned: 20,
  isApproved: true,
  walletAddress: '0xwe123',
  latitude: 2002312,
  longitude: 123123,
  createdAt: '23123',
  updatedAt: '23123',
  id: 2,
  uuid: '213123hasd23210',
  _count: {
    projects: 22,
  },
  deletedAt: null,
};

export const beneficiaryClaimsDetails: IBeneficiaryClaimsDetails = {
  claimedDate: '07/Jul/2023',
  receivedDate: '07/Jul/2023',
  claimedAmount: 200,
  receivedAmount: 100,
  walletAddress: '0x77777abcde',
};

export const beneficiaryTransactionList: IBeneficiaryDetailsTableList = [];
