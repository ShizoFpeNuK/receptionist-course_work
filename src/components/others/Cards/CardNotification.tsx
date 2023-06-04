import { ReactNode } from "react";
import { Button, Card, Space } from "antd"
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm"
import ButtonStep from "../Buttons/ButtonStep";
import CardBaseProps from "../../../models/props/CardBase";


interface CardNotificationProps extends CardBaseProps {
  onCancel: () => void,
  onSend: () => void,
  onContinue?: () => void,
  buttonContinue?: boolean,
  bodyText: ReactNode | string,
}


const CardNotification = (props: CardNotificationProps) => {
  return (
    <div style={{ padding: "0 20%" }}>
      <Card
        style={CardForm}
        bodyStyle={{ ...CardBodyForm, textAlign: "center" }}
      >
        {props.bodyText}
        <Space.Compact style={{ width: "100%", marginTop: "30px" }}>
          <ButtonStep
            onClick={props.onCancel}
            style={props.buttonContinue ? { width: "33.333%" } : { width: "50%" }}
          >
            Назад
          </ButtonStep>
          <Button
            type="primary"
            onClick={props.onSend}
            style={props.buttonContinue ? { width: "33.333%" } : { width: "50%" }}
          >
            Отправить
          </Button>
          {props.buttonContinue &&
            <Button
              type="primary"
              onClick={props.onContinue}
              style={{ width: "33.333%" }}
            >
              Продолжить
            </Button>
          }
        </Space.Compact>
      </Card>
    </div>
  )
};


export default CardNotification;