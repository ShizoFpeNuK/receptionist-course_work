import { IUser } from "../models/types/user.model";
import { axiosToDataBase } from "../configs/axios.config";


export default class LoginServices {
  static pathDefault: string = "/login";


  static async login(username: string, password: string): Promise<IUser> {
    const user = await axiosToDataBase.post(this.pathDefault,
      {
        username: username,
        password: password,
      },
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
      }
    );

    return user.data;
  }
}