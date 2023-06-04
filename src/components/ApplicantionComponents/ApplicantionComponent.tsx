import { useForm } from "antd/es/form/Form";
import { useEffect, useRef, useState } from "react";
import {
  IApplicantionDocument,
  IApplicantionApplicant,
  IApplicantionPassportApplication,
  IApplicantionMarriage
} from "../../models/types/applicantion.model";
import dayjs from "dayjs";
import ButtonStep from "../others/Buttons/ButtonStep";
import ApplicantionStore from "../../store/applications/ApplicantStore";
import CardFormApplicantDocument from "./cards/CardFormApplicantDocument";
import CardFormApplicantMarriage from "./cards/CardFormApplicantMarriage"
import CardConfirmationApplication from "./cards/CardConfirmationApplication";
import CardFormApplicantApplicant from "./cards/CardFormApplicantApplicant";
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

interface ApplicantionComponentProps {
  applicantionStore: ApplicantionStore,
  textButton?: string,
}


const ApplicantionComponent = ({ applicantionStore, ...props }: ApplicantionComponentProps) => {
  const [formApplicant] = useForm();
  const [formPassportApplication] = useForm();
  const [formDocument] = useForm();
  const [formMarriage] = useForm();
  const [isOpenFormApplicant, setIsOpenFormApplicant] = useState<boolean>(true);
  const [isOpenFormPassportApplication, setIsOpenFormPassportApplication] = useState<boolean>(false);
  const [isOpenFormDocument, setIsOpenFormDocument] = useState<boolean>(false);
  const [isOpenFormMarriage, setIsOpenFormMarriage] = useState<boolean>(false);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState<boolean>(false);
  const firstRender = useRef<boolean>(true);


  const onFinishApplicant = (values: ValuesFormGeneralInfo) => {
    const correctValues: IApplicantionApplicant = {
      ...values,
      "date_of_birth": values["date_of_birth"].format("YYYY-MM-DD"),
    }
    applicantionStore.setApplicantionApplicant(correctValues);

    setIsOpenFormApplicant(false);
    setIsOpenFormPassportApplication(true);
  }

  const onFinishPassportApplication = (values: IApplicantionPassportApplication) => {
    applicantionStore.setApplicationPassportApplication(values);

    setIsOpenFormPassportApplication(false);
    setIsOpenFormDocument(true);
  }

  const onFinishDocument = (values: ValuesFormDocument) => {
    const correctValues: IApplicantionDocument = {
      ...values,
      "date_of_issue": values["date_of_issue"].format("YYYY-MM-DD"),
      "date_of_birth": values["date_of_birth"].format("YYYY-MM-DD"),
    }
    applicantionStore.setApplicantionDocument(correctValues);

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
      applicantionStore.setApplicantionMarriage(correctValues);
    } else {
      applicantionStore.setApplicantionMarriage(null);
    }

    setIsOpenFormMarriage(false);
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

  const cancelConfirmation = () => {
    setIsOpenConfirmation(false);
    setIsOpenFormMarriage(true);
  }


  const sendApplicantion = async () => {
    applicantionStore.setIsApplicantionSend(true);
    setIsOpenConfirmation(false);
  }


  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (!applicantionStore.isApplicantionSend) {
      setIsOpenConfirmation(true);
    }
  }, [applicantionStore.isApplicantionSend])


  return (
    <div className="applicant_forms" style={{ padding: "0 20%" }}>
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
          codeFamilyStatus={applicantionStore.applicantionApplicant?.code_family_status}
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
      {isOpenConfirmation &&
        <CardConfirmationApplication
          applicant={applicantionStore.getApplicantion()}
          onClickCreate={sendApplicantion}
          onClickCancel={cancelConfirmation}
          textButton={props.textButton}
        />
      }
    </div>
  )
};


export default ApplicantionComponent;