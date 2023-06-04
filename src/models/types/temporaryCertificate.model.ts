import dayjs from "dayjs";


export interface ITemporaryCertificate {
  document: {
    series: string,
    id: number,
  },
  reason: string | null,
  valid_until: string | dayjs.Dayjs | null,
}