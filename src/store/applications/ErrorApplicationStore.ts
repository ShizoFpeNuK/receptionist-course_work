import { IErrorApplication } from "../../models/types/errorApplication";
import { makeAutoObservable } from "mobx";


class ErrorApplicationStore {
  errorApplication: IErrorApplication | null = null;
  isApplicantionReady: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }


  setErrorApplication(errorApplication: IErrorApplication) {
    this.errorApplication = errorApplication;
  }

  setIsApplicantionReady(boolean: boolean) {
    this.isApplicantionReady = boolean;
  }


  deleteErrorApplication() {
    this.errorApplication = null;
  }

  deleteIsApplicantionReady() {
    this.isApplicantionReady = false;
  }



  clearStore() {
    this.deleteErrorApplication();
    this.deleteIsApplicantionReady();
  }
};



export default ErrorApplicationStore;