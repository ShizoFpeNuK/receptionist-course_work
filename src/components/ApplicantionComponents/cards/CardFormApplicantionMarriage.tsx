import { Card } from "antd";
import { ReactNode } from "react";
import { IApplicantionMarriage } from "../../../models/types/applicantion.model";
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm";
import CardFormBaseProps from "../../../models/props/CardFormBaseProps";
import FormApplicantionMarriage from "../forms/FormApplicantionMarriage";


interface CardFormApplicantionMarriageProps extends CardFormBaseProps {
  codeFamilyStatus: number | undefined,
  buttons?: ReactNode,
  mirrage?: IApplicantionMarriage | null,
}


const CardFormApplicantionMarriage = (props: CardFormApplicantionMarriageProps) => {
  return (
    <Card
      className={props.className}
      title={props.title}
      style={{ ...CardForm, ...props.style }}
      headStyle={{ fontSize: "20px", fontWeight: 600 }}
      bodyStyle={CardBodyForm}
    >
      <FormApplicantionMarriage
        form={props.form}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinishFailed}
        codeFamilyStatus={props.codeFamilyStatus}
        buttons={props.buttons}
        mirrage={props.mirrage}
      />
      {props.children}
    </Card>
  )
};


export default CardFormApplicantionMarriage;