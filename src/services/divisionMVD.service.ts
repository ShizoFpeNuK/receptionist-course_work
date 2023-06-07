import { IDivisionMVD } from "../models/types/divisionMVD.model";
import axiosToDataBase from "../configs/axios.config";


export default class DivisionMVDServices {
  private static pathDefault: string = "/division";


  static async getDivisionMVD(): Promise<IDivisionMVD> {
    const division = await axiosToDataBase.get(`${this.pathDefault}`);

    return division.data;
  }
}