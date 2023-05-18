import { Card } from "antd";
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm";
import CardFormApplicantProps from "../../../models/props/CardFormApplicantProps";
import FormApplicantGeneralInfo from "../forms/FormApplicantGeneralInfo";


interface CardApplicantGeneralInfoProps extends CardFormApplicantProps {

}


const CardFormApplicantGeneralInfo = (props: CardApplicantGeneralInfoProps) => {
  return (
    <Card
      className={props.className}
      title={props.title}
      style={{ ...CardForm, ...props.style }}
      bodyStyle={CardBodyForm}
    >
      <FormApplicantGeneralInfo
        form={props.form}
        onFinish={props.onFinish}
        onFinishFailed={props.onFinishFailed}
      />
      {props.children}
    </Card>
  )
}


export default CardFormApplicantGeneralInfo;