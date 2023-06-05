import { Card } from "antd";
import { ReactNode } from "react";
import { ILostPassport } from "../../../models/types/lostPassport.model";
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm";
import FormLostPassport from "../forms/FormLostPassportApplication";
import CardFormBaseProps from "../../../models/props/CardFormBaseProps";


interface CardFormLostPassportProps extends CardFormBaseProps {
  buttons?: ReactNode,
  lostPassport?: ILostPassport | null,
}


const CardFormLostPassport = (props: CardFormLostPassportProps) => {
  return (
    <Card
      className={props.className}
      title={props.title ?? "Заявление об утрате паспорта"}
      style={{ ...CardForm, ...props.style }}
      headStyle={{ fontSize: "20px", fontWeight: 600 }}
      bodyStyle={CardBodyForm}
    >
      <FormLostPassport
        form={props.form}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinishFailed}
        buttons={props.buttons}
        lostPassport={props.lostPassport}
      />
      {props.children}
    </Card>
  )
};


export default CardFormLostPassport;