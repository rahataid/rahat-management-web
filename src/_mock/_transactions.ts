import { Method, TransactionItem, TransactionList, TransactionStats } from 'src/types/transactions';
import { _mock } from './_mock';

export const transactionList: TransactionList = [...Array(30)].map((_, index) => ({
  id: index,
  timestamp: String(_mock.time(index)),
  hash: `0x11111111111aa${index}`,
  method: Method.QR,
}));

export const transaction: TransactionItem = {
  id: 2,
  timestamp: '1688489466',
  hash: '0x123456abcde',
  method: Method.QR,
};

export const transactionStats: TransactionStats = {
  bankedCash: 100,
  unbankedCash: 200,
  bankedToken: 300,
  unbankedToken: 400,
};
