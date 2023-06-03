import { makeAutoObservable } from "mobx";
import { ILostPassport } from "../models/types/lostPassport";


class LostPassportStore {
  lostPassportInfo: ILostPassport | null = null;

  constructor() {
    makeAutoObservable(this);
  }


  setLostPassportInfo(lostPassport: ILostPassport | null) {
    this.lostPassportInfo = lostPassport;
  }


  deleteLostPassportInfo() {
    this.setLostPassportInfo(null);
  }
};



export default LostPassportStore;