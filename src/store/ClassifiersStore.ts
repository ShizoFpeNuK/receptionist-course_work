import { IClassifierOKIN } from "../models/types/classifiers.model";
import { makeAutoObservable } from "mobx";


class ClassifiersStore {
  classifierSex: IClassifierOKIN[] = [];
  classifierNationality: IClassifierOKIN[] = [];
  classifierFamilyStatus: IClassifierOKIN[] = [];

  constructor() {
    makeAutoObservable(this);
  }


  setClassifierSex(classifiers: IClassifierOKIN[]) {
    this.classifierSex = classifiers;
  }
  setClassifierNationality(classifiers: IClassifierOKIN[]) {
    this.classifierNationality = classifiers;
  }
  setClassifierFamilyStatus(classifiers: IClassifierOKIN[]) {
    this.classifierFamilyStatus = classifiers;
  }


  deleteClassifierSex() {
    this.classifierSex = [];
  }
  deleteClassifierNationality() {
    this.classifierNationality = [];
  }
  deleteClassifierFamilyStatus() {
    this.classifierFamilyStatus = [];
  }
};


const classifiersOKIN = new ClassifiersStore();
export default classifiersOKIN;