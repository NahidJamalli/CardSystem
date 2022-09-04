import { makeAutoObservable, runInAction } from "mobx";
import { ITransactions } from "../models/Transaction";
import TransactionsService from "../services/Transactions";

class TransactionStore {
  transactionService: TransactionsService;
  transactions: ITransactions[] = [];
  status: string = "initial";

  constructor() {
    this.transactionService = new TransactionsService();
    makeAutoObservable(this);
  }
  getTransactions = async () => {
    try {
      const data = await this.transactionService.getList();
      runInAction(() => {
        this.transactions = data;
      });
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };
}

export default TransactionStore;
