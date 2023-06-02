import '../../..//style/css/components/ApplicantComponents/cardConfirmationApplication.css';
import { observer } from "mobx-react";
import { IApplicant } from "../../../models/types/applicant.model";
import { Button, Card, Space } from "antd";
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm";
import ButtonStep from '../../Buttons/ButtonStep';


interface CardConfirmationApplicationProps {
  textButton?: string,
  applicant: IApplicant,
  onClickCancel: () => void,
  onClickCreate: () => void,
}


const CardConfirmationApplication = observer((props: CardConfirmationApplicationProps) => {
  return (
    <Card
      style={CardForm}
      headStyle={{ fontSize: "20px", fontWeight: 600 }}
      bodyStyle={CardBodyForm}
    >
      <div className="card_confirmation_applicant">
        <h2 className="card_confirmation_applicant_header"> Общие сведения о заявителе </h2>
        <div className="card_confirmation_applicant_inner">
          <h3 className="card_confirmation_applicant_title"> ФИО заявителя </h3>
          <p className="card_confirmation_applicant_fullname">
            {props.applicant.full_name.last_name}&nbsp;
            {props.applicant.full_name.first_name}&nbsp;
            {props.applicant.full_name.middle_name}
          </p>
        </div>
        <div className="card_confirmation_applicant_inner">
          <h3 className="card_confirmation_applicant_title"> Пол заявителя </h3>
          {props.applicant.sex === 1
            ? <p className="card_confirmation_applicant_sex"> Мужской </p>
            : <p className="card_confirmation_applicant_sex"> Женский </p>
          }
        </div>
        <div className="card_confirmation_applicant_inner">
          <h3 className="card_confirmation_applicant_title"> Место рождения </h3>
          <p className="card_confirmation_applicant_place_of_birth">
            {props.applicant.place_of_birth}
          </p>
        </div>
        <div className="card_confirmation_applicant_inner">
          <h3 className="card_confirmation_applicant_title"> Дата рождения </h3>
          <p className="card_confirmation_applicant_date_of_birth">
            {new Date(props.applicant.date_of_birth.toString()).toLocaleDateString()}
          </p>
        </div>
        <div className="card_confirmation_applicant_inner">
          <h3 className="card_confirmation_applicant_title"> Место проживания/пребывания </h3>
          <p className="card_confirmation_applicant_place_of_residence">
            {props.applicant.place_of_residence}
          </p>
        </div>
        <div className="card_confirmation_applicant_inner">
          <h3 className="card_confirmation_applicant_title"> Номер телефона </h3>
          <p className="card_confirmation_applicant_telephone">
            {props.applicant.telephone}
          </p>
        </div>
        <div className="card_confirmation_applicant_inner">
          <h3 className="card_confirmation_applicant_title"> Электронная почта </h3>
          {props.applicant.email
            ? <p className="card_confirmation_applicant_email">
              {props.applicant.email}
            </p>
            : <p className="card_confirmation_applicant_email"> Отсутствует </p>
          }
        </div>
      </div>

      <div className="card_confirmation_document">
        <h2 className="card_confirmation_document_header"> Сведения о предъявленном удостоверении личности </h2>
        <div className="card_confirmation_document_inner">
          <h3 className="card_confirmation_document_title"> Тип предъявленного документа </h3>
          <p className="card_confirmation_document_type_document">
            {props.applicant.type_document}
          </p>
        </div>
        <div className="card_confirmation_document_inner">
          <h3 className="card_confirmation_document_title"> Серия и номер паспорта </h3>
          <Space direction="horizontal" style={{ width: "100%" }}>
            <p className="card_confirmation_document_series">
              {props.applicant.document.series}
            </p>
            <p className="card_confirmation_document_id">
              {props.applicant.document.id}
            </p>
          </Space>
        </div>
        <div className="card_confirmation_document_inner">
          <h3 className="card_confirmation_document_title"> Дата выдачи документа </h3>
          <p className="card_confirmation_document_date_of_issue">
            {new Date(props.applicant.date_of_issue.toString()).toLocaleDateString()}
          </p>
        </div>
        <div className="card_confirmation_document_inner">
          <h3 className="card_confirmation_document_title"> Кем выдан документ </h3>
          <p className="card_confirmation_document_issued_by">
            {props.applicant.issued_by}
          </p>
        </div>
      </div>

      <div className="card_confirmation_relative">
        <h2 className="card_confirmation_relative_header"> Сведения о родственниках и браке </h2>
        <div className="card_confirmation_relative_inner">
          <h3 className="card_confirmation_relative_title"> Родственники </h3>
          <p className="card_confirmation_relative_father">
            Отец: {props.applicant.relatives.full_name_father ?? "Отсутствует"}
          </p>
          <p className="card_confirmation_relative_mother">
            Матерь: {props.applicant.relatives.full_name_mother ?? "Отсутствует"}
          </p>
        </div>
        <div className="card_confirmation_relative_inner">
          <h3 className="card_confirmation_relative_title"> Семейное положение </h3>
          <p className="card_confirmation_relative_family_status">
            {props.applicant.family_status}
          </p>
        </div>
        <div className="card_confirmation_relative_inner">
          <h3 className="card_confirmation_relative_title"> Дата заключения/расторжения брака </h3>
          <p className="card_confirmation_relative_date_of_conclusion">
            {props.applicant.date_of_conclusion
              ? new Date(props.applicant.date_of_conclusion.toString()).toLocaleDateString()
              : "Отсутствует"
            }
          </p>
        </div>
        <div className="card_confirmation_relative_inner">
          <h3 className="card_confirmation_relative_title"> ФИО супруга/супруги </h3>
          <p className="card_confirmation_relative_full_name_spouse">
            {props.applicant.full_name_spouse ?? "Отсутствует"}
          </p>
        </div>
        <div className="card_confirmation_relative_inner">
          <h3 className="card_confirmation_relative_title"> Дата рождения супруга/супруги </h3>
          <p className="card_confirmation_relative_date_of_birth_spouse">
            {props.applicant.date_of_birth_spouse
              ? new Date(props.applicant.date_of_birth_spouse.toString()).toLocaleDateString()
              : "Отсутствует"
            }
          </p>
        </div>
      </div>

      <div className="card_confirmation_temporary_certificate">
        <h2 className="card_confirmation_temporary_certificate_header"> Сведения о временном удостоверении </h2>
        {props.applicant.temporary_certificate
          ? <>
            <div className="card_confirmation_temporary_certificate_inner">
              <h3 className="card_confirmation_temporary_certificate_title"> Причина выдачи </h3>
              <p className="card_confirmation_temporary_certificate_reason">
                {props.applicant.reason}
              </p>
            </div>
            <div className="card_confirmation_temporary_certificate_inner">
              <h3 className="card_confirmation_temporary_certificate_title"> Действителен до </h3>
              <p className="card_confirmation_temporary_certificate_valid_until">
                {new Date(props.applicant.valid_until!.toString()).toLocaleDateString()}
              </p>
            </div>
          </>
          : <div className="card_confirmation_temporary_certificate_inner">
            Не требуется
          </div>
        }
      </div>

      <Space.Compact style={{ width: "100%", marginTop: "30px" }}>
        <ButtonStep
          onClick={props.onClickCancel}
          style={{ width: "50%" }}
        >
          Назад
        </ButtonStep>
        <Button
          type="primary"
          onClick={props.onClickCreate}
          style={{ width: "50%" }}
        >
          {props.textButton ?? "Отправить"}
        </Button>
      </Space.Compact>
    </Card >
  )
});


export default CardConfirmationApplication;