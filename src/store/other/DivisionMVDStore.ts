import { makeAutoObservable } from "mobx";
import { IDivisionMVD } from "../../models/types/divisionMVD.model";


class DivisionMVDStore {
  division: IDivisionMVD | null = null;
  
  constructor() {
    makeAutoObservable(this);
  }


  setDivisionMVD(division: IDivisionMVD) {
    this.division = division;
  }

  deleteDivisionMVD() {
    this.division = null;
  }


  clearStore() {
    this.deleteDivisionMVD();
  }
};


const divisionMVD = new DivisionMVDStore();
export default divisionMVD;