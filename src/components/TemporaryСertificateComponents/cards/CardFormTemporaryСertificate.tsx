import { Card } from "antd";
import { ReactNode } from "react";
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm";
import CardFormApplicantProps from "../../../models/props/CardFormApplicantProps";
import FormTemporaryCertificate from "../forms/FormTemporaryСertificate";


interface CardFormTemporaryCertificateProps extends CardFormApplicantProps {
  buttons?: ReactNode,
}


const CardFormTemporaryCertificate = (props: CardFormTemporaryCertificateProps) => {
  return (
    <Card
      className={props.className}
      title={props.title}
      style={{ ...CardForm, ...props.style }}
      headStyle={{ fontSize: "20px", fontWeight: 600 }}
      bodyStyle={CardBodyForm}
    >
      <FormTemporaryCertificate
        form={props.form}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinishFailed}
      // buttons={props.buttons}
      />
      {props.children}
    </Card>
  )
}


export default CardFormTemporaryCertificate;