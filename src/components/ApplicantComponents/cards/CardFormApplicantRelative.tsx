import { Card } from "antd";
import { ReactNode } from "react";
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm";
import FormApplicantRelative from "../forms/FormApplicantRelative";
import CardFormApplicantProps from "../../../models/props/CardFormApplicantProps";


interface CardFormApplicantRelativeProps extends CardFormApplicantProps {
  buttons?: ReactNode,
}


const CardFormApplicantRelative = (props: CardFormApplicantRelativeProps) => {
  return (
    <Card
      className={props.className}
      title={props.title}
      style={{ ...CardForm, ...props.style }}
      bodyStyle={CardBodyForm}
    >
      <FormApplicantRelative
        form={props.form}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinishFailed}
        buttons={props.buttons}
      />
      {props.children}
    </Card>
  )
}


export default CardFormApplicantRelative;