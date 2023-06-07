import '../../../style/css/components/others/cardUncompletedPassportApp.css';
import { Button, Card } from "antd"
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm"
import { IUncompletedPassportApp } from "../../../models/types/uncompletedPassportApplication";
import CardBaseProps from "../../../models/props/CardBase";


interface CardUncompletedPassportAppProps extends CardBaseProps {
  passportApplication: IUncompletedPassportApp,
  onComplete?: () => void,
  onlySeeInfo?: boolean,
}


const CardUncompletedPassportApp = (props: CardUncompletedPassportAppProps) => {
  return (
    <Card
      className="card_uncompleted_passport_app"
      style={{ ...CardForm, width: "300px" }}
      bodyStyle={{ ...CardBodyForm, textAlign: "left" }}
    >
      <div className="card_uncompleted_passport_app_info">
        <div className="card_uncompleted_passport_app_inner">
          <h3> № заявления утери </h3>
          <p> {props.passportApplication.lost_passport_application_id} </p>
        </div>
        <div className="card_uncompleted_passport_app_inner">
          <h3> Метод ответа заявителю </h3>
          <p> {props.passportApplication.response_method} </p>
        </div>
      </div>
      <Button block onClick={props.onComplete}> Дополнить </Button>
    </Card>
  )
};


export default CardUncompletedPassportApp;