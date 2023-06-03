import { Card } from "antd";
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm";
import CardFormBaseProps from "../../../models/props/CardFormApplicantProps";
import FormApplicantApplicant from "../forms/FormApplicantApplicant";


interface CardApplicantApplicantProps extends CardFormBaseProps {

}


const CardFormApplicantApplicant = (props: CardApplicantApplicantProps) => {
  return (
    <Card
      className={props.className}
      title={props.title}
      style={{ ...CardForm, ...props.style }}
      headStyle={{ fontSize: "20px", fontWeight: 600 }}
      bodyStyle={CardBodyForm}
    >
      <FormApplicantApplicant
        form={props.form}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinishFailed}
      />
      {props.children}
    </Card>
  )
};


export default CardFormApplicantApplicant;