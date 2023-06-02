import { Card } from "antd";
import { ReactNode } from "react";
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm";
import FormNewPassport from "../forms/FormNewPassport";
import CardFormBaseProps from "../../../models/props/CardFormApplicantProps";


interface CardFormNewPassportProps extends CardFormBaseProps {
  buttons?: ReactNode,
}


const CardFormNewPassport = (props: CardFormNewPassportProps) => {
  return (
    <Card
      className={props.className}
      title={props.title}
      style={{ ...CardForm, ...props.style }}
      headStyle={{ fontSize: "20px", fontWeight: 600 }}
      bodyStyle={CardBodyForm}
    >
      <FormNewPassport
        form={props.form}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinishFailed}
      />
      {props.children}
    </Card>
  )
}


export default CardFormNewPassport;