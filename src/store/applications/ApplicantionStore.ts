import { makeAutoObservable } from "mobx";
import {
  IApplicantion,
  IApplicantionDocument,
  IApplicantionApplicant,
  IApplicantionPassportApplication,
  IApplicantionMarriage,
  IApplicantionCreate
} from "../../models/types/passportApplicantion.model";


class ApplicantionStore {
  applicantionApplicant: IApplicantionApplicant | null = null;
  applicantionPassportApplication: IApplicantionPassportApplication | null = null;
  applicantionDocument: IApplicantionDocument | null = null;
  applicantionMarriage: IApplicantionMarriage | null = null;
  isApplicantionReady: boolean = false;

  constructor() {
    makeAutoObservable(this);
  }


  setApplicantionApplicant(applicantionApplicant: IApplicantionApplicant) {
    this.applicantionApplicant = applicantionApplicant;
  }

  setApplicationPassportApplication(applicantionPassportApplication: IApplicantionPassportApplication) {
    this.applicantionPassportApplication = applicantionPassportApplication;
  }

  setApplicantionMarriage(applicantionMarriage: IApplicantionMarriage | null) {
    this.applicantionMarriage = applicantionMarriage;
  }

  setApplicantionDocument(applicantionDocument: IApplicantionDocument | null) {
    this.applicantionDocument = applicantionDocument;
  }

  setIsApplicantionReady(boolean: boolean) {
    this.isApplicantionReady = boolean;
  }


  deleteApplicantionApplicant() {
    this.applicantionApplicant = null;
  }

  deleteApplicationPassportApplication() {
    this.applicantionPassportApplication = null;
  }

  deleteApplicantionMarriage() {
    this.applicantionMarriage = null;
  }

  deleteApplicantionDocument() {
    this.applicantionDocument = null;
  }

  deleteIsApplicantionReady() {
    this.isApplicantionReady = false;
  }


  clearStore() {
    this.deleteApplicantionApplicant();
    this.deleteApplicationPassportApplication();
    this.deleteApplicantionDocument();
    this.deleteApplicantionMarriage();
    this.deleteIsApplicantionReady();
  }


  getApplicantion(): IApplicantion {
    return Object.assign([],
      this.applicantionApplicant!,
      this.applicantionPassportApplication!,
      this.applicantionDocument!,
      this.applicantionMarriage!,
    );
  }

  getApplicationCreate(): IApplicantionCreate {
    return {
      applicant: this.applicantionApplicant!,
      passport_application: this.applicantionPassportApplication!,
      identity_document: this.applicantionDocument!,
      marriage: this.applicantionMarriage,
    };
  }
};


export default ApplicantionStore;