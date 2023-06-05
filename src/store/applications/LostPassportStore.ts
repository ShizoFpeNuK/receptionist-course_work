import { ILostPassport } from "../../models/types/lostPassport.model";
import { makeAutoObservable } from "mobx";


class LostPassportStore {
  lostPassportInfo: ILostPassport | null = null;
  isApplicantionReady: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }


  setLostPassportInfo(lostPassport: ILostPassport) {
    this.lostPassportInfo = lostPassport;
  }

  setIsApplicantionReady(boolean: boolean) {
    this.isApplicantionReady = boolean;
  }


  deleteLostPassportInfo() {
    this.lostPassportInfo = null;
  }

  deleteIsApplicantionReady() {
    this.isApplicantionReady = false;
  }



  clearStore() {
    this.deleteLostPassportInfo();
    this.deleteIsApplicantionReady();
  }
};



export default LostPassportStore;