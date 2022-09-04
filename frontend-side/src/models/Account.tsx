export interface IAccount {
    id: number,
    balance: number,
    type: string
}

export interface IAccountAmount {
    accountId: number,
    amount: number
}