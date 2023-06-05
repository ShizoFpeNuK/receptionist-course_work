import { useForm } from "antd/es/form/Form";
import { useEffect, useRef, useState } from "react";
import { ILostPassport } from "../../models/types/lostPassport.model";
import dayjs from "dayjs";
import LostPassportStore from "../../store/applications/LostPassportStore";
import CardFormLostPassport from "./cards/CardFormLostPassport";
import CardConfirmationLostPassport from "./cards/CardConfirmationLostPassport";


interface ValuesFormLostPassport extends ILostPassport {
  date_of_loss: dayjs.Dayjs,
  date_of_issue: dayjs.Dayjs,
  date_of_kidnapping: dayjs.Dayjs,
}

interface LostPassportComponentProps {
  lostPassportStore: LostPassportStore,
  textButton?: string,
}


const LostPassportComponent = ({ lostPassportStore, ...props }: LostPassportComponentProps) => {
  const [form] = useForm();
  const [isOpenConfirmation, setIsOpenConfirmation] = useState<boolean>(false);
  const [isOpenFormLostPassport, setIsOpenFormLostPassport] = useState<boolean>(true);
  const firstRender = useRef<boolean>(true);


  const onFinish = (values: ValuesFormLostPassport) => {
    const correctValues: ILostPassport = {
      ...values,
      "date_of_loss": values["date_of_loss"].format("YYYY-MM-DD"),
      "date_of_issue": values["date_of_issue"]?.format("YYYY-MM-DD"),
      "date_of_kidnapping": values["date_of_kidnapping"]?.format("YYYY-MM-DD"),
    }
    lostPassportStore.setLostPassportInfo(correctValues);

    setIsOpenFormLostPassport(false);
    setIsOpenConfirmation(true);
  }


  const cancelConfirmation = () => {
    setIsOpenConfirmation(false);
    setIsOpenFormLostPassport(true);
  }

  const onClickConfirm = () => {
    lostPassportStore.setIsApplicantionReady(true);
    setIsOpenConfirmation(false);
  }


  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (!lostPassportStore.isApplicantionReady) {
      setIsOpenConfirmation(true);
    }
  }, [lostPassportStore.isApplicantionReady])


  return (
    <div className="lostpassport_forms" style={{ margin: "0 20%" }}>
      {isOpenFormLostPassport &&
        <CardFormLostPassport
          form={form}
          onFinish={onFinish}
          lostPassport={lostPassportStore.lostPassportInfo}
        />
      }
      {isOpenConfirmation &&
        <CardConfirmationLostPassport
          lostPassport={lostPassportStore.lostPassportInfo!}
          onClickCreate={onClickConfirm}
          onClickCancel={cancelConfirmation}
          textButton={props.textButton}
        />
      }
    </div>
  )
};


export default LostPassportComponent;