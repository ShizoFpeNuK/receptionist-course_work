import dayjs from "dayjs";


export interface ILostPassport {
  date_of_loss: string | dayjs.Dayjs,
  place_of_loss: string,
  circumstances_of_loss: string,
  date_of_kidnapping: string | dayjs.Dayjs,
  response_method: string,
  name_of_organization_on_FOA: string,
  date_of_application: string | dayjs.Dayjs,
}