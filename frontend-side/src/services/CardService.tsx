import { ICard } from "../models/Card";
import { api } from "./api";
const CARD_API = api + "Cards"
class CardService {
  getList = async () => {
    const response = await fetch(CARD_API, {
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        "Content-Type": 'application/json'
      },
    });
    return response.json();
  };

  get = async (id: number) => {
    const response = await fetch(CARD_API + "/" + id);
    return response.json();
  };

  post = async (card: ICard) => {
    const response = await fetch(CARD_API, {
      method: "POST",
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(card),
    });
    return response;
  };
  put = async (card: ICard) => {
    const response = await fetch(CARD_API, {
      method: "PUT",
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(card),
    });
    return response;
  };

}

export default CardService;
