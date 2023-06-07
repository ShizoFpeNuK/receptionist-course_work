export interface IPassportApplicationInfo {
  register_id: number,
  accepted_decision: string,
  test_result: string | null,
  is_identity_document: boolean,
}

export interface IPassportApplicationFullInfo {
  applicant: {
    first_name: string | null,
    last_name: string | null,
    middle_name: string | null,
    full_name_father: string | null,
    full_name_mother: string | null,
    place_of_birth: string,
    date_of_birth: string,
    place_of_residence: string,
    telephone: string,
    email: string | null,
    name_sex: string,
    other_nationality: string | null,
    name_family_status: string
  },
  passport_application: {
    register_id: number,
    accepted_decision: string,
    test_result: string | null,
    date_of_application: string,
    date_of_receipt_of_passport: string | null,
    grounds_for_extradition: string
  },
  identity_document: {
    document_series: string,
    document_id: number,
    date_of_issue: string,
    type_document: string,
    issued_by: string
  } | null,
  marriage: {
    date_of_conclusion: string,
    full_name_spouse: string,
    date_of_birth_spouse: string
  } | null,
  replacement_data: {
    old_first_name: string | null,
    old_last_name: string | null,
    old_middle_name: string | null,
    old_place_of_birth: string | null,
    old_date_of_birth: string | null,
    old_name_sex: string | null,
    requisites: string | null
  } | null
}