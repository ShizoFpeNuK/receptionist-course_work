import { Card } from "antd";
import { ReactNode } from "react";
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm";
import { IApplicantionPassportApplication } from "../../../models/types/applicantion.model";
import CardFormBaseProps from "../../../models/props/CardFormBaseProps";
import FormApplicantionPassportApplicantion from "../forms/FormApplicantionPassportApplication";


interface CardFormApplicantionPassportApplicantionProps extends CardFormBaseProps {
  buttons?: ReactNode,
  passportApplication?: IApplicantionPassportApplication | null,
}


const CardFormApplicantionPassportApplicantion = (props: CardFormApplicantionPassportApplicantionProps) => {
  return (
    <Card
      className={props.className}
      title={props.title}
      style={{ ...CardForm, ...props.style }}
      headStyle={{ fontSize: "20px", fontWeight: 600 }}
      bodyStyle={CardBodyForm}
    >
      <FormApplicantionPassportApplicantion
        form={props.form}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinishFailed}
        buttons={props.buttons}
        passportApplication={props.passportApplication}
      />
      {props.children}
    </Card>
  )
};


export default CardFormApplicantionPassportApplicantion;