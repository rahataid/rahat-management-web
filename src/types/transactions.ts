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

export type TransactionItem = {
  id: number;
  timestamp: string;
  hash: string;
  method: Method;
};

export type TransactionList = TransactionItem[];

export type TransactionStats = {
  bankedCash: number;
  unbankedCash: number;
  bankedToken: number;
  unbankedToken: number;
};

export type TransactionFilter = {
  timestamp: string;
  hash: string;
  method: string;
};

export type TransactionDetails = {
  hash: string;
  status: Status;
  timestamp: string;
  mode: Mode;
  from: string;
  to: string;
}
