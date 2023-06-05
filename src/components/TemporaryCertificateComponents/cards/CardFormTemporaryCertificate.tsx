import { Card } from "antd";
import { ReactNode } from "react";
import { ITemporaryCertificate } from "../../../models/types/temporaryCertificate.model";
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm";
import CardFormBaseProps from "../../../models/props/CardFormBaseProps";
import FormTemporaryCertificate from "../forms/FormTemporaryСertificate";


interface CardFormTemporaryCertificate extends CardFormBaseProps {
  buttons?: ReactNode,
  temporaryCertificate?: ITemporaryCertificate | null,
}


const CardFormTemporaryCertificate = (props: CardFormTemporaryCertificate) => {
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
        buttons={props.buttons}
        temporaryCertificate={props.temporaryCertificate}
      />
      {props.children}
    </Card>
  )
};


export default CardFormTemporaryCertificate;