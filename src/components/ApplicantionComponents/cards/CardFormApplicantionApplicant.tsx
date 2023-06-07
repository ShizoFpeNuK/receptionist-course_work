import { Card } from "antd";
import { ReactNode } from "react";
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm";
import { IApplicantionApplicant } from "../../../models/types/passportApplicantion.model";
import CardFormBaseProps from "../../../models/props/CardFormBaseProps";
import FormApplicantionApplicant from "../forms/FormApplicantionApplicant";


interface CardApplicantApplicantionProps extends CardFormBaseProps {
  buttons?: ReactNode,
  applicant?: IApplicantionApplicant | null,
}


const CardFormApplicantionApplicant = (props: CardApplicantApplicantionProps) => {
  return (
    <Card
      className={props.className}
      title={props.title}
      style={{ ...CardForm, ...props.style }}
      headStyle={{ fontSize: "20px", fontWeight: 600 }}
      bodyStyle={CardBodyForm}
    >
      <FormApplicantionApplicant
        form={props.form}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinishFailed}
        buttons={props.buttons}
        applicant={props.applicant}
      />
      {props.children}
    </Card>
  )
};


export default CardFormApplicantionApplicant;