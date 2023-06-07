import '../../../style/css/components/others/modalPassportAppInfo.css';
import { Modal, Space } from "antd";
import { IPassportApplicationFullInfo } from "../../../models/types/applications.model";


const ModalPassportAppInfo = (
  application: IPassportApplicationFullInfo
) => {

  Modal.info({
    className: "modal_details",
    title: <h3> Полная информация </h3>,
    icon: null,
    centered: true,
    width: "700px",
    content: (
      <div className="modal_details_inner" style={{ marginTop: "20px" }}>
        <div className="modal_details_applicant modal_details_container">
          <h2 className="modal_details_applicant_header modal_details_header"> Заявитель </h2>
          <div className="modal_details_applicant_inner modal_details_inner">
            <h3 className="modal_details_applicant_title"> ФИО заявителя </h3>
            <p className="modal_details_applicant_fullname">
              {application.applicant.last_name}&nbsp;
              {application.applicant.first_name}&nbsp;
              {application.applicant.middle_name}
            </p>
          </div>
          <div className="modal_details_applicant_inner modal_details_inner">
            <h3 className="modal_details_applicant_title"> Пол заявителя </h3>
            <p className="modal_details_applicantt_sex"> {application.applicant.name_sex} </p>
          </div>
          <div className="modal_details_applicant_inner modal_details_inner">
            <h3 className="modal_details_applicant_title"> Место рождения </h3>
            <p className="modal_details_applicant_place_of_birth">
              {application.applicant.place_of_birth}
            </p>
          </div>
          <div className="modal_details_applicant_inner modal_details_inner">
            <h3 className="modal_details_applicant_title"> Дата рождения </h3>
            <p className="modal_details_applicant_date_of_birth">
              {new Date(application.applicant.date_of_birth.toString()).toLocaleDateString()}
            </p>
          </div>
          <div className="modal_details_applicant_inner modal_details_inner">
            <h3 className="modal_details_applicant_title"> Место проживания/пребывания </h3>
            <p className="modal_details_applicant_place_of_residence">
              {application.applicant.place_of_residence}
            </p>
          </div>
          <div className="modal_details_applicant_inner modal_details_inner">
            <h3 className="modal_details_applicant_title"> Номер телефона </h3>
            <p className="modal_details_applicant_telephone">
              {application.applicant.telephone}
            </p>
          </div>
          <div className="modal_details_applicant_inner modal_details_inner">
            <h3 className="modal_details_applicant_title"> Иное гражданство </h3>
            <p className="modal_details_applicant_other_nationality">
              {application.applicant.other_nationality ?? "Отсутствует"}
            </p>
          </div>
          <div className="modal_details_applicant_inner modal_details_inner">
            <h3 className="modal_details_applicant_title"> Электронная почта </h3>
            <p className="modal_details_applicant_email">
              {application.applicant.email ?? "Отсутствует"}
            </p>
          </div>
          <div className="modal_details_applicant_inner modal_details_inner">
            <h3 className="modal_details_applicant_title"> Родственники </h3>
            <p className="modal_details_applicant_father">
              Отец:&nbsp;
              {application.applicant.full_name_father ?? "Отсутствует"}
            </p>
            <p className="modal_details_applicant_mother">
              Матерь:&nbsp;
              {application.applicant.full_name_mother ?? "Отсутствует"}
            </p>
          </div>
          <div className="modal_details_applicant_inner modal_details_inner">
            <h3 className="modal_details_applicant_title"> Семейное положение </h3>
            <p className="modal_details_applicant_family_status">
              {application.applicant.name_family_status}
            </p>
          </div>
        </div>

        <div className="modal_details_passport_applicant modal_details_container">
          <h2 className="modal_details_passport_applicant_header modal_details_header">
            Сведения о заявлении замены/выдачи паспорта
          </h2>
          <div className="modal_details_passport_applicant_inner modal_details_inner">
            <h3 className="modal_details_passport_applicant_title"> Регистрационный номер </h3>
            <p className="modal_details_passport_applicant_fullname">
              {application.passport_application.register_id}
            </p>
          </div>
          <div className="modal_details_passport_applicant_inner modal_details_inner">
            <h3 className="modal_details_passport_applicant_title"> Причина выдачи/замены </h3>
            <p className="modal_details_passport_applicant_grounds_for_extradition">
              {application.passport_application.grounds_for_extradition}
            </p>
          </div>
          <div className="modal_details_passport_applicant_inner modal_details_inner">
            <h3 className="modal_details_passport_applicant_title"> Результаты проверки </h3>
            <p className="modal_details_passport_applicant_test_result">
              {application.passport_application.test_result ?? "Отсутствуют"}
            </p>
          </div>
          <div className="modal_details_passport_applicant_inner modal_details_inner">
            <h3 className="modal_details_passport_applicant_title"> Принятое решение </h3>
            <p className="modal_details_passport_applicant_accepted_decision">
              {application.passport_application.accepted_decision}
            </p>
          </div>
          <div className="modal_details_passport_applicant_inner modal_details_inner">
            <h3 className="modal_details_passport_applicant_title"> Дата подачи заявления </h3>
            <p className="modal_details_passport_applicant_date_of_application">
              {new Date(application.passport_application.date_of_application.toString()).toLocaleDateString()}
            </p>
          </div>
          <div className="modal_details_passport_applicant_inner modal_details_inner">
            <h3 className="modal_details_passport_applicant_title"> Дата выдачи паспорта </h3>
            <p className="modal_details_passport_applicant_date_of_receipt_of_passport">
              {application.passport_application.date_of_receipt_of_passport
                ? new Date(application.passport_application.date_of_receipt_of_passport.toString()).toLocaleDateString()
                : "Отсутствует"
              }
            </p>
          </div>
        </div>

        <div className="modal_details_document modal_details_container">
          <h2 className="modal_details_document_header modal_details_header">
            Сведения о предъявленном удостоверении личности
          </h2>
          {application.identity_document
            ? <>
              <div className="modal_details_document_inner modal_details_inner">
                <h3 className="modal_details_document_title"> Тип предъявленного документа </h3>
                <p className="modal_details_document_type_document">
                  {application.identity_document.type_document}
                </p>
              </div>
              <div className="modal_details_document_inner modal_details_inner">
                <h3 className="modal_details_document_title"> Серия и номер паспорта </h3>
                <Space direction="horizontal" style={{ width: "100%" }}>
                  <p className="modal_details_document_series">
                    {application.identity_document.document_series}
                  </p>
                  <p className="modal_details_document_id">
                    {application.identity_document.document_id}
                  </p>
                </Space>
              </div>
              <div className="modal_details_document_inner modal_details_inner">
                <h3 className="modal_details_document_title"> Дата выдачи документа </h3>
                <p className="modal_details_document_date_of_issue">
                  {new Date(application.identity_document.date_of_issue.toString()).toLocaleDateString()}
                </p>
              </div>
              <div className="modal_details_document_inner modal_details_inner">
                <h3 className="modal_details_document_title"> Кем выдан документ </h3>
                <p className="modal_details_document_issued_by">
                  {application.identity_document.issued_by}
                </p>
              </div>
            </>
            : <p style={{ textAlign: "center" }}> Отсутствуют </p>
          }
        </div>

        <div className="modal_details_marriage modal_details_container">
          <h2 className="modal_details_marriage_header modal_details_header">
            Сведения о браке
          </h2>
          {application.marriage
            ? <>
              <div className="modal_details_marriage_inner modal_details_inner">
                <h3 className="modal_details_marriage_title"> Дата заключения/расторжения брака </h3>
                <p className="modal_details_marriage_date_of_conclusion">
                  {new Date(application.marriage.date_of_conclusion.toString()).toLocaleDateString()}
                </p>
              </div>
              <div className="modal_details_marriage_inner modal_details_inner">
                <h3 className="modal_details_relative_title"> ФИО супруга/супруги </h3>
                <p className="modal_details_marriage_full_name_spouse">
                  {application.marriage.full_name_spouse}
                </p>
              </div>
              <div className="modal_details_marriage_inner modal_details_inner">
                <h3 className="modal_details_marriage_title"> Дата рождения супруга/супруги </h3>
                <p className="modal_details_marriage_date_of_birth_spouse">
                  {new Date(application.marriage.date_of_birth_spouse.toString()).toLocaleDateString()}
                </p>
              </div>
            </>
            : <p style={{ textAlign: "center" }}> Отсутствуют </p>
          }
        </div>

        <div className="modal_details_replacement_data modal_details_container">
          <h2 className="modal_details_replacement_data_header modal_details_header">
            Сведения о заявлении замены/выдачи паспорта
          </h2>
          {application.replacement_data
            ? <>
              <div className="modal_details_replacement_data_inner modal_details_inner">
                <h3 className="modal_details_replacement_data_title"> Старая фамилия </h3>
                <p className="modal_details_replacement_data_firstname">
                  {application.replacement_data.old_first_name ?? "Неизменено"}
                </p>
              </div>
              <div className="modal_details_replacement_data_inner modal_details_inner">
                <h3 className="modal_details_replacement_data_title"> Старое имя </h3>
                <p className="modal_details_replacement_data_lastname">
                  {application.replacement_data.old_last_name ?? "Неизменено"}
                </p>
              </div>
              <div className="modal_details_replacement_data_inner modal_details_inner">
                <h3 className="modal_details_replacement_data_title"> Старое отчество </h3>
                <p className="modal_details_replacement_data_middlename">
                  {application.replacement_data.old_middle_name ?? "Неизменено"}
                </p>
              </div>
              <div className="modal_details_replacement_data_inner modal_details_inner">
                <h3 className="modal_details_replacement_data_title"> Старый пол </h3>
                <p className="modal_details_replacement_data_sex">
                  <p className="modal_details_replacement_data_sex">
                    {application.replacement_data.old_name_sex ?? "Неизменено"}
                  </p>
                </p>
              </div>
              <div className="modal_details_replacement_data_inner modal_details_inner">
                <h3 className="modal_details_replacement_data_title"> Старое место рождения </h3>
                <p className="modal_details_replacement_data_place_of_birth">
                  {application.replacement_data.old_place_of_birth ?? "Неизменено"}
                </p>
              </div>
              <div className="modal_details_replacement_data_inner modal_details_inner">
                <h3 className="modal_details_replacement_data_title"> Старая дата рождения </h3>
                <p className="modal_details_replacement_data_date_of_birth">
                  {application.replacement_data.old_date_of_birth
                    ? new Date(application.replacement_data.old_date_of_birth.toString()).toLocaleDateString()
                    : "Неизменено"
                  }
                </p>
              </div>
              <div className="modal_details_replacement_data_inner modal_details_inner">
                <h3 className="modal_details_replacement_data_title"> Реквизиты </h3>
                <p className="modal_details_replacement_data_requisites">
                  {application.replacement_data.requisites}
                </p>
              </div>
            </>
            : <p style={{ textAlign: "center" }}> Отсутствуют </p>
          }
        </div>
      </div >
    )
  });
};


export default ModalPassportAppInfo;