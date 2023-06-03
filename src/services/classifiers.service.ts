import { IClassifierOKIN } from "../models/types/classifiers.model";
import axiosToDataBase from "../configs/axios.config";


export default class ClassifiersServices {
  private static pathDefault: string = "/classifiers";


  static async getClassifierSex(): Promise<IClassifierOKIN[]> {
    const classifiers = await axiosToDataBase.get(`${this.pathDefault}/sex`);

    return classifiers.data;
  }

  static async getClassifierNationality(): Promise<IClassifierOKIN[]> {
    const classifiers = await axiosToDataBase.get(`${this.pathDefault}/nationality`);

    return classifiers.data;
  }

  static async getClassifierFamilyStatus(): Promise<IClassifierOKIN[]> {
    const classifiers = await axiosToDataBase.get(`${this.pathDefault}/family_status`);

    return classifiers.data;
  }

  static async getClassifierGroundsForExtradition(): Promise<IClassifierOKIN[]> {
    const classifiers = await axiosToDataBase.get(`${this.pathDefault}/grounds_for_extradition`);

    return classifiers.data;
  }
} 