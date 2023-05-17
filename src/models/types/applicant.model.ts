

export interface IApplicantGeneralInfo {
  document_series: number,
  document_id: number,
  first_name: string,
  last_name: string,
  middle_name: string | undefined,
  place_of_birth: string,
  date_of_birth: string,
  family_status: string,
  place_of_residence: string,
  telephone: string,
  email: string | undefined,
  sex: number,
  date_of_issue: string,
  type_document: string,
  issued_by: string,
}

export interface IApplicantDocument {

}

export interface IApplicantRelative{
  full_name: string,
}
