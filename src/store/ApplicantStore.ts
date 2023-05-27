import { makeAutoObservable } from "mobx";
import { IApplicantDocument, IApplicantGeneralInfo, IApplicantRelative } from "../models/types/applicant.model";


class ApplicantStore {
  applicantGeneralInfo: IApplicantGeneralInfo | undefined = undefined;
  applicantDocument: IApplicantDocument | undefined = undefined;
  applicantRelative: IApplicantRelative | undefined = undefined;
  isApplicantSend: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }


  setApplicantGeneralInfo(applicantGeneralInfo: IApplicantGeneralInfo | undefined) {
    this.applicantGeneralInfo = applicantGeneralInfo;
  }

  setApplicantRelative(applicantRelative: IApplicantRelative | undefined) {
    this.applicantRelative = applicantRelative;
  }
  
  setApplicantDocument(applicantDocument: IApplicantDocument | undefined) {
    this.applicantDocument = applicantDocument;
  }

  setIsApplicantSend(boolean: boolean) {
    this.isApplicantSend = boolean;
  }

  
  deleteApplicantGeneralInfo() {
    this.setApplicantGeneralInfo(undefined);
  }

  deleteApplicantRelative() {
    this.setApplicantRelative(undefined);
  }

  deleteApplicantDocument() {
    this.setApplicantDocument(undefined);
  }

  deleteIsApplicantSend() {
    this.setIsApplicantSend(false);
  }


  clearStore() {
    this.deleteApplicantGeneralInfo();
    this.deleteApplicantDocument();
    this.deleteApplicantRelative();
    this.deleteIsApplicantSend();
  }

  
  getApplicant() {
    return Object.assign(this.applicantGeneralInfo!, this.applicantDocument!, this.applicantRelative!);
  }
}


export default ApplicantStore;