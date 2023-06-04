import { useForm } from "antd/es/form/Form";
import { ITemporaryCertificate } from "../../models/types/temporaryCertificate.model";
import { useEffect, useRef, useState } from "react";
import dayjs from "dayjs";
import TemporaryCertificateStore from "../../store/applications/TemporaryCertificateStore";
import CardFormTemporaryCertificate from "./cards/CardFormTemporaryCertificate";
import CardConfirmationTemporaryCertificate from "./cards/CardConfirmationTemporaryCertificate";


interface ValuesFormTemporaryCertificate extends ITemporaryCertificate {
  valid_until: dayjs.Dayjs,
}

interface TemporaryCertificateComponentProps {
  temporaryCertificateStore: TemporaryCertificateStore,
  textButton?: string,
}


const TemporaryCertificateComponent = (
  { temporaryCertificateStore, ...props }: TemporaryCertificateComponentProps) => {
  const [formTemporaryCertificate] = useForm();
  const [isOpenFormTemporaryCertificate, setIsOpenFormTemporaryCertificate] = useState<boolean>(true);
  const [isOpenConfirmation, setIsOpenConfirmation] = useState<boolean>(false);
  const firstRender = useRef<boolean>(true);


  const onFinishTemporaryCertificate = (values: ValuesFormTemporaryCertificate) => {
    const correctValues: ITemporaryCertificate = {
      ...values,
      "valid_until": values["valid_until"]?.format("YYYY-MM-DD"),
    }
    temporaryCertificateStore.setTemporaryCertificate(correctValues);

    setIsOpenFormTemporaryCertificate(false);
    setIsOpenConfirmation(true);
  }


  const cancelConfirmation = () => {
    setIsOpenConfirmation(false);
    setIsOpenFormTemporaryCertificate(true);
  }


  const sendApplicantion = async () => {
    setIsOpenConfirmation(false);
    temporaryCertificateStore.setIsApplicantionSend(true);
    formTemporaryCertificate.resetFields();
  }


  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (!temporaryCertificateStore.isApplicantionSend) {
      setIsOpenConfirmation(true);
    }
  }, [temporaryCertificateStore.isApplicantionSend])


  return (
    <div className="temporary_certificate_forms" style={{ padding: "0 20%" }}>
      {isOpenFormTemporaryCertificate &&
        <CardFormTemporaryCertificate
          form={formTemporaryCertificate}
          title="Данные о временном удостоверении"
          onFinish={onFinishTemporaryCertificate}
        />
      }
      {isOpenConfirmation &&
        <CardConfirmationTemporaryCertificate
          temporaryCertificate={temporaryCertificateStore.temporaryCertificate!}
          onClickCreate={sendApplicantion}
          onClickCancel={cancelConfirmation}
          textButton={props.textButton}
        />
      }
    </div>
  )
};


export default TemporaryCertificateComponent;