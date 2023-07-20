export enum Mode {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export enum Method {
  SMS = 'SMS',
  EMAIL = 'EMAIL',
  QR = 'QR',
}

export enum txStatus {
  SUCCESS = 'SUCCESS',
  PENDING = 'PENDING',
  NEW = 'NEW',
  FAIL = 'FAIL',
  ERROR = 'ERROR',
}

export type ITransactionItem = {
  id: number;
  timestamp: string;
  txHash: string;
  method: Method;
};

export type ITransactionStats = {
  bankedCash: number;
  unbankedCash: number;
  bankedToken: number;
  unbankedToken: number;
};

export type ITransactionFilter = {
  timestamp: string;
  txHash: string;
  method: string;
};

export type ITransactionDetails = {
  txHash: string;
  txStatus: txStatus;
  timestamp: string;
  mode: Mode;
  from: string;
  to: string;
};

export type ITransactionDetailsTableItem = {
  name: string;
  amount: number;
  from: string;
  to: string;
};

export type ITransactionDetailsTableList = ITransactionDetailsTableItem[];

export type ITransactionApiFilters = {
  orderBy?: string;
  order?: 'asc' | 'desc';
  perPage?: number;
  page?: number;
};

export type ITransactionTableFilterValue = string | string[];

export type ITransactionPagination = {
  currentPage?: number;
  total?: number;
  perPage: number;
  lastPage?: number;
};

export type ITransactionList = {
  meta: ITransactionPagination;
  rows: ITransactionItem[];
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

export interface ITransactionListHookReturn {
  transactions: ITransactionList['rows'];
  transactionStats: ITransactionStats;
  loading: boolean;
  error: any;
  meta: ITransactionList['meta'];
}

export interface ITransactionDetailsHookReturn {
  transaction: ITransactionDetails;
  isLoading: boolean;
  error: any;
}
