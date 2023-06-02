import { makeAutoObservable } from "mobx";
import { ITemporaryCertificate } from "../models/types/temporaryCertificate.model";
import { IApplicant, IApplicantDocument, IApplicantGeneralInfo, IApplicantRelative } from "../models/types/applicant.model";


class ApplicantStore {
  applicantGeneralInfo: IApplicantGeneralInfo | null = null;
  applicantDocument: IApplicantDocument | null = null;
  applicantRelative: IApplicantRelative | null = null;
  temporaryCertificate: ITemporaryCertificate | null = null;
  isApplicantSend: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }


  setApplicantGeneralInfo(applicantGeneralInfo: IApplicantGeneralInfo | null) {
    this.applicantGeneralInfo = applicantGeneralInfo;
  }

  setApplicantRelative(applicantRelative: IApplicantRelative | null) {
    this.applicantRelative = applicantRelative;
  }

  setApplicantDocument(applicantDocument: IApplicantDocument | null) {
    this.applicantDocument = applicantDocument;
  }

  setTemporaryCertificate(temporaryCertificate: ITemporaryCertificate | null) {
    this.temporaryCertificate = temporaryCertificate;
  }

  setIsApplicantSend(boolean: boolean) {
    this.isApplicantSend = boolean;
  }


  deleteApplicantGeneralInfo() {
    this.setApplicantGeneralInfo(null);
  }

  deleteApplicantRelative() {
    this.setApplicantRelative(null);
  }

  deleteApplicantDocument() {
    this.setApplicantDocument(null);
  }

  deleteTemporaryCertificate() {
    this.setTemporaryCertificate(null);
  }

  deleteIsApplicantSend() {
    this.setIsApplicantSend(false);
  }
  

  clearStore() {
    this.deleteApplicantGeneralInfo();
    this.deleteApplicantDocument();
    this.deleteApplicantRelative();
    this.deleteTemporaryCertificate();
    this.deleteIsApplicantSend();
  }


  getApplicant(): IApplicant {
    return Object.assign(
      this.applicantGeneralInfo!,
      this.applicantDocument!,
      this.applicantRelative!,
      this.temporaryCertificate!
    );
  }
}


export default ApplicantStore;