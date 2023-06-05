import { Card } from "antd";
import { ReactNode } from "react";
import { IApplicantionDocument } from "../../../models/types/applicantion.model";
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm";
import CardFormBaseProps from "../../../models/props/CardFormBaseProps";
import FormApplicantionDocument from "../forms/FormApplicantionDocument";


interface CardFormApplicantionDocumentProps extends CardFormBaseProps {
  buttons?: ReactNode,
  document?: IApplicantionDocument | null,
}


const CardFormApplicantionDocument = (props: CardFormApplicantionDocumentProps) => {
  return (
    <Card
      className={props.className}
      title={props.title}
      style={{ ...CardForm, ...props.style }}
      headStyle={{ fontSize: "20px", fontWeight: 600 }}
      bodyStyle={CardBodyForm}
    >
      <FormApplicantionDocument
        form={props.form}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinishFailed}
        buttons={props.buttons}
        document={props.document}
      />
      {props.children}
    </Card>
  )
};


export default CardFormApplicantionDocument;