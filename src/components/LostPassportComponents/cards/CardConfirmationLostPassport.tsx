import '../../..//style/css/components/ApplicantComponents/cardConfirmationLostPassport.css';
import { observer } from "mobx-react";
import { ILostPassport } from "../../../models/types/lostPassport.model";
import { Button, Card, Space } from "antd";
import { CardBodyForm, CardForm } from "../../../style/typescript/cardForm";
import ButtonStep from "../../others/Buttons/ButtonStep";


interface CardConfirmationLostPassportProps {
  lostPassport: ILostPassport,
  onClickCancel: () => void,
  onClickCreate: () => void,
  textButton?: string,
}


const CardConfirmationLostPassport = observer((props: CardConfirmationLostPassportProps) => {
  return (
    <Card
      style={CardForm}
      headStyle={{ fontSize: "20px", fontWeight: 600 }}
      bodyStyle={CardBodyForm}
    >
      <div className="card_confirmation_lostpassport">
        <h2 className="card_confirmation_lostpassport_header"> Сведения об утере паспорта</h2>
        <div className="card_confirmation_lostPassport_inner card_confirmation_inner">
          <h3 className="card_confirmation_lostPassport_title"> Серия и номер паспорта </h3>
          <Space direction="horizontal" style={{ width: "100%" }}>
            <p className="card_confirmation_lostPassport_document_series">
              {props.lostPassport.document.series ?? "Отсутсвует"}
            </p>
            <p className="card_confirmation_lostPassport_document_id">
              {props.lostPassport.document.id ?? "Отсутсвует"}
            </p>
          </Space>
        </div>
        <div className="card_confirmation_lostPassport_inner card_confirmation_inner">
          <h3 className="card_confirmation_lostPassport_title"> Дата выдачи документа </h3>
          <p className="card_confirmation_lostPassport_date_of_issue">
            {props.lostPassport.date_of_issue
              ? new Date(props.lostPassport.date_of_issue.toString()).toLocaleDateString()
              : "Отсутсвует"
            }
          </p>
        </div>
        <div className="card_confirmation_lostPassport_inner card_confirmation_inner">
          <h3 className="card_confirmation_lostPassport_title"> Кем выдан документ </h3>
          <p className="card_confirmation_lostPassport_issued_by">
            {props.lostPassport.issued_by ?? "Отсутсвует"}
          </p>
        </div>
        <div className="card_confirmation_lostpassport_inner">
          <h3 className="card_confirmation_lostpassport_title"> Дата потери </h3>
          <p className="card_confirmation_lostpassport_date_of_loss">
            {new Date(props.lostPassport.date_of_loss.toString()).toLocaleDateString()}
          </p>
        </div>
        <div className="card_confirmation_lostpassport_inner">
          <h3 className="card_confirmation_lostpassport_title"> Место утери </h3>
          <p className="card_confirmation_lostpassport_place_of_loss">
            {props.lostPassport.place_of_loss}
          </p>
        </div>
        <div className="card_confirmation_lostpassport_inner">
          <h3 className="card_confirmation_lostpassport_title"> Обстоятельства утери </h3>
          <p className="card_confirmation_lostpassport_circumstances_of_loss">
            {props.lostPassport.circumstances_of_loss}
          </p>
        </div>
        <div className="card_confirmation_lostpassport_inner">
          <h3 className="card_confirmation_lostpassport_title">
            Дата обращения по факту похищения
          </h3>
          <p className="card_confirmation_lostpassport_date_of_kidnapping">
            {props.lostPassport.date_of_kidnapping
              ? new Date(props.lostPassport.date_of_kidnapping.toString()).toLocaleDateString()
              : "Отсутсвует"
            }
          </p>
        </div>
        <div className="card_confirmation_lostpassport_inner">
          <h3 className="card_confirmation_lostpassport_title"> Метод ответа </h3>
          <p className="card_confirmation_lostpassport_place_of_residence">
            {props.lostPassport.response_method}
          </p>
        </div>
        <div className="card_confirmation_lostpassport_inner">
          <h3 className="card_confirmation_lostpassport_title">
            Наименование организации по факту похищения
          </h3>
          <p className="card_confirmation_lostpassport_name_of_organization_on_FOA">
            {props.lostPassport.name_of_organization_on_FOA ?? "Отсутствует"}
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


export default CardConfirmationLostPassport;