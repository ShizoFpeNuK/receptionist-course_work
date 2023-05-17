import { Card, FormInstance } from "antd";
import { CSSProperties } from "react";
import { CardBodyForm, CardForm } from "../../style/typescript/cardForm";
import FormApplicant from "../forms/FormApplicant";


interface CardApplicantProps {
  title?: string,
  style?: CSSProperties | undefined,
  form: FormInstance<any>,
  onFinish: (values: any) => void,
  onFinishFailed?: (values: any) => void,
}


const CardFormApplicant = (props: CardApplicantProps) => {
  return (
    <Card
      className="card_applicant"
      title={props.title}
      style={{ ...props.style, ...CardForm }}
      bodyStyle={CardBodyForm}
    >
      <FormApplicant
        form={props.form}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinishFailed}
      />
    </Card>
  )
}


export default CardFormApplicant;