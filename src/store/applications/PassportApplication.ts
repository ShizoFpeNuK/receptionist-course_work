import { makeAutoObservable } from "mobx";
import { IPassportApplicationInfo } from "../../models/types/applications.model";


class PassportApplicationStore {
  applications: IPassportApplicationInfo[] = [];

  constructor() {
    makeAutoObservable(this);
  }


  setApplications(applications: IPassportApplicationInfo[]) {
    this.applications = applications;
  }

  deleteApplications() {
    this.applications = [];
  }


  clearStore() {
    this.deleteApplications();
  }
};


export default PassportApplicationStore;