export type IOwner = {
  name: string;
  id: number;
};

export type IProject = {
  name: string;
  id: number;
  isApproved: boolean;
  owner: IOwner[];
  projectType: string;
};

export type IAddress = {
  location: string;
};

export type IVendorItem = {
  id: number;
  name: string;
  isApproved: boolean;
  phone: string;
  address: string;
  walletAddress: string;
  isActive:boolean;
};

export type IVendorDetails = {
  name: string;
  phone: string;
  walletAddress: string;
  projects: IProject[];
  email: string;
  address: IAddress;
  isApproved: boolean;
  isActive:boolean;
  createdAt: string;
  updatedAt?: string;
  deletedAt?: string;
};

export type IVendors = IVendorItem[];

export type IVendorsApiFilters = {
  orderBy?: string;
  order?: 'asc' | 'desc';
  perPage?: number;
  page?: number;
};

export type IVendorsPagination = {
  currentPage?: number;
  total?: number;
  perPage: number;
  lastPage?: number;
};

export type IVendorsList = {
  meta: IVendorsPagination;
  rows: IVendors;
};

/**
 * hooks returns
 */

export interface IVendorsListHookReturn {
  vendors: IVendorsList['rows'];
  loading: boolean;
  error: any;
  meta: IVendorsList['meta'];
}

export interface IVendorDetailsHookReturn {
  vendor: IVendorDetails;
  isLoading: boolean;
  error: any;
}
