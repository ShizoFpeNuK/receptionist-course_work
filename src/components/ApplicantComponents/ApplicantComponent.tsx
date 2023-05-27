import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { IApplicantDocument, IApplicantGeneralInfo, IApplicantRelative } from "../../models/types/applicant.model";
import dayjs from "dayjs";
import ButtonStep from "../../components/Buttons/ButtonStep";
import ApplicantStore from "../../store/ApplicantStore";
import CardConfirmationApplication from "./cards/CardConfirmationApplication";
import CardFormApplicantDocument from "../../components/ApplicantComponents/cards/CardFormApplicantDocument";
import CardFormApplicantRelative from "../../components/ApplicantComponents/cards/CardFormApplicantRelative"
import CardFormApplicantGeneralInfo from "../../components/ApplicantComponents/cards/CardFormApplicantGeneralInfo";


interface ValuesFormGeneralInfo extends IApplicantGeneralInfo {
  date_of_birth: dayjs.Dayjs,
}

interface ValuesFormDocument extends IApplicantDocument {
  date_of_issue: dayjs.Dayjs,
}


interface ValuesFormRelative extends IApplicantRelative {
  date_of_conclusion: dayjs.Dayjs,
  date_of_birth_spouse: dayjs.Dayjs,
}

interface ApplicantComponentProps {
  applicantStore: ApplicantStore,
}


const ApplicantComponent = ({ applicantStore, ...props }: ApplicantComponentProps) => {
  const [formGenetalInfo] = useForm();
  const [formDocument] = useForm();
  const [formRelative] = useForm();
  // const [sendSuccess, setSendSuccess] = useState<boolean>(false);
  // const [sendError, setSendError] = useState<boolean>(false);
  const [isOpenFormGeneralInfo, setIsOpenFormGeneralInfo] = useState<boolean>(true);
  const [isOpenFormDocument, setIsOpenFormDocument] = useState<boolean>(false);
  const [isOpenFormRelative, setIsOpenFormRelative] = useState<boolean>(false);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState<boolean>(false);


  const onFinishGeneralInfo = (values: ValuesFormGeneralInfo) => {
    setIsOpenFormGeneralInfo(false);
    setIsOpenFormDocument(true);

    const correctValues: IApplicantGeneralInfo = {
      ...values,
      "date_of_birth": values["date_of_birth"].format("YYYY-MM-DD"),
    }
    applicantStore.setApplicantGeneralInfo(correctValues);
  }

  const onFinishDocument = (values: ValuesFormDocument) => {
    setIsOpenFormDocument(false);
    setIsOpenFormRelative(true);

    const correctValues: IApplicantDocument = {
      ...values,
      "date_of_issue": values["date_of_issue"].format("YYYY-MM-DD"),
    }
    applicantStore.setApplicantDocument(correctValues);
  }

  const onFinishRelative = (values: ValuesFormRelative) => {
    setIsOpenFormRelative(false);
    setIsOpenConfirmation(true);

    const correctValues: IApplicantRelative = {
      ...values,
      "date_of_conclusion": values["date_of_conclusion"]?.format("YYYY-MM-DD"),
      "date_of_birth_spouse": values["date_of_birth_spouse"]?.format("YYYY-MM-DD"),
    }
    applicantStore.setApplicantRelative(correctValues);
  }

  const cancelDocument = () => {
    setIsOpenFormDocument(false);
    setIsOpenFormGeneralInfo(true);
  }

  const cancelRelative = () => {
    setIsOpenFormRelative(false);
    setIsOpenFormDocument(true);
  }

  const cancelConfirmation = () => {
    setIsOpenConfirmation(false);
    setIsOpenFormRelative(true);
  }

  const onClickConfirm = () => {
    //service
    // setSendSuccess(true);
    // setSendSuccess(false);
    console.log(applicantStore.getApplicant());

    setIsOpenConfirmation(false);
    applicantStore.setIsApplicantSend(true);
    formGenetalInfo.resetFields();
    formDocument.resetFields();
    formRelative.resetFields();
  }


  return (
    <div className="applicant_forms" style={{ margin: "0 20%" }}>
      {isOpenFormGeneralInfo &&
        <CardFormApplicantGeneralInfo
          form={formGenetalInfo}
          title="Данные о заявителе"
          onFinish={onFinishGeneralInfo}
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
      {isOpenFormRelative &&
        <CardFormApplicantRelative
          form={formRelative}
          title="Данные о семейном положении и родственниках"
          onFinish={onFinishRelative}
          buttons={
            <ButtonStep
              onClick={cancelRelative}
              style={{ width: "33.333%" }}
            >
              Назад
            </ButtonStep>
          }
        />
      }
      {isOpenConfirmation &&
        <CardConfirmationApplication
          applicant={applicantStore.getApplicant()}
          onClickCreate={onClickConfirm}
          onClickCancel={cancelConfirmation}
        />
      }
    </div>
  )
}


export default ApplicantComponent;