import { IClassifierOKIN } from "../../models/types/classifiers.model";
import { makeAutoObservable } from "mobx";


class ClassifiersStore {
  classifierSex: IClassifierOKIN[] = [];
  classifierFamilyStatus: IClassifierOKIN[] = [];

  constructor() {
    makeAutoObservable(this);
  }


  setClassifierSex(classifiers: IClassifierOKIN[]) {
    this.classifierSex = classifiers;
  }

  setClassifierFamilyStatus(classifiers: IClassifierOKIN[]) {
    this.classifierFamilyStatus = classifiers;
  }


  deleteClassifierSex() {
    this.classifierSex = [];
  }

  deleteClassifierFamilyStatus() {
    this.classifierFamilyStatus = [];
  }
};


const classifiersOKIN = new ClassifiersStore();
export default classifiersOKIN;