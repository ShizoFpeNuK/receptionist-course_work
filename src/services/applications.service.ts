import { ILostPassport } from "../models/types/lostPassport.model";
import { IApplicantionCreate } from "../models/types/passportApplicantion.model";
import { ITemporaryCertificate } from "../models/types/temporaryCertificate.model";
import axiosToDataBase from "../configs/axios.config";
import { IErrorApplication } from "../models/types/errorApplication";


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

  static async createErrorApplication(
    errorApplication: IErrorApplication,
    application: IApplicantionCreate,
    temporaryCertificate: ITemporaryCertificate | null
  ): Promise<void> {
    await axiosToDataBase.post(
      `${this.pathDefault}/error_application`,
      Object.assign(
        application,
        { error_application: errorApplication },
        { temporary_certificate: temporaryCertificate },
      )
    );
  }
}