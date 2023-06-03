import { IUser } from "../models/types/user.model";
import { makeAutoObservable } from "mobx";


class LoginStore {
  isLogin: boolean = false;
  user: IUser | null = null;

  constructor() {
    makeAutoObservable(this);
  }


  setIsLogin(boolean: boolean) {
    this.isLogin = boolean;
  }

  setUser(user: IUser) {
    this.user = user;
  }
};


const loginStore = new LoginStore();
export default loginStore;