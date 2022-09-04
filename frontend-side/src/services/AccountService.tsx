import { IAccount, IAccountAmount } from "../models/Account";
import { api } from "./api";

const ACCOUNT_API = api + 'Accounts'

class AccountService {

  getList = async () => {
    const response = await fetch(ACCOUNT_API, {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    });
    return response.json();
  };

  post = async (account: IAccount) => {
    const response = await fetch(ACCOUNT_API, {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        id: 0,
        balance: Number(account.balance),
        type: account.type
      }),
    });
    return response;
  };
  postAmount = async (amount: IAccountAmount) => {
    const response = await fetch(ACCOUNT_API + `/${amount.accountId}/cash-in`, {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        "Content-Type": 'application/json'
      },
      body: JSON.stringify({
        amount: Number(amount.amount),
      }),
    });
    return response;
  };
}

export default AccountService;
