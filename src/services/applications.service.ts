import { IApplicantionCreate } from "../models/types/applicant.model";
import axiosToDataBase from "../configs/axios.config";


export default class ApplicationsServices {
  private static pathDefault = "/statements";


  static async createPassportApplication(application: IApplicantionCreate): Promise<void> {
    await axiosToDataBase.post(`${this.pathDefault}/passport_application`, application);
  }
}