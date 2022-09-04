import { IPasswords, IProfile } from "../models/Profile";
import { api } from "./api";

const USER_API = api + "Profile"

class ProfileService {
  get = async () => {
    const response = await fetch(USER_API, {
      headers: { 'Authorization': 'Bearer ' + localStorage.getItem('token') }
    });
    return response.json();
  };

  updateProfile = async (profile: IProfile) => {
    const response = await fetch(USER_API, {
      method: "PUT",
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(profile),
    });
    return response;
  };
  updatePassword = async (passwords: IPasswords) => {
    const response = await fetch(USER_API + "/password", {
      method: "PUT",
      headers: {
        'Authorization': 'Bearer ' + localStorage.getItem('token'),
        "Content-Type": 'application/json'
      },
      body: JSON.stringify(passwords),
    });
    return response;
  };
}

export default ProfileService;
