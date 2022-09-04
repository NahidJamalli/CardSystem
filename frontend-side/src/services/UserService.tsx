import { ILogin } from "../models/Login";
import { api } from "./api";

const USER_API = api + "Auth"

class UserService {
  post = async (user: ILogin) => {
    const response = await fetch(USER_API + "/login", {
      method: "POST",
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify(user),
    });
    return response.json();
  };
  postNewPassword = async (email: ILogin) => {
    const response = await fetch(USER_API + "/new-password", {
      method: "POST",
      headers: { "Content-Type": 'application/json' },
      body: JSON.stringify(email),
    });
    return response.json();
  };
}

export default UserService;
