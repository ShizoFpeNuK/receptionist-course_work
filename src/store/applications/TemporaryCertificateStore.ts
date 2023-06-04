import { makeAutoObservable } from "mobx";
import { ITemporaryCertificate } from "../../models/types/temporaryCertificate.model";


class TemporaryCertificateStore {
  temporaryCertificate: ITemporaryCertificate | null = null;
  isApplicantionSend: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }


  setTemporaryCertificate(temporaryCertificate: ITemporaryCertificate | null) {
    this.temporaryCertificate = temporaryCertificate;
  }

  setIsApplicantionSend(boolean: boolean) {
    this.isApplicantionSend = boolean;
  }


  deleteTemporaryCertificate() {
    this.temporaryCertificate = null;
  }

  deleteIsApplicantionSend() {
    this.isApplicantionSend = false;
  }


  clearStore() {
    this.deleteTemporaryCertificate();
    this.deleteIsApplicantionSend();
  }
};


export default TemporaryCertificateStore;