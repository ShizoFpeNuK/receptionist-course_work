import { IPassportApplicationFullInfo, IPassportApplicationInfo } from "../models/types/applications.model";
import axiosToDataBase from "../configs/axios.config";


export default class PassportApplicationServices {
  private static pathDefault = "/passport_application";


  static async getAllPassportApplications(statusApplication: string): Promise<IPassportApplicationInfo[]> {
    const applications = await axiosToDataBase.get(`${this.pathDefault}`, {
      params: {
        status: statusApplication
      }
    });

    return applications.data;
  }

  static async updatePassportApplication(applicationId: number, decision: string): Promise<IPassportApplicationInfo[]> {
    const applications = await axiosToDataBase.patch(`${this.pathDefault}/${applicationId}`, {
      accepted_decision: decision
    });

    return applications.data;
  }

  static async getPassportApplicationInfo(applicationId: number): Promise<IPassportApplicationFullInfo> {
    const application = await axiosToDataBase.get(`${this.pathDefault}/${applicationId}`);

    return application.data;
  }
}