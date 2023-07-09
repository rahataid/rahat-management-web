import { ITransactionDetails, ITransactionDetailsTableList, ITransactionItem, ITransactionList, ITransactionStats, Method, Mode, Status } from 'src/types/transactions';
import { _mock } from './_mock';

export const transactionList: ITransactionList = [...Array(30)].map((_, index) => ({
  id: index,
  timestamp: String(_mock.time(index)),
  hash: `0x11111111111aa${index}`,
  method: Method.QR,
}));

export const transaction: ITransactionItem = {
  id: 2,
  timestamp: '1688489466',
  hash: '0x123456abcde',
  method: Method.QR,
};

export const transactionStats: ITransactionStats = {
  bankedCash: 100,
  unbankedCash: 200,
  bankedToken: 300,
  unbankedToken: 400,
};

export const transactionDetails: ITransactionDetails = {
  hash: '0x111111abcde',
  status: Status.ACTIVE,
  timestamp: '1688489470',
  mode: Mode.ONLINE,
  from: '0x222222abcde',
  to: '0x333333abcde'
}

export const transactionDetailsTableList: ITransactionDetailsTableList = [...Array(30)].map((_, index) => ({
  name: `Transaction Name ${index}`,
  amount: 100,
  to: '0x1111',
  from: '0x2222'
}));
