import { makeAutoObservable } from "mobx";
import { createContext, ReactNode, useContext } from "react";
import AccountStore from "./AccountStore";
import CardStore from "./CardStore";
import ProfileStore from "./ProfileStore";
import TransactionStore from "./Transactions";
import UserStore from "./UserStore";

export class RootStore {
  cardStore: CardStore;
  accountStore: AccountStore;
  userStore: UserStore;
  profileStore: ProfileStore;
  transactionStore: TransactionStore
  
  constructor() {
    makeAutoObservable(this);

    this.cardStore = new CardStore();
    this.accountStore = new AccountStore();
    this.userStore = new UserStore();
    this.profileStore = new ProfileStore();
    this.transactionStore = new TransactionStore()
  }
}

interface IStoreProviderProps {
  store: RootStore;
  children: ReactNode;
}

export const StoreContext = createContext<RootStore>({} as RootStore);

export const StoreProvider = ({ store, children }: IStoreProviderProps) => (
  <StoreContext.Provider value={store}>{children}</StoreContext.Provider>
);

export const useStore = () => {
  return useContext<RootStore>(StoreContext);
};

export default RootStore;
