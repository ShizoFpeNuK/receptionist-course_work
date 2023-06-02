import { Card } from "antd";
import { ReactNode } from "react";
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm";
import CardFormBaseProps from "../../../models/props/CardFormApplicantProps";
import FormApplicantRelative from "../forms/FormApplicantRelative";


interface CardFormApplicantRelativeProps extends CardFormBaseProps {
  buttons?: ReactNode,
}


const CardFormApplicantRelative = (props: CardFormApplicantRelativeProps) => {
  return (
    <Card
      className={props.className}
      title={props.title}
      style={{ ...CardForm, ...props.style }}
      headStyle={{ fontSize: "20px", fontWeight: 600 }}
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