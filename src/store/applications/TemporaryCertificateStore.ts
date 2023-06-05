import { makeAutoObservable } from "mobx";
import { ITemporaryCertificate } from "../../models/types/temporaryCertificate.model";


class TemporaryCertificateStore {
  temporaryCertificate: ITemporaryCertificate | null = null;
  isApplicantionReady: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }


  setTemporaryCertificate(temporaryCertificate: ITemporaryCertificate | null) {
    this.temporaryCertificate = temporaryCertificate;
  }

  setIsApplicantionReady(boolean: boolean) {
    this.isApplicantionReady = boolean;
  }


  deleteTemporaryCertificate() {
    this.temporaryCertificate = null;
  }

  deleteIsApplicantionReady() {
    this.isApplicantionReady = false;
  }


  clearStore() {
    this.deleteTemporaryCertificate();
    this.deleteIsApplicantionReady();
  }
};


export default TemporaryCertificateStore;