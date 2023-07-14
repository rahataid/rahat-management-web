import {
  BANK_STATUS,
  GENDER,
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

export const genderOptions: IFilterOptions = Object.values(GENDER) as string[];

export const beneficiaryDetails: IBeneficiaryDetails = {
  address: {
    location: 'Darchula',
  },
  bankStatus: BANK_STATUS.BANKED,
  createdAt: '123456',
  dob: '01-01-1990',
  email: 'cr7@ronaldo.com',
  gender: GENDER.MALE,
  id: 7,
  internetStatus: INTERNET_STATUS.HOME_INTERNET,
  isApproved: true,
  latitude: 100,
  longitude: 200,
  name: 'Cristiano Ronaldo',
  walletAddress: '0x0002',
  uuid: '213123hasd23210',
  tokensClaimed: 20,
  tokensAssigned: 10,
  _count: {
    projects: 22,
  },
  deletedAt: null,
  updatedAt: '21312',
  phone: '23123',
  phoneStatus: PHONE_STATUS.FEATURE,
};

export const beneficiaryClaimsDetails: IBeneficiaryClaimsDetails = {
  claimedDate: '07/Jul/2023',
  receivedDate: '07/Jul/2023',
  claimedAmount: 200,
  receivedAmount: 100,
  walletAddress: '0x77777abcde',
};

export const beneficiaryTransactionList: IBeneficiaryDetailsTableList = [];
