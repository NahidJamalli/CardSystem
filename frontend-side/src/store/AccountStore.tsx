import { makeAutoObservable, runInAction } from "mobx";
import { IAccount, IAccountAmount } from "../models/Account";
import AccountService from "../services/AccountService";

class AccountStore {
  accountService: AccountService;
  accounts: IAccount[] = [];
  account: IAccount = {} as IAccount;
  status: string = "initial";

  constructor() {
    this.accountService = new AccountService();
    makeAutoObservable(this);
  }

  getAccounts = async () => {
    try {
      const data = await this.accountService.getList();
      runInAction(() => {
        this.accounts = data;
      });
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };
  createAccount = async (account: IAccount) => {
    try {
      const response = await this.accountService.post(account);
      if (response.status === 201) {
        runInAction(() => {
          this.status = "success";
        });
      }
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };
  createAmount = async(amount:IAccountAmount)=>{
    try {
      const response = await this.accountService.postAmount(amount);
      if (response.status === 201) {
        runInAction(() => {
          this.status = "success";
        });
      }
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  }
}

export default AccountStore;
