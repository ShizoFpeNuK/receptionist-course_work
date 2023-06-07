import '../../..//style/css/components/ApplicantComponents/cardConfirmationErrorApplication.css';
import { observer } from "mobx-react";
import { IErrorApplication } from "../../../models/types/errorApplication";
import { Button, Card, Space } from "antd";
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm";
import ButtonStep from "../../others/Buttons/ButtonStep";


interface CardConfirmationErrorApplicationProps {
  errorApplication: IErrorApplication,
  onClickCancel: () => void,
  onClickCreate: () => void,
  textButton?: string,
}


const CardConfirmationErrorApplication = observer((props: CardConfirmationErrorApplicationProps) => {
  return (
    <Card
      style={CardForm}
      headStyle={{ fontSize: "20px", fontWeight: 600 }}
      bodyStyle={CardBodyForm}
    >
      <div className="card_confirmation_errorapp">
        <h2 className="card_confirmation_errorapp_header"> Сведения о заявлении об опечатках в паспорте</h2>
        <div className="card_confirmation_errorapp_inner">
          <h3 className="card_confirmation_errorapp_title"> Допущенные шибки </h3>
          <p className="card_confirmation_errorapp_description_of_typos">
            {props.errorApplication.description_of_typos}
          </p>
        </div>
        <div className="card_confirmation_errorapp_inner">
          <h3 className="card_confirmation_errorapp_title"> Метод ответа </h3>
          <p className="card_confirmation_errorapp_response_method">
            {props.errorApplication.response_method}
          </p>
        </div>
      </div>

      <Space.Compact style={{ width: "100%", marginTop: "30px" }}>
        <ButtonStep
          onClick={props.onClickCancel}
          style={{ width: "50%" }}
        >
          Назад
        </ButtonStep>
        <Button
          type="primary"
          onClick={props.onClickCreate}
          style={{ width: "50%" }}
        >
          {props.textButton ?? "Продолжить"}
        </Button>
      </Space.Compact>
    </Card>
  )
});


export default CardConfirmationErrorApplication;