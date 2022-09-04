import { makeAutoObservable, reaction, runInAction } from "mobx";
import { ILogin } from "../models/Login";
import UserService from "../services/UserService";

class LoginStore {
  userService: UserService;
  token: string = String(localStorage.getItem('token'));
  status: string = "initial";

  constructor() {
    this.userService = new UserService();
    makeAutoObservable(this);
  }

  login = async (user: ILogin) => {
    try {
      const result = await this.userService.post(user);
      runInAction(() => {
        localStorage.setItem('token', result.accessToken)
        this.token = result.accessToken;
      });
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };
  logout = async () => {
    try {
      runInAction(() => {
        localStorage.setItem('token','')
        this.token = "";
      });
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };
  newPassword = async (email: any) => {
    try {
      const result = await this.userService.postNewPassword(email);
      runInAction(() => {
        this.token = result.accessToken;
      });
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };
}

export default LoginStore;
