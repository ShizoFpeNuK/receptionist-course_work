import dayjs from "dayjs";


export interface ITemporaryCertificate {
  temporary_certificate: {
    series: number,
    id: number
  },
  reason: string,
  valid_until: string | dayjs.Dayjs,
}
