import { IUser } from "../models/types/user.model";
import { makeAutoObservable } from "mobx";


class LoginStoreClass {
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


const loginStore = new LoginStoreClass();
export default loginStore;