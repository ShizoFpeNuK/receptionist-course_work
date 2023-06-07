import { makeAutoObservable } from "mobx";
import { IUncompletedPassportApp } from "../../models/types/uncompletedPassportApplication";


class UncompletePassportApplicationStore {
  applications: IUncompletedPassportApp[] = []

  constructor() {
    makeAutoObservable(this);
  }


  setApplications(applications: IUncompletedPassportApp[]) {
    this.applications = applications;
  }

  deleteApplications() {
    this.applications = [];
  }


  clearStore() {
    this.deleteApplications();
  }
}


export default UncompletePassportApplicationStore;