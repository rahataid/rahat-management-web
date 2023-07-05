export enum Mode {
    online = 'online',
    offline = 'offline'
}

export enum TransactionType {
    'Cash Distributed' = 'Cash Distributed',
    'Token Issued' = 'Token Issued',
}

export enum BeneficiaryType {
    'Banked Beneficiary' = 'Banked Beneficiary',
    'Unbanked Beneficiary' = 'Unbanked Beneficiary',
}

export type TransactionItem = {
    timestamp: string,
    hash: string,
    method: string,
}
  
export type TransactionList = TransactionItem[];

export type TransactionStats = {
    bankedCash: number,
    unbankedCash: number,
    bankedToken: number,
    unbankedToken: number
}

export type TransactionFilter = {
    timestamp: string,
    hash: string,
    method: string,
}
  