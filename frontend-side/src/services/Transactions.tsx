import { api } from "./api";

const TRANSACTIONS_API = api + 'Transactions'

class TransactionsService {

  getList = async () => {
    const response = await fetch(TRANSACTIONS_API, {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    });
    return response.json();
  };
}

export default TransactionsService;
