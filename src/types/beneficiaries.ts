export enum GENDER {
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

export type IBeneficiaryApiFilters = {
  status?: string;
  name?: string;
  gender?: GENDER;
  internetStatus?: INTERNET_STATUS | string;
  bankStatus?: BANK_STATUS | string;
  phoneStatus?: PHONE_STATUS | string;
  orderBy?: string;
  order?: 'asc' | 'desc';
  perPage?: number;
  page?: number;
};

export type IBeneficiariesTableFilterValue = string | string[];

export type IBeneficiaryPagination = {
  currentPage?: number;
  total?: number;
  perPage: number;
  lastPage?: number;
};

export type IBeneficiariesItem = {
  bankStatus: BANK_STATUS;
  createdAt: string;
  deletedAt: string | null;
  internetStatus: INTERNET_STATUS;
  isApproved: boolean;
  latitude: number;
  longitude: number;
  name: string;
  phone: string | null;
  phoneStatus: PHONE_STATUS;
  tokensAssigned: number;
  tokensClaimed: number;
  updatedAt: string;
  uuid: string;
  walletAddress: string;
};

export type IBeneficiariesList = {
  meta: IBeneficiaryPagination;
  rows: IBeneficiariesItem[];
};

export interface BeneficiariesListHookReturn {
  beneficiaries: IBeneficiariesList['rows'];
  loading: boolean;
  error: any;
  meta: IBeneficiariesList['meta'];
}

export type IFilterOptions = string[];

export type IVillageFilterOptions = string[];

export type IGenderFilterOptions = string[];

export type IPhoneStatusFilterOptions = string[];

export type IBankStatusFilterOptions = string[];

export type IBeneficiaryDetails = {
  address: {
    location: string;
  };
  bankStatus: string;
  createdAt: string;
  deletedAt: string | null;
  dob: string | null;
  email: string | null;
  gender: string;
  id: number;
  internetStatus: string;
  isApproved: boolean;
  latitude: number;
  longitude: number;
  name: string;
  phone: string | null;
  phoneStatus: string;
  tokensAssigned: number;
  tokensClaimed: number;
  updatedAt: string;
  uuid: string;
  walletAddress: string;
  _count: {
    projects: number;
  };
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
  phone?: string;
  gender: GENDER;
  phoneOwnership: string;
  phoneStatus: PHONE_STATUS;
  bankStatus: BANK_STATUS;
  internetStatus: INTERNET_STATUS;
  dob: string;
  walletAddress: string;
  longitude: number;
  latitude: number;
};

export type IApiResponseError = {
  group: string;
  meta?: string | null;
  message: string;
  name: string;
  success: boolean;
  timestamp: number;
};
