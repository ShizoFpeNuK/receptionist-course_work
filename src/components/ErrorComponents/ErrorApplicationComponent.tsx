import { useForm } from "antd/es/form/Form";
import { IErrorApplication } from "../../models/types/errorApplication";
import { useEffect, useRef, useState } from "react";
import ErrorApplicationStore from "../../store/applications/ErrorApplicationStore";
import CardFormErrorApplication from "./cards/CardFormErrorApplication";
import CardConfirmationErrorApplication from "./cards/CardConfirmErrorApplication";


interface ErrorApplicationComponentProps {
  errorApplicationStore: ErrorApplicationStore,
  textButton?: string,
}


const ErrorApplicationComponent = ({ errorApplicationStore, ...props }: ErrorApplicationComponentProps) => {
  const [form] = useForm();
  const [isOpenConfirmation, setIsOpenConfirmation] = useState<boolean>(false);
  const [isOpenFormErrorApplication, setIsOpenFormErrorApplication] = useState<boolean>(true);
  const firstRender = useRef<boolean>(true);


  const onFinish = (values: IErrorApplication) => {
    errorApplicationStore.setErrorApplication(values);

    setIsOpenFormErrorApplication(false);
    setIsOpenConfirmation(true);
  }


  const cancelConfirmation = () => {
    setIsOpenConfirmation(false);
    setIsOpenFormErrorApplication(true);
  }

  const onClickConfirm = () => {
    errorApplicationStore.setIsApplicantionReady(true);
    setIsOpenConfirmation(false);
  }


  useEffect(() => {
    if (firstRender.current) {
      firstRender.current = false;
      return;
    }

    if (!errorApplicationStore.isApplicantionReady) {
      setIsOpenConfirmation(true);
    }
  }, [errorApplicationStore.isApplicantionReady])


  return (
    <div className="lostpassport_forms" style={{ margin: "0 20%" }}>
      {isOpenFormErrorApplication &&
        <CardFormErrorApplication
          form={form}
          onFinish={onFinish}
          errorApplication={errorApplicationStore.errorApplication}
        />
      }
      {isOpenConfirmation &&
        <CardConfirmationErrorApplication
          errorApplication={errorApplicationStore.errorApplication!}
          onClickCreate={onClickConfirm}
          onClickCancel={cancelConfirmation}
          textButton={props.textButton}
        />
      }
    </div>
  )
};


export default ErrorApplicationComponent;