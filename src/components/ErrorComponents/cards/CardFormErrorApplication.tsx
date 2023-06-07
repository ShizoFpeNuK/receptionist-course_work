import { Card } from "antd";
import { ReactNode } from "react";
import { IErrorApplication } from "../../../models/types/errorApplication";
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm";
import CardFormBaseProps from "../../../models/props/CardFormBaseProps";
import FormErrorApplication from "../forms/FormErrorApplication";


interface CardFormErrorApplicationProps extends CardFormBaseProps {
  buttons?: ReactNode,
  errorApplication?: IErrorApplication | null,
}


const CardFormErrorApplication = (props: CardFormErrorApplicationProps) => {
  return (
    <Card
      className={props.className}
      title={props.title ?? "Заявление об опечатках (ошибках) в паспорте"}
      style={{ ...CardForm, ...props.style }}
      headStyle={{ fontSize: "20px", fontWeight: 600 }}
      bodyStyle={CardBodyForm}
    >
      <FormErrorApplication
        form={props.form}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinishFailed}
        buttons={props.buttons}
        errorApplication={props.errorApplication}
      />
      {props.children}
    </Card>
  )
};


export default CardFormErrorApplication;