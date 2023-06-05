import { ILostPassport } from "../models/types/lostPassport.model";
import { IApplicantionCreate } from "../models/types/applicantion.model";
import { ITemporaryCertificate } from "../models/types/temporaryCertificate.model";
import axiosToDataBase from "../configs/axios.config";


export default class ApplicationsServices {
  private static pathDefault = "/statements";


  static async createPassportApplication(
    application: IApplicantionCreate,
    temporaryCertificate: ITemporaryCertificate | null
  ): Promise<void> {
    await axiosToDataBase.post(
      `${this.pathDefault}/passport_application`,
      Object.assign(application, { temporary_certificate: temporaryCertificate })
    );
  }

  static async createLostPassportApplication(
    lostPassport: ILostPassport,
    application: IApplicantionCreate,
    temporaryCertificate: ITemporaryCertificate | null
  ): Promise<void> {
    await axiosToDataBase.post(
      `${this.pathDefault}/lost_passport_application`,
      Object.assign(
        application,
        { temporary_certificate: temporaryCertificate },
        { lost_passport_application: lostPassport }
      )
    );
  }
}