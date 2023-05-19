import { Card } from "antd";
import { ReactNode } from "react";
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm";
import CardFormApplicantProps from "../../../models/props/CardFormApplicantProps";
import FormLostPassportApplication from "../forms/FormLostPassportApplication";


interface CardFormLostPassportApplicationProps extends CardFormApplicantProps {
  buttons?: ReactNode,
}


const CardFormLostPassportApplication = (props: CardFormLostPassportApplicationProps) => {
  return (
    <Card
      className={props.className}
      title={props.title}
      style={{ ...CardForm, ...props.style }}
      headStyle={{ fontSize: "20px", fontWeight: 600 }}
      bodyStyle={CardBodyForm}
    >
      <FormLostPassportApplication
        form={props.form}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinishFailed}
      />
      {props.children}
    </Card>
  )
}


export default CardFormLostPassportApplication;