import { IApplicantionDocument } from "../models/types/passportApplicantion.model";
import { IUncompletedPassportApp } from "../models/types/uncompletedPassportApplication";
import axiosToDataBase from "../configs/axios.config";


export default class CompletePassportApplicationServices {
  private static pathDefault = "/lost_passport_application";


  static async getAllPassportApplications(): Promise<IUncompletedPassportApp[]> {
    const applications = await axiosToDataBase.get(`${this.pathDefault}`);

    return applications.data;
  }

  static async completePassportApplication(applicationId: number, document: IApplicantionDocument): Promise<void> {
    await axiosToDataBase.post(`${this.pathDefault}/${applicationId}/identity_document`, document);
  }
}