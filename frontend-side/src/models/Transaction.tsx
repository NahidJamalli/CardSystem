export interface ITransactions {
    id: number
    amount: number
    type: string,
    cardNumber: string,
    vendor: IVendor
}

export interface IVendor {
    id: number,
    name: string,
    addresses: string[],
    contacts: string[]
}