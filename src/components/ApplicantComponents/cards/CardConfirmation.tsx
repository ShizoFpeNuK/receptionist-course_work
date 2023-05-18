import '../../../style/css/ApplicantComponent/cardConfirmation.css';
import { Card, Space } from "antd";
import { observer } from "mobx-react";
import { IApplicant } from "../../../models/types/applicant.model";
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm";


interface CardConfirmationProps {
  applicant: IApplicant,
}


const CardConfirmation = observer((props: CardConfirmationProps) => {
  return (
    <Card
      title="Карточка-подтверждение"
      style={CardForm}
      bodyStyle={CardBodyForm}
    >
      <div className="card_confirmation_applicant">
        <h2 className="card_confirmation_applicant_header"> Общие сведения о заявителе </h2>
        <div className="card_confirmation_applicant_inner">
          <h3 className="card_confirmation_applicant_title"> ФИО заявителя </h3>
          <p className="card_confirmation_applicant_fullname">
            {props.applicant.full_name.last_name} {props.applicant.full_name.last_name}
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
    </Card>
  )
});


export default CardConfirmation;