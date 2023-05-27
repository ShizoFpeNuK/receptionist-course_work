import { useForm } from "antd/es/form/Form";
import { ILostPassport } from "../../models/types/lostPassport";
import dayjs from "dayjs";
import LostPassportStore from "../../store/LostPassportStore";
import CardFormLostPassport from "./cards/CardFormLostPassport";
import CardConfirmationLostPassport from "./cards/CardConfirmationLostPassport";
import { useState } from "react";
import ButtonStep from "../Buttons/ButtonStep";


interface ValuesForm extends ILostPassport {
  date_of_loss: dayjs.Dayjs,
  date_of_kidnapping: dayjs.Dayjs,
  date_of_application: dayjs.Dayjs,
}

interface LostPassportComponentProps {
  lostPassportStore: LostPassportStore
}


const LostPassportComponent = ({ lostPassportStore, ...props }: LostPassportComponentProps) => {
  const [form] = useForm();
  const [isOpenConfirmation, setIsOpenConfirmation] = useState<boolean>(false);
  const [isOpenFormLostPassport, setIsOpenFormLostPassport] = useState<boolean>(true);




  const onFinish = (values: ValuesForm) => {
    const correctValues: ILostPassport = {
      ...values,
      "date_of_loss": values["date_of_loss"].format("YYYY-MM-DD"),
      "date_of_kidnapping": values["date_of_kidnapping"].format("YYYY-MM-DD"),
      "date_of_application": values["date_of_application"].format("YYYY-MM-DD"),
    }

    lostPassportStore.setLostPassportInfo(correctValues);
    //ИЛИ service
    setIsOpenFormLostPassport(false);
    setIsOpenConfirmation(true);
  }
  

  const cancelConfirmation = () => {
    setIsOpenConfirmation(false);
    setIsOpenFormLostPassport(true);
  }

  const onClickConfirm = () => {
    setIsOpenConfirmation(false);
    form.resetFields();
  }


  return (
    <div className="lostpassport_forms" style={{ margin: "0 20%" }}>
      {isOpenFormLostPassport &&
        <CardFormLostPassport
          form={form}
          onFinish={onFinish}
        />
      }
      {isOpenConfirmation &&
        <CardConfirmationLostPassport
          lostPassport={lostPassportStore.lostPassportInfo!}
          onClickCreate={onClickConfirm}
          onClickCancel={cancelConfirmation}
        />
      }
    </div>
  )
}


export default LostPassportComponent;