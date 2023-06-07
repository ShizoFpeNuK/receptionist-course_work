import { useForm } from "antd/es/form/Form";
import { ReactNode, useEffect, useRef, useState } from "react";
import {
  IApplicantionDocument, IApplicantionApplicant,
  IApplicantionPassportApplication, IApplicantionMarriage
} from "../../models/types/passportApplicantion.model";
import dayjs from "dayjs";
import ButtonStep from "../others/Buttons/ButtonStep";
import ApplicantionStore from "../../store/applications/ApplicantionStore";
import CardConfirmationApplication from "./cards/CardConfirmationApplication";
import CardFormApplicantionDocument from "./cards/CardFormApplicantionDocument";
import CardFormApplicantionMarriage from "./cards/CardFormApplicantionMarriage"
import CardFormApplicantionApplicant from "./cards/CardFormApplicantionApplicant";
import CardFormApplicantionPassportApplicantion from "./cards/CardFormApplicantionPassportApplicantion";


const passportApplicationValues = {
  grounds_for_extradition: "Утеря паспорта",
  full_name: {
    first_name: null,
    last_name: null,
    middle_name: null
  },
  place_of_birth: null,
  date_of_birth: null,
  code_sex: null,
  requisites: null
}

interface ValuesFormGeneralInfo extends IApplicantionApplicant {
  date_of_birth: dayjs.Dayjs,
}

interface ValuesFormPassportApplication extends IApplicantionPassportApplication {
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
  buttonCancel?: ReactNode,
  isLostPassport?: boolean,
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
    if (props.isLostPassport) {
      applicantionStore.setApplicationPassportApplication(passportApplicationValues);
      applicantionStore.setApplicantionDocument(null);
      setIsOpenFormMarriage(true);
    } else {
      setIsOpenFormPassportApplication(true);
    }
  }

  const onFinishPassportApplication = (values: ValuesFormPassportApplication) => {
    const correctValues: IApplicantionPassportApplication = {
      ...values,
      "date_of_birth": values["date_of_birth"]?.format("YYYY-MM-DD"),
    }
    applicantionStore.setApplicationPassportApplication(correctValues);

    setIsOpenFormPassportApplication(false);
    setIsOpenFormDocument(true);
  }

  const onFinishDocument = (values: ValuesFormDocument) => {
    const correctValues: IApplicantionDocument = {
      ...values,
      "date_of_issue": values["date_of_issue"].format("YYYY-MM-DD"),
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
    if (props.isLostPassport) {
      setIsOpenFormApplicant(true);
    } else {
      setIsOpenFormDocument(true);
    }
  }

  const cancelConfirmation = () => {
    setIsOpenConfirmation(false);
    setIsOpenFormMarriage(true);
  }


  const sendApplicantion = async () => {
    applicantionStore.setIsApplicantionReady(true);
    setIsOpenConfirmation(false);
  }


  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (!applicantionStore.isApplicantionReady) {
      setIsOpenConfirmation(true);
    }
  }, [applicantionStore.isApplicantionReady])


  return (
    <div className="applicant_forms" style={{ padding: "0 20%" }}>
      {isOpenFormApplicant &&
        <CardFormApplicantionApplicant
          form={formApplicant}
          title="Данные о заявителе"
          onFinish={onFinishApplicant}
          applicant={applicantionStore.applicantionApplicant}
          buttons={props.buttonCancel}
        />
      }
      {isOpenFormPassportApplication &&
        <CardFormApplicantionPassportApplicantion
          form={formPassportApplication}
          title="Заявление о выдачи/замене паспорта"
          onFinish={onFinishPassportApplication}
          passportApplication={applicantionStore.applicantionPassportApplication}
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
        <CardFormApplicantionDocument
          form={formDocument}
          title="Данные о предъявленном документе"
          onFinish={onFinishDocument}
          document={applicantionStore.applicantionDocument}
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
        <CardFormApplicantionMarriage
          form={formMarriage}
          title="Данные о браке"
          codeFamilyStatus={applicantionStore.applicantionApplicant?.code_family_status}
          onFinish={onFinishMarriage}
          mirrage={applicantionStore.applicantionMarriage}
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
          marriage={applicantionStore.applicantionMarriage!}
          document={applicantionStore.applicantionDocument!}
          applicant={applicantionStore.applicantionApplicant!}
          passportApplication={applicantionStore.applicantionPassportApplication!}
          onClickContinue={sendApplicantion}
          onClickCancel={cancelConfirmation}
          textButton={props.textButton}
        />
      }
    </div>
  )
};


export default ApplicantionComponent;