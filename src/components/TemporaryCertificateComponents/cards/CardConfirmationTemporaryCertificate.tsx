import { Button, Card, Space } from "antd";
import { ITemporaryCertificate } from "../../../models/types/temporaryCertificate.model";
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm";
import ButtonStep from "../../others/Buttons/ButtonStep";



interface CardConfirmationApplicationProps {
  textButton?: string,
  temporaryCertificate: ITemporaryCertificate,
  onClickCancel: () => void,
  onClickCreate: () => void,
}


const CardConfirmationTemporaryCertificate = (props: CardConfirmationApplicationProps) => {
  return (
    <Card
      style={CardForm}
      headStyle={{ fontSize: "20px", fontWeight: 600 }}
      bodyStyle={CardBodyForm}
    >
      <div className="card_confirmation_temporary_certificate">
        <h2 className="card_confirmation_temporary_certificate_header card_confirmation_header">
          Сведения о временном удостоверении
        </h2>
        <div className="card_confirmation_temporary_certificate_inner card_confirmation_inner">
          <h3 className="card_confirmation_temporary_certificate_title"> Причина выдачи </h3>
          <Space direction="horizontal" style={{ width: "100%" }}>
            <p className="card_confirmation_temporary_certificate_series">
              {props.temporaryCertificate.document.series}
            </p>
            <p className="card_confirmation_temporary_certificate_id">
              {props.temporaryCertificate.document.id}
            </p>
          </Space>
        </div>
        <div className="card_confirmation_temporary_certificate_inner card_confirmation_inner">
          <h3 className="card_confirmation_temporary_certificate_title"> Причина выдачи </h3>
          <p className="card_confirmation_temporary_certificate_reason">
            {props.temporaryCertificate.reason}
          </p>
        </div>
        <div className="card_confirmation_temporary_certificate_inner card_confirmation_inner">
          <h3 className="card_confirmation_temporary_certificate_title"> Действителен до </h3>
          <p className="card_confirmation_temporary_certificate_valid_until">
            {new Date(props.temporaryCertificate.valid_until!.toString()).toLocaleDateString()}
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
};


export default CardConfirmationTemporaryCertificate;