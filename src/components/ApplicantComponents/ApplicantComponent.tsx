import '../../style/css/ApplicantComponent/applicantComponent.css';
import { useForm } from "antd/es/form/Form";
import { useEffect, useState } from "react";
import { IApplicantDocument, IApplicantGeneralInfo, IApplicantRelative } from "../../models/types/applicant.model";
import dayjs from "dayjs";
import ButtonStep from "../Buttons/ButtonStep";
import ApplicantStore from "../../store/ApplicantStore";
import CardConfirmation from "./cards/CardConfirmation";
import CardFormApplicantDocument from "./cards/CardFormApplicantDocument";
import CardFormApplicantRelative from "./cards/CardFormApplicantRelative"
import CardFormApplicantGeneralInfo from "./cards/CardFormApplicantGeneralInfo";


const applicant = new ApplicantStore();

interface ValuesFormGeneralInfo extends IApplicantGeneralInfo {
  date_of_birth: dayjs.Dayjs,
}

interface ValuesFormRelative extends IApplicantRelative {
  date_of_conclusion: dayjs.Dayjs,
  date_of_birth_spouse: dayjs.Dayjs,
}


const ApplicantComponent = () => {
  const [formGenetalInfo] = useForm();
  const [formDocument] = useForm();
  const [formRelative] = useForm();
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

    applicant.setApplicantGeneralInfo(correctValues);
    console.log(applicant.applicantGeneralInfo);
  }

  const onFinishDocument = (values: IApplicantDocument) => {
    setIsOpenFormDocument(false);
    setIsOpenFormRelative(true);

    applicant.setApplicantDocument(values);
    console.log(applicant.applicantDocument);
  }

  const onFinishRelative = (values: ValuesFormRelative) => {
    setIsOpenFormRelative(false);
    setIsOpenConfirmation(true);

    const correctValues: IApplicantRelative = {
      ...values,
      "date_of_conclusion": values["date_of_conclusion"]?.format("YYYY-MM-DD"),
      "date_of_birth_spouse": values["date_of_birth_spouse"]?.format("YYYY-MM-DD"),
    }

    applicant.setApplicantRelative(correctValues);
    console.log(applicant.applicantRelative);
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
    formGenetalInfo.resetFields();
    formDocument.resetFields();
    formRelative.resetFields();
  }

  useEffect(() => { //Пока отставить
    return () => {
      applicant.deleteApplicantGeneralInfo();
      applicant.deleteApplicantDocument();
      applicant.deleteApplicantRelative();
      console.log("Очистка applicant");
    }
  }, [])


  return (
    <div className="applicant">
      <h1 className="applicant_header title--border"> Заявление о выдаче/замене паспорта </h1>
      <div className="applicant_cardform">
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
              <ButtonStep onClick={cancelDocument} style={{ width: "33.333%" }}> Назад </ButtonStep>
            }
          />
        }
        {isOpenFormRelative &&
          <CardFormApplicantRelative
            form={formRelative}
            title="Данные о семейном положении и родственниках"
            onFinish={onFinishRelative}
            buttons={
              <ButtonStep onClick={cancelRelative} style={{ width: "33.333%" }}> Назад </ButtonStep>
            }
          />
        }
        {isOpenConfirmation &&
          <CardConfirmation applicant={applicant.getApplicant()} />
        }
      </div>
    </div>
  );
}


export default ApplicantComponent;