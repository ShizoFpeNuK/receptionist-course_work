import { Card } from "antd";
import { ReactNode } from "react";
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm";
import FormLostPassport from "../forms/FormLostPassportApplication";
import CardFormApplicantProps from "../../../models/props/CardFormApplicantProps";


interface CardFormLostPassportProps extends CardFormApplicantProps {
  buttons?: ReactNode,
}


const CardFormLostPassport = (props: CardFormLostPassportProps) => {
  return (
    <Card
      className={props.className}
      title={props.title ?? "Заявление об утрате паспорта"}
      style={{ ...CardForm, ...props.style }}
      headStyle={{ fontSize: "20px", fontWeight: 600 }}
      bodyStyle={CardBodyForm}
    >
      <FormLostPassport
        form={props.form}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinishFailed}
        buttons={props.buttons}
      />
      {props.children}
    </Card>
  )
}


export default CardFormLostPassport;