import dayjs from "dayjs";


export interface IApplicantGeneralInfo {
  full_name: {
    first_name: string,
    last_name: string,
    middle_name: string | undefined
  },
  place_of_birth: string,
  date_of_birth: string | dayjs.Dayjs,
  place_of_residence: string,
  telephone: string,
  email: string | undefined,
  sex: number,
}

export interface IApplicantDocument {
  document: {
    series: number,
    id: number,
  },
  type_document: string,
  date_of_issue: string,
  issued_by: string,
}

export interface IApplicantRelative {
  relatives: {
    full_name_father: string,
    full_name_mother: string,
  }
  family_status: string,
  date_of_conclusion: string | dayjs.Dayjs,
  full_name_spouse: string,
  date_of_birth_spouse: string | dayjs.Dayjs,
}


export interface IApplicant extends IApplicantGeneralInfo, IApplicantDocument, IApplicantRelative {

}
