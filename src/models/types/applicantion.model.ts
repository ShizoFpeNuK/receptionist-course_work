import dayjs from "dayjs";


export interface IApplicantionApplicant {
  full_name: {
    first_name: string,
    last_name: string,
    middle_name: string | null
  },
  relatives: {
    full_name_father: string | null,
    full_name_mother: string | null,
  }
  place_of_birth: string,
  date_of_birth: string | dayjs.Dayjs,
  place_of_residence: string,
  telephone: string,
  email: string | null,
  code_sex: number,
  other_nationality: string | null,
  code_family_status: number,
}

export interface IApplicantionPassportApplication {
  grounds_for_extradition: string,
  full_name: {
    first_name: string | null,
    last_name: string | null,
    middle_name: string | null
  },
  place_of_birth: string | null,
  date_of_birth: string | dayjs.Dayjs | null,
  code_sex: number | null,
  requisites: string | null,
}

export interface IApplicantionDocument {
  document: {
    series: string,
    id: number,
  },
  type_document: string,
  date_of_issue: string | dayjs.Dayjs,
  issued_by: string,
}

export interface IApplicantionMarriage {
  date_of_conclusion: string | dayjs.Dayjs | null,
  full_name_spouse: string | null,
  date_of_birth_spouse: string | dayjs.Dayjs | null,
}

export interface IApplicantionCreate {
  applicant: IApplicantionApplicant,
  passport_application: IApplicantionPassportApplication,
  identity_document: IApplicantionDocument,
  marriage: IApplicantionMarriage | null,
}

export type IApplicantion = IApplicantionApplicant & IApplicantionPassportApplication &
  IApplicantionDocument & IApplicantionMarriage;
