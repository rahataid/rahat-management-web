export enum Mode {
  ONLINE = 'ONLINE',
  OFFLINE = 'OFFLINE',
}

export enum Method {
  SMS = 'SMS',
  EMAIL = 'EMAIL',
  QR = 'QR',
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
