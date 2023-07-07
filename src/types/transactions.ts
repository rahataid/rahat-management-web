export enum Mode {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export enum Method {
  SMS = 'SMS',
  EMAIL = 'EMAIL',
  QR = 'QR',
}

export enum Status {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE'
}

export type ITransactionItem = {
  id: number;
  timestamp: string;
  hash: string;
  method: Method;
};

export type ITransactionList = ITransactionItem[];

export type ITransactionStats = {
  bankedCash: number;
  unbankedCash: number;
  bankedToken: number;
  unbankedToken: number;
};

export type ITransactionFilter = {
  timestamp: string;
  hash: string;
  method: string;
};

export type ITransactionDetails = {
  hash: string;
  status: Status;
  timestamp: string;
  mode: Mode;
  from: string;
  to: string;
}

export type ITransactionDetailsTableItem = {
  name: string,
  amount: number,
  from: string,
  to: string
}

export type ITransactionDetailsTableList = ITransactionDetailsTableItem[];
