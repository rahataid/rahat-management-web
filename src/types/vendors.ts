export type IVendorItem = {
  id: number;
  name: string;
  // todo: make it array of objects
  projectInvolved: string;
  phone: string;
  address: string;
};

export type IVendors = IVendorItem[];
