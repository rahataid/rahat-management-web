export enum PROJECT_TYPE {
  ANTICIPATORY_ACTION = 'ACTIVE',
  CRISIS_RESPONSE = 'INACTIVE',
  MICRO_LOANS = 'MICRO_LOANS',
  SOCIAL_PROTECTION = 'SOCIAL_PROTECTION',
  SPECIAL_PROJECT = 'SPECIAL_PROJECT',
  UBI = 'UBI',
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
