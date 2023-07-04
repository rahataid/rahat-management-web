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
    beneficiary: number,
    amount: number,
    ward: number,
    method: string,
    mode: Mode
}
  
export type TransactionsList = TransactionItem[];

export type TransactionStatsItem = {
    transactionType: TransactionType,
    total: number,
    beneficiaryType: BeneficiaryType
}

export type TransactionStatsList = TransactionStatsItem[];
  