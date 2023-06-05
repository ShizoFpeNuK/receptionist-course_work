import { ReactNode } from "react";
import { Button, Card, Space } from "antd"
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm"
import ButtonStep from "../Buttons/ButtonStep";
import CardBaseProps from "../../../models/props/CardBase";


interface CardNotificationProps extends CardBaseProps {
  onCancel: () => void,
  onSend?: () => void,
  onContinue?: () => void,
  bodyText: ReactNode | string,
}


const CardNotification = (props: CardNotificationProps) => {
  let countButtons: number = 3;

  
  if (props.onContinue && props.onSend) {
    countButtons = 3;
  } else if (props.onContinue || props.onSend) {
    countButtons = 2;
  } else {
    countButtons = 1;
  }


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
            style={{ width: `calc(100%/${countButtons})` }}
          >
            Назад
          </ButtonStep>
          {props.onSend &&
            <Button
              type="primary"
              onClick={props.onSend}
              style={{ width: `calc(100%/${countButtons})` }}
            >
              Отправить
            </Button>
          }
          {props.onContinue &&
            <Button
              type="primary"
              onClick={props.onContinue}
              style={{ width: `calc(100%/${countButtons})` }}
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