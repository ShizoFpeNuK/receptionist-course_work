import dayjs from "dayjs";


export interface ITemporaryCertificate {
  temporary_certificate: boolean,
  reason: string | null,
  valid_until: string | dayjs.Dayjs | null,
}
