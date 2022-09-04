import { makeAutoObservable, runInAction } from "mobx";
import { ICard } from "../models/Card";
import CardService from "../services/CardService";

class CardStore {
  cardService: CardService;
  cards: ICard[] = [];
  card: ICard = {} as ICard;
  status: string = "initial";

  constructor() {
    this.cardService = new CardService();
    makeAutoObservable(this);
  }

  getCards = async () => {
    try {
      const data = await this.cardService.getList();
      runInAction(() => {
        this.cards = data;
      });
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };
  getCard = async (id: number) => {
    try {
      const data = await this.cardService.get(id);
      runInAction(() => {
        this.card = data;
      });
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };
  createCard = async (card: ICard) => {
    try {
      const response = await this.cardService.post(card);
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

  updateCard = async (card: ICard) => {
    try {
      const response = await this.cardService.put(card);
      if (response.status === 200) {
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
}

export default CardStore;
