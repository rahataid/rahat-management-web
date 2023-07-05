import {
  Mode,
  TransactionItem,
  TransactionsList,
  TransactionStats
} from 'src/types/transactions';

export const transactionsList: TransactionsList = [
  {
    timestamp: '1688489466',
    hash: '0x123456abcde',
    beneficiary: 1,
    amount: 100,
    ward: 1,
    method: 'Method 1',
    mode: Mode.online,
  },
  {
    timestamp: '1688489468',
    hash: '0x223456abcde',
    beneficiary: 2,
    amount: 200,
    ward: 2,
    method: 'Method 2',
    mode: Mode.online,
  },
  {
    timestamp: '1688489470',
    hash: '0x323456abcde',
    beneficiary: 3,
    amount: 300,
    ward: 3,
    method: 'Method 3',
    mode: Mode.offline,
  },
];

export const transaction: TransactionItem = {
  timestamp: '1688489466',
  hash: '0x123456abcde',
  beneficiary: 1,
  amount: 100,
  ward: 1,
  method: 'hello',
  mode: Mode.online,
};

// TODO:this should be objects, not array, the cards should be placed manually not by mapping,
export const transactionStats: TransactionStats = {
  bankedCash: 100,
  unbankedCash: 200,
  bankedToken: 300,
  unbankedToken: 400
}
