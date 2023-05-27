import { makeAutoObservable } from "mobx";
import { ILostPassport } from "../models/types/lostPassport";


class LostPassportStore {
  lostPassportInfo: ILostPassport | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }


  setLostPassportInfo(lostPassport: ILostPassport | undefined) {
    this.lostPassportInfo = lostPassport;
  }


  deleteLostPassportInfo() {
    this.setLostPassportInfo(undefined);
  }
}



export default LostPassportStore;