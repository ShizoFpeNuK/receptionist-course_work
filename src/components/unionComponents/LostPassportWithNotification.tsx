import CardNotification from "../others/Cards/CardNotification";
import LostPassportStore from "../../store/applications/LostPassportStore";
import LostPassportComponent from "../LostPassportComponents/LostPassportComponent";


interface LostPassportWithNotificationProps {
  lostPassportStore: LostPassportStore,
  cancelLostPassport?: () => void,
  sendLostPassport?: () => void,
  continueLostPassport?: () => void,
  isOpenNotification: boolean,
}


const LostPassportWithNotification = (props: LostPassportWithNotificationProps) => {
  const cancelLostPassport = () => {
    props.lostPassportStore.setIsApplicantionReady(false);
  }


  return (
    <>
      <LostPassportComponent lostPassportStore={props.lostPassportStore} />
      {props.isOpenNotification &&
        <CardNotification
          onCancel={props.cancelLostPassport ?? cancelLostPassport}
          onSend={props.sendLostPassport}
          onContinue={props.continueLostPassport}
          bodyText={
            <div style={{ padding: "0 20%" }}>
              <p> Заявление утери паспорта заполнено. </p>
              <p> При продолжении заполнения заявления к нему можно будет вернуться. </p>
              <p style={{ marginTop: "20px" }}> <b>Продолжить заявление?</b> </p>
            </div>
          }
        />
      }
    </>
  )
};


export default LostPassportWithNotification;