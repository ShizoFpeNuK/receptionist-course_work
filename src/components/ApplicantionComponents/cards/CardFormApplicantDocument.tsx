import { Card } from "antd";
import { ReactNode } from "react";
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm";
import CardFormBaseProps from "../../../models/props/CardFormBaseProps";
import FormApplicantDocument from "../forms/FormApplicantDocument";


interface CardFormApplicantDocumentProps extends CardFormBaseProps {
  buttons?: ReactNode,
}


const CardFormApplicantDocument = (props: CardFormApplicantDocumentProps) => {
  return (
    <Card
      className={props.className}
      title={props.title}
      style={{ ...CardForm, ...props.style }}
      headStyle={{ fontSize: "20px", fontWeight: 600 }}
      bodyStyle={CardBodyForm}
    >
      <FormApplicantDocument
        form={props.form}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinishFailed}
        buttons={props.buttons}
      />
      {props.children}
    </Card>
  )
};


export default CardFormApplicantDocument;