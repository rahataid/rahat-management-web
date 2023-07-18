export enum CAMPAIGN_TYPES {
  EMAIL = 'EMAIL',
  SMS = 'SMS',
  PHONE = 'PHONE',
}

export enum CAMPAIGN_STATUS {
  ONGOING = 'ONGOING',
  COMPLETED = 'COMPLETED',
  CANCELLED = 'CANCELLED',
  SCHEDULED = 'SCHEDULED',
}

export enum COMMUNICATION_DELIVERY_STATUS {
  QUEUED = 'QUEUED',
  COMPLETED = 'COMPLETED',
  NO_ANSWER = 'NO_ANSWER',
  BUSY = 'BUSY',
  FAILED = 'FAILED',
}

export type ICampaignItem = {
  name: string;
  createdAt: string;
  id: number;
  transport: string;
  type: CAMPAIGN_TYPES;
  status: CAMPAIGN_STATUS;
  totalAudiences: number;
};

export type ICampaigns = ICampaignItem[];

export type ICampaignsTableFilterValue = string | string[];

export type ICampaignPagination = {
  currentPage?: number;
  total?: number;
  perPage: number;
  lastPage?: number;
};

export type ICampaignsListApiResponse = {
  meta: ICampaignPagination;
  rows: ICampaignItem[];
};

export interface CampaignssListHookReturn {
  campaigns: ICampaignsListApiResponse['rows'];
  isLoading: boolean;
  error: any;
  meta: ICampaignsListApiResponse['meta'];
}

export type IFilterOptions = string[];
