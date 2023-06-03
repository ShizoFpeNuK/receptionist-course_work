import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { ITemporaryCertificate } from "../../models/types/temporaryCertificate.model";
import {
  IApplicantionDocument,
  IApplicantionApplicant,
  IApplicantionPassportApplication,
  IApplicantionMarriage
} from "../../models/types/applicant.model";
import dayjs from "dayjs";
import ButtonStep from "../../components/Buttons/ButtonStep";
import ApplicantionStore from "../../store/ApplicantStore";
import ApplicationsServices from "../../services/applications.service";
import CardFormApplicantDocument from "../../components/ApplicantComponents/cards/CardFormApplicantDocument";
import CardFormApplicantMarriage from "./cards/CardFormApplicantMarriage"
import CardConfirmationApplication from "./cards/CardConfirmationApplication";
import CardFormApplicantApplicant from "./cards/CardFormApplicantApplicant";
import CardFormTemporaryCertificate from "./cards/CardFormTemporaryCertificate";
import CardFormApplicantPassportApplicantion from "./cards/CardFormApplicantPassportApplicantion";


interface ValuesFormGeneralInfo extends IApplicantionApplicant {
  date_of_birth: dayjs.Dayjs,
}

interface ValuesFormDocument extends IApplicantionDocument {
  date_of_issue: dayjs.Dayjs,
  date_of_birth: dayjs.Dayjs,
}


interface ValuesFormMarriage extends IApplicantionMarriage {
  date_of_conclusion: dayjs.Dayjs,
  date_of_birth_spouse: dayjs.Dayjs,
}

interface ValuesFormTemporaryCertificate extends ITemporaryCertificate {
  valid_until: dayjs.Dayjs,
}

interface ApplicantComponentProps {
  applicantStore: ApplicantionStore,
  textButton?: string,
}


const ApplicantComponent = ({ applicantStore, ...props }: ApplicantComponentProps) => {
  const [formApplicant] = useForm();
  const [formPassportApplication] = useForm();
  const [formDocument] = useForm();
  const [formMarriage] = useForm();
  const [formTemporaryCertificate] = useForm();
  // const [sendSuccess, setSendSuccess] = useState<boolean>(false);
  // const [sendError, setSendError] = useState<boolean>(false);
  const [isOpenFormApplicant, setIsOpenFormApplicant] = useState<boolean>(true);
  const [isOpenFormPassportApplication, setIsOpenFormPassportApplication] = useState<boolean>(false);
  const [isOpenFormDocument, setIsOpenFormDocument] = useState<boolean>(false);
  const [isOpenFormMarriage, setIsOpenFormMarriage] = useState<boolean>(false);
  const [isOpenFormTemporaryCertificate, setIsOpenFormTemporaryCertificate] = useState<boolean>(false);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState<boolean>(false);


  const onFinishApplicant = (values: ValuesFormGeneralInfo) => {
    const correctValues: IApplicantionApplicant = {
      ...values,
      "date_of_birth": values["date_of_birth"].format("YYYY-MM-DD"),
    }
    applicantStore.setApplicantionApplicant(correctValues);

    setIsOpenFormApplicant(false);
    setIsOpenFormPassportApplication(true);
  }

  const onFinishPassportApplication = (values: IApplicantionPassportApplication) => {
    applicantStore.setApplicationPassportApplication(values);

    setIsOpenFormPassportApplication(false);
    setIsOpenFormDocument(true);
  }

  const onFinishDocument = (values: ValuesFormDocument) => {
    const correctValues: IApplicantionDocument = {
      ...values,
      "date_of_issue": values["date_of_issue"].format("YYYY-MM-DD"),
      "date_of_birth": values["date_of_birth"].format("YYYY-MM-DD"),
    }
    applicantStore.setApplicantionDocument(correctValues);

    setIsOpenFormDocument(false);
    setIsOpenFormMarriage(true);
  }

  const onFinishMarriage = (values: ValuesFormMarriage) => {
    if (values.full_name_spouse) {
      const correctValues: IApplicantionMarriage = {
        ...values,
        "date_of_conclusion": values["date_of_conclusion"]?.format("YYYY-MM-DD"),
        "date_of_birth_spouse": values["date_of_birth_spouse"]?.format("YYYY-MM-DD"),
      }
      applicantStore.setApplicantionMarriage(correctValues);
    } else {
      applicantStore.setApplicantionMarriage(null);
    }

    setIsOpenFormMarriage(false);
    setIsOpenFormTemporaryCertificate(true);
  }

  const onFinishTemporaryCertificate = (values: ValuesFormTemporaryCertificate) => {
    const correctValues: ITemporaryCertificate = {
      ...values,
      "valid_until": values["valid_until"]?.format("YYYY-MM-DD"),
    }
    applicantStore.setTemporaryCertificate(correctValues);

    setIsOpenFormTemporaryCertificate(false);
    setIsOpenConfirmation(true);
  }


  const cancelPassportApplication = () => {
    setIsOpenFormPassportApplication(false);
    setIsOpenFormApplicant(true);
  }

  const cancelDocument = () => {
    setIsOpenFormDocument(false);
    setIsOpenFormPassportApplication(true);
  }

  const cancelMarriage = () => {
    setIsOpenFormMarriage(false);
    setIsOpenFormDocument(true);
  }

  const cancelTemporaryCertificate = () => {
    setIsOpenFormTemporaryCertificate(false);
    setIsOpenFormMarriage(true);
  }

  const cancelConfirmation = () => {
    setIsOpenConfirmation(false);
    setIsOpenFormTemporaryCertificate(true);
  }


  const onClickConfirm = async () => {
    await ApplicationsServices.createPassportApplication(applicantStore.getApplicationCreate())
      .then(() => {
        console.log("Всё гуд!");
      })
      .catch((err) => {
        console.log(err);
      })
    // setSendSuccess(true);
    // setSendSuccess(false);

    setIsOpenConfirmation(false);
    applicantStore.setIsApplicantionSend(true);
    formApplicant.resetFields();
    formDocument.resetFields();
    formMarriage.resetFields();
    formTemporaryCertificate.resetFields();
  }


  return (
    <div className="applicant_forms" style={{ margin: "0 20%" }}>
      {isOpenFormApplicant &&
        <CardFormApplicantApplicant
          form={formApplicant}
          title="Данные о заявителе"
          onFinish={onFinishApplicant}
        />
      }
      {isOpenFormPassportApplication &&
        <CardFormApplicantPassportApplicantion
          form={formPassportApplication}
          title="Заявление о выдачи/замене паспорта"
          onFinish={onFinishPassportApplication}
          buttons={
            <ButtonStep
              onClick={cancelPassportApplication}
              style={{ width: "33.333%" }}
            >
              Назад
            </ButtonStep>
          }
        />
      }
      {isOpenFormDocument &&
        <CardFormApplicantDocument
          form={formDocument}
          title="Данные о предъявленном документе"
          onFinish={onFinishDocument}
          buttons={
            <ButtonStep
              onClick={cancelDocument}
              style={{ width: "33.333%" }}
            >
              Назад
            </ButtonStep>
          }
        />
      }
      {isOpenFormMarriage &&
        <CardFormApplicantMarriage
          form={formMarriage}
          title="Данные о браке"
          codeFamilyStatus={applicantStore.applicantionApplicant?.code_family_status}
          onFinish={onFinishMarriage}
          buttons={
            <ButtonStep
              onClick={cancelMarriage}
              style={{ width: "33.333%" }}
            >
              Назад
            </ButtonStep>
          }
        />
      }
      {isOpenFormTemporaryCertificate &&
        <CardFormTemporaryCertificate
          form={formTemporaryCertificate}
          title="Данные о временном удостоверении"
          onFinish={onFinishTemporaryCertificate}
          buttons={
            <ButtonStep
              onClick={cancelTemporaryCertificate}
              style={{ width: "33.333%" }}
            >
              Назад
            </ButtonStep>}
        />
      }
      {isOpenConfirmation &&
        <CardConfirmationApplication
          applicant={applicantStore.getApplicantion()}
          onClickCreate={onClickConfirm}
          onClickCancel={cancelConfirmation}
          textButton={props.textButton}
        />
      }
    </div>
  )
};


export default ApplicantComponent;