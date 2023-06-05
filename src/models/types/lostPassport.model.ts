import dayjs from "dayjs";


export interface  ILostPassport {
  date_of_loss: string | dayjs.Dayjs, //
  document: {
    id: number | null, //
    series: number | null, //
  }
  issued_by: string | null,
  date_of_issue: string | dayjs.Dayjs | null,
  place_of_loss: string, //
  circumstances_of_loss: string, //
  date_of_kidnapping: string | dayjs.Dayjs | null, //
  response_method: string, //
  name_of_organization_on_FOA: string | null, //
}