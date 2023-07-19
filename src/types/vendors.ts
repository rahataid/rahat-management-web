export type IVendorItem = {
  id: number;
  name: string;
  // todo: make it array of objects
  projectInvolved: string;
  phone: string;
  address: string;
};

export type IVendors = IVendorItem[];

export type IVendorsApiFilters = {
  name?: string;
  projectInvolved?: string;
  phone?: string;
  address?: string;
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

export interface VendorsListHookReturn {
  vendors: IVendorsList['rows'];
  loading: boolean;
  error: any;
  meta: IVendorsList['meta'];
}
