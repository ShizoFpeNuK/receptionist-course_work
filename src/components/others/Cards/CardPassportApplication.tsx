import '../../../style/css/components/others/cardPassportApplication.css';
import { Button, Card, Space } from "antd"
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm"
import { IPassportApplicationInfo } from "../../../models/types/applications.model";
import CardBaseProps from "../../../models/props/CardBase";


interface CardPassportApplicationProps extends CardBaseProps {
  passportApplication: IPassportApplicationInfo,
  onSeeInfo: () => void,
  onOk?: () => void,
  onReject?: () => void,
  onlySeeInfo?: boolean,
  disabledOk?: boolean,
}


const CardPassportApplication = (props: CardPassportApplicationProps) => {
  return (
    <Card
      className="card_passport_application"
      style={{ ...CardForm, width: "300px" }}
      bodyStyle={{ ...CardBodyForm, textAlign: "left" }}
    >
      <div className="card_passport_application_info">
        <div className="card_passport_application_inner">
          <h3> Регистрационный номер </h3>
          <p> {props.passportApplication.register_id} </p>
        </div>
        <div className="card_passport_application_inner">
          <h3> Принятое решение </h3>
          <p> {props.passportApplication.accepted_decision} </p>
        </div>
        <div className="card_passport_application_inner">
          <h3> Результаты проверок </h3>
          <p> {props.passportApplication.test_result ?? "Отсутствует"} </p>
        </div>
        <div className="card_passport_application_inner">
          <h3> Удостоверение личности </h3>
          <p>
            {props.passportApplication.is_identity_document
              ? "Имеется"
              : "Отсутствует"
            }
          </p>
        </div>
      </div>
      <Space
        direction="vertical"
        style={{ width: "100%" }}
      >
        <Button block onClick={props.onSeeInfo}> Полная информация </Button>
        {!props.onlySeeInfo &&
          <>
            <Button
              block
              disabled={!props.disabledOk}
              onClick={props.onOk}
            >
              Одобрить
            </Button>
            <Button block onClick={props.onReject}> Отклонить </Button>
          </>
        }
      </Space>
    </Card>
  )
};


export default CardPassportApplication;