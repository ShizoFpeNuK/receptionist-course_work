import CardNotification from "../others/Cards/CardNotification";
import ErrorApplicationStore from "../../store/applications/ErrorApplicationStore";
import ErrorApplicationComponent from "../ErrorComponents/ErrorApplicationComponent";


interface ErrorApplicationWithNotificationProps {
  errorApplicationStore: ErrorApplicationStore,
  cancelErrorApplication?: () => void,
  sendErrorApplication?: () => void,
  continueErrorApplication?: () => void,
  isOpenNotification: boolean,
}


const ErrorApplicationWithNotification = (props: ErrorApplicationWithNotificationProps) => {
  const ErrorApplication = () => {
    props.errorApplicationStore.setIsApplicantionReady(false);
  }


  return (
    <>
      <ErrorApplicationComponent errorApplicationStore={props.errorApplicationStore} />
      {props.isOpenNotification &&
        <CardNotification
          onCancel={props.cancelErrorApplication ?? ErrorApplication}
          onSend={props.sendErrorApplication}
          onContinue={props.continueErrorApplication}
          bodyText={
            <div style={{ padding: "0 20%" }}>
              <p> Заявление об ошибках в паспорте заполнено. </p>
              <p> При продолжении заполнения заявления к нему можно будет вернуться. </p>
              <p style={{ marginTop: "20px" }}> <b>Продолжить заявление?</b> </p>
            </div>
          }
        />
      }
    </>
  )
};


export default ErrorApplicationWithNotification;