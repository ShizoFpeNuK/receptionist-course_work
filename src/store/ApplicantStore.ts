import { makeAutoObservable } from "mobx";
import { IApplicantGeneralInfo, IApplicantRelative } from "../models/types/applicant.model";


class ApplicantStore {
  applicantGeneralInfo: IApplicantGeneralInfo | undefined = undefined;
  applicantRelative: IApplicantRelative | undefined = undefined;

  constructor() {
    makeAutoObservable(this);
  }


  setApplicantGeneralInfo(applicantGeneralInfo: IApplicantGeneralInfo | undefined) {
    this.applicantGeneralInfo = applicantGeneralInfo;
  }

  setApplicantRelative(applicantRelative: IApplicantRelative | undefined) {
    this.applicantRelative = applicantRelative;
  }

  deleteApplicantGeneralInfo() {
    this.setApplicantGeneralInfo(undefined);
  }

  deleteApplicantRelative() {
    this.setApplicantRelative(undefined);
  }

  // get getApplicant() {
  //   return Object.assign(this.applicantGeneralInfo!, { relative: "123123" });
  // }
}


export default ApplicantStore;