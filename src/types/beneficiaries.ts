export enum InternetAccess {
  YES = 'YES',
  NO = 'NO',
}

export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

export enum PhoneType {
  SMARTPHONE = 'SMARTPHONE',
  FEATUREPHONE = 'FEATUREPHONE',
  DUMBPHONE = 'DUMBPHONE',
}

export enum Village {
  DARCHULA = 'DARCHULA',
  MORANG = 'MORANG',
  BIRENDRANAGAR = 'BIRENDRANAGAR',
}

export enum Gender {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHERS = 'OTHERS',
  UNKNOWN = 'UNKNOWN',
}

export enum BANK_STATUS {
  UNKNOWN = 'UNKNOWN',
  UNBANKED = 'UNBANKED',
  BANKED = 'BANKED',
  UNDERBANKED = 'UNDERBANKED',
}

export enum PHONE_STATUS {
  UNKNOWN = 'UNKNOWN',
  NO_PHONE = 'NO_PHONE',
  FEATURE_PHONE = 'FEATURE_PHONE',
  SMART_PHONE = 'SMART_PHONE',
}

export enum INTERNET_STATUS {
  UNKNOWN = 'UNKNOWN',
  NO_INTERNET = 'NO_INTERNET',
  PHONE_INTERNET = 'PHONE_INTERNET',
  HOME_INTERNET = 'HOME_INTERNET',
}

export type IBeneficiariesTableFilters = {
  distributionPoint: string[];
  status: string[];
  tokenAssignedStatus: string[];
  tokenClaimedStatus: string[];
  name: string;
};

export type IBeneficiariesTableFilterValue = string | string[];

export type IBeneficiariesItem = {
  name: string;
  cnicNumber: number;
  hasInternetAccess: InternetAccess.YES;
  status: Status.ACTIVE;
  tokensAssigned: number;
  tokensClaimed: number;
  distributionPoint: string;
  address: string;
};

export type IBeneficiariesList = IBeneficiariesItem[];

export type IDistributionPoint = string[];

export type IStatusFilterOptions = string[];

export type ITokenAssignedFilterOptions = string[];

export type ITokenClaimedFilterOptions = string[];

export type IBeneficiaryDetails = {
  name: string;
  phone: number;
  gender: Gender.MALE;
  cnicNumber: number;
  district: string;
  dailyWaterConsumption: number;
  dailyDistanceCovered: number;
  status: Status.ACTIVE;
};

export type IBeneficiaryClaimsDetails = {
  claimedDate: string;
  receivedDate: string;
  claimedAmount: number;
  receivedAmount: number;
  walletAddress: string;
};

export type IBeneficiaryDetailsTableItem = {
  timestamp: string;
  hash: string;
  event: string;
  amount: number;
};

export type IBeneficiaryDetailsTableList = IBeneficiaryDetailsTableItem[];

export type IBeneficiariesCreateItem = {
  name: string;
  phoneNumber: string;
  cnicNumber?: string;
  gender: Gender;
  village: Village;
  phoneOwnership: string;
  phoneStatus: PhoneType;
  bankStatus: BANK_STATUS;
  internetStatus: INTERNET_STATUS;
  dob: string;
  walletAddress: string;
  longitude: number;
  latitude: number;
};

export type IVillageFilterOptions = string[];

export type IGenderFilterOptions = string[];

export type IPhoneTypeFilterOptions = string[];
