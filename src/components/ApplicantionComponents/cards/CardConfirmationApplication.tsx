import '../../../style/css/components/ApplicantComponents/cardConfirmationApplication.css';
import {
  IApplicantionApplicant, IApplicantionDocument,
  IApplicantionMarriage, IApplicantionPassportApplication
} from "../../../models/types/applicantion.model";
import { IClassifierOKIN } from '../../../models/types/classifiers.model';
import { useEffect, useState } from 'react';
import { Button, Card, Space } from "antd";
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm";
import ButtonStep from "../../others/Buttons/ButtonStep";
import classifiersOKIN from "../../../store/other/ClassifiersStore";


interface CardConfirmationApplicationProps {
  textButton?: string,
  applicant: IApplicantionApplicant,
  marriage: IApplicantionMarriage | null,
  document: IApplicantionDocument,
  passportApplication: IApplicantionPassportApplication,
  onClickCancel: () => void,
  onClickContinue: () => void,
}


const CardConfirmationApplication = (props: CardConfirmationApplicationProps) => {
  const [familyStatus, setFamilyStatus] = useState<string>("");

  useEffect(() => {
    classifiersOKIN.classifierFamilyStatus.forEach((el: IClassifierOKIN) => {
      if (props.applicant.code_family_status === el.id) {
        setFamilyStatus(el.name);
      }
    })
  }, [classifiersOKIN.classifierFamilyStatus])


  return (
    <Card
      style={CardForm}
      headStyle={{ fontSize: "20px", fontWeight: 600 }}
      bodyStyle={CardBodyForm}
    >
      <div className="card_confirmation_applicant">
        <h2 className="card_confirmation_applicant_header card_confirmation_header">
          Общие сведения о заявителе
        </h2>
        <div className="card_confirmation_applicant_inner card_confirmation_inner">
          <h3 className="card_confirmation_applicant_title"> ФИО заявителя </h3>
          <p className="card_confirmation_applicant_fullname">
            {props.applicant.full_name.last_name}&nbsp;
            {props.applicant.full_name.first_name}&nbsp;
            {props.applicant.full_name.middle_name}
          </p>
        </div>
        <div className="card_confirmation_applicant_inner card_confirmation_inner">
          <h3 className="card_confirmation_applicant_title"> Пол заявителя </h3>
          {props.applicant.code_sex === 1
            ? <p className="card_confirmation_applicant_sex"> Мужской </p>
            : <p className="card_confirmation_applicant_sex"> Женский </p>
          }
        </div>
        <div className="card_confirmation_applicant_inner card_confirmation_inner">
          <h3 className="card_confirmation_applicant_title"> Место рождения </h3>
          <p className="card_confirmation_applicant_place_of_birth">
            {props.applicant.place_of_birth}
          </p>
        </div>
        <div className="card_confirmation_applicant_inner card_confirmation_inner">
          <h3 className="card_confirmation_applicant_title"> Дата рождения </h3>
          <p className="card_confirmation_applicant_date_of_birth">
            {new Date(props.applicant.date_of_birth.toString()).toLocaleDateString()}
          </p>
        </div>
        <div className="card_confirmation_applicant_inner card_confirmation_inner">
          <h3 className="card_confirmation_applicant_title"> Место проживания/пребывания </h3>
          <p className="card_confirmation_applicant_place_of_residence">
            {props.applicant.place_of_residence}
          </p>
        </div>
        <div className="card_confirmation_applicant_inner card_confirmation_inner">
          <h3 className="card_confirmation_applicant_title"> Номер телефона </h3>
          <p className="card_confirmation_applicant_telephone">
            {props.applicant.telephone}
          </p>
        </div>
        <div className="card_confirmation_applicant_inner card_confirmation_inner">
          <h3 className="card_confirmation_applicant_title"> Номер телефона </h3>
          {props.applicant.other_nationality
            ? <p className="card_confirmation_applicant_other_nationality">
              {props.applicant.email}
            </p>
            : <p className="card_confirmation_applicant_other_nationality"> Отсутствует </p>
          }
        </div>
        <div className="card_confirmation_applicant_inner card_confirmation_inner">
          <h3 className="card_confirmation_applicant_title"> Электронная почта </h3>
          {props.applicant.email
            ? <p className="card_confirmation_applicant_email">
              {props.applicant.email}
            </p>
            : <p className="card_confirmation_applicant_email"> Отсутствует </p>
          }
        </div>
        <div className="card_confirmation_applicant_inner card_confirmation_inner">
          <h3 className="card_confirmation_applicant_title"> Родственники </h3>
          <p className="card_confirmation_applicant_father">
            Отец:&nbsp;
            {props.applicant.relatives.full_name_father?.length
              ? props.applicant.relatives.full_name_father
              : "Отсутствует"
            }
          </p>
          <p className="card_confirmation_applicant_mother">
            Матерь:&nbsp;
            {props.applicant.relatives.full_name_mother?.length
              ? props.applicant.relatives.full_name_mother
              : "Отсутствует"
            }
          </p>
        </div>
        <div className="card_confirmation_relative_inner card_confirmation_inner">
          <h3 className="card_confirmation_relative_title"> Семейное положение </h3>
          <p className="card_confirmation_relative_family_status">
            {familyStatus}
          </p>
        </div>
      </div>

      <div className="card_confirmation_passport_applicant">
        <h2 className="card_confirmation_passport_applicant_header card_confirmation_header">
          Заявление о замене/выдаче паспорта
        </h2>
        <div className="card_confirmation_passport_applicant_inner card_confirmation_inner">
          <h3 className="card_confirmation_passport_applicant_title"> Причина выдачи/замены </h3>
          <p className="card_confirmation_passport_applicant_fullname">
            {props.passportApplication.grounds_for_extradition}
          </p>
        </div>
      </div>

      <div className="card_confirmation_document">
        <h2 className="card_confirmation_document_header card_confirmation_header">
          Сведения о предъявленном удостоверении личности
        </h2>
        <div className="card_confirmation_document_inner card_confirmation_inner">
          <h3 className="card_confirmation_document_title"> Тип предъявленного документа </h3>
          <p className="card_confirmation_document_type_document">
            {props.document.type_document}
          </p>
        </div>
        <div className="card_confirmation_document_inner card_confirmation_inner">
          <h3 className="card_confirmation_document_title"> Серия и номер паспорта </h3>
          <Space direction="horizontal" style={{ width: "100%" }}>
            <p className="card_confirmation_document_series">
              {props.document.document.series}
            </p>
            <p className="card_confirmation_document_id">
              {props.document.document.id}
            </p>
          </Space>
        </div>
        <div className="card_confirmation_document_inner card_confirmation_inner">
          <h3 className="card_confirmation_document_title"> Дата выдачи документа </h3>
          <p className="card_confirmation_document_date_of_issue">
            {new Date(props.document.date_of_issue.toString()).toLocaleDateString()}
          </p>
        </div>
        <div className="card_confirmation_document_inner card_confirmation_inner">
          <h3 className="card_confirmation_document_title"> Кем выдан документ </h3>
          <p className="card_confirmation_document_issued_by">
            {props.document.issued_by}
          </p>
        </div>
      </div>

      <div className="card_confirmation_marriage">
        <h2 className="card_confirmation_marriage_header card_confirmation_header">
          Сведения о браке
        </h2>
        {props.marriage
          ? <>
            <div className="card_confirmation_marriage_inner card_confirmation_inner">
              <h3 className="card_confirmation_marriage_title"> Дата заключения/расторжения брака </h3>
              <p className="card_confirmation_marriage_date_of_conclusion">
                {new Date(props.marriage.date_of_conclusion!.toString()).toLocaleDateString()}
              </p>
            </div>
            <div className="card_confirmation_marriage_inner card_confirmation_inner">
              <h3 className="card_confirmation_relative_title"> ФИО супруга/супруги </h3>
              <p className="card_confirmation_marriage_full_name_spouse">
                {props.marriage.full_name_spouse}
              </p>
            </div>
            <div className="card_confirmation_marriage_inner card_confirmation_inner">
              <h3 className="card_confirmation_marriage_title"> Дата рождения супруга/супруги </h3>
              <p className="card_confirmation_marriage_date_of_birth_spouse">
                {new Date(props.marriage.date_of_birth_spouse!.toString()).toLocaleDateString()}
              </p>
            </div>
          </>
          : <p style={{ textAlign: "center" }}> Отсутствуют </p>
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
          onClick={props.onClickContinue}
          style={{ width: "50%" }}
        >
          {props.textButton ?? "Продолжить"}
        </Button>
      </Space.Compact>
    </Card >
  )
};


export default CardConfirmationApplication;