import {
  TransactionItem,
  TransactionList,
  TransactionStats
} from 'src/types/transactions';

export const transactionList: TransactionList = [
  {
    timestamp: '1688489466',
    hash: '0x123456abcde',
    method: 'Method 1',
  },
  {
    timestamp: '1688489468',
    hash: '0x223456abcde',
    method: 'Method 2',
  },
  {
    timestamp: '1688489470',
    hash: '0x323456abcde',
    method: 'Method 3',
  },
];

export const transaction: TransactionItem = {
  timestamp: '1688489466',
  hash: '0x123456abcde',
  method: 'hello',
};

// TODO:this should be objects, not array, the cards should be placed manually not by mapping,
export const transactionStats: TransactionStats = {
  bankedCash: 100,
  unbankedCash: 200,
  bankedToken: 300,
  unbankedToken: 400
}
