import { makeAutoObservable, reaction, runInAction } from "mobx";
import { IPasswords, IProfile } from "../models/Profile";
import ProfileService from "../services/ProfileService";

class ProfileStore {
  profileService: ProfileService;
  user: IProfile = {} as IProfile
  status: string = "initial";

  constructor() {
    this.profileService = new ProfileService();
    makeAutoObservable(this);
  }

  getProfile = async () => {
    try {
      const data = await this.profileService.get();
      runInAction(() => {
        this.user = data;
      });
    } catch (error) {
      runInAction(() => {
        this.status = "error";
      });
    }
  };
  changeProfile = async (profile: IProfile) => {
    try {
      const response = await this.profileService.updateProfile(profile);
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
  changePassword = async (password: IPasswords) => {
    try {
      const response = await this.profileService.updatePassword(password);
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

export default ProfileStore;
