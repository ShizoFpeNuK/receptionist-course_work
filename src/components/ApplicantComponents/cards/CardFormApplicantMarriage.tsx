import { Card } from "antd";
import { ReactNode } from "react";
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm";
import CardFormBaseProps from "../../../models/props/CardFormApplicantProps";
import FormApplicantMarriage from "../forms/FormApplicantMarriage";


interface CardFormApplicantMarriageProps extends CardFormBaseProps {
  codeFamilyStatus: number | undefined,
  buttons?: ReactNode,
}


const CardFormApplicantMarriage = (props: CardFormApplicantMarriageProps) => {
  return (
    <Card
      className={props.className}
      title={props.title}
      style={{ ...CardForm, ...props.style }}
      headStyle={{ fontSize: "20px", fontWeight: 600 }}
      bodyStyle={CardBodyForm}
    >
      <FormApplicantMarriage
        form={props.form}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinishFailed}
        codeFamilyStatus={props.codeFamilyStatus}
        buttons={props.buttons}
      />
      {props.children}
    </Card>
  )
};


export default CardFormApplicantMarriage;