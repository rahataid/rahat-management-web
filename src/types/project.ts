export enum PROJECT_TYPE {
  ANTICIPATORY_ACTION = 'ACTIVE',
  CRISIS_RESPONSE = 'INACTIVE',
  MICRO_LOANS = 'MICRO_LOANS',
  SOCIAL_PROTECTION = 'SOCIAL_PROTECTION',
  SPECIAL_PROJECT = 'SPECIAL_PROJECT',
  UBI = 'UBI',
}
export enum GENDER {
  MALE = 'MALE',
  FEMALE = 'FEMALE',
  OTHER = 'OTHER',
  UNKNOWN = 'UNKNOWN',
}

export type IProjectItem = {
  id: number;
  budget: number;
  contractAddress: string;
  name: string;
  createdAt: string | Date;
  startDate: string | Date;
  endDate: string | Date;
  isApproved: boolean;
  coverImage?: string;
  description: string;
};

export type IProjectsPagination = {
  currentPage?: number;
  total?: number;
  perPage: number;
  lastPage?: number;
};

export type IProjectsList = {
  meta: IProjectsPagination;
  rows: IProjectItem[];
};

export type IProjectApiFilters = {
  name?: string;
  orderBy?: string;
  order?: 'asc' | 'desc';
  perPage?: number;
  page?: number;
};

export type IApiResponseError = {
  group: string;
  meta?: Record<string, string[]> | null;
  message: string;
  name: string;
  success: boolean;
  timestamp: number;
};

/**
 * hooks returns
 */

export interface ProjectsListHookReturn {
  projects: IProjectsList['rows'];
  loading: boolean;
  error: any;
  meta: IProjectsList['meta'];
}

export interface IProjectItemApiResponse extends IProjectItem {
  projectManager: string;
  _count: {
    beneficiaries: number;
    vendors: number;
  };
}

export interface IProjectDetailsHookReturn {
  project: IProjectItemApiResponse;
  loading: boolean;
  error: any;
}

export type IProjectCreateItem = {
  name: string;
  location: string;
  projectManager: string;
  description: string;
  startDate: string;
  endDate: string;
  projectType: string;
};

export type IProjectTypeFilterOptions = string[];

export enum BANK_STATUS {
  UNKNOWN = 'UNKNOWN',
  UNBANKED = 'UNBANKED',
  BANKED = 'BANKED',
  UNDERBANKED = 'UNDERBANKED',
}

export enum PHONE_OWNERSHIP {
  UNKNOWN = 'UNKNOWN',
  NO_PHONE = 'NO_PHONE',
  FEATURE = 'FEATURE',
  SMART = 'SMART',
}

export enum INTERNET_ACCESS {
  UNKNOWN = 'UNKNOWN',
  NO_INTERNET = 'NO_INTERNET',
  PHONE_INTERNET = 'PHONE_INTERNET',
  HOME_INTERNET = 'HOME_INTERNET',
}

export type IProjectBeneficiariesItem = {
  bankStatus: BANK_STATUS;
  internetAccess: INTERNET_ACCESS;
  latitude: number;
  longitude: number;
  name: string;
  phoneOwnership: PHONE_OWNERSHIP;
  tokensAssigned: number;
  tokensClaimed: number;
  uuid: string;
  walletAddress: string;
  isApproved:boolean | string;
  gender:GENDER;
};

export interface IProjectBeneficiariesList {
  rows: IProjectBeneficiariesItem[];
}
export type IProjectBeneficiariesPagination = {
  currentPage?: number;
  total?: number;
  perPage: number;
  lastPage?: number;
};

export interface IProjectBeneficiariesHookReturn {
  beneficiaries: IProjectBeneficiariesItem[];
  loading: boolean;
  error: any;
  meta:IProjectBeneficiariesPagination;
}
