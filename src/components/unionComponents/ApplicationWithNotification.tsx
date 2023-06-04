import { observer } from "mobx-react";
import CardNotification from "../others/Cards/CardNotification";
import ApplicantionStore from "../../store/applications/ApplicantStore";
import ApplicantionComponent from "../ApplicantionComponents/ApplicantionComponent";


interface ApplicationWithNotificationProps {
  applicantionStore: ApplicantionStore,
  cancelPassportApplication?: () => void,
  sendPassportApplication: () => void,
  continuePassportApplication?: () => void,
}


const ApplicationWithNotification = observer((props: ApplicationWithNotificationProps) => {
  const cancelPassportApplication = () => {
    props.applicantionStore.setIsApplicantionSend(false);
  }


  return (
    <>
      <ApplicantionComponent applicantionStore={props.applicantionStore} />
      {props.applicantionStore.isApplicantionSend &&
        <CardNotification
          onCancel={props.cancelPassportApplication ?? cancelPassportApplication}
          onSend={props.sendPassportApplication}
          onContinue={props.continuePassportApplication}
          buttonContinue={true}
          bodyText={
            <div style={{ padding: "0 20%" }}>
              <p> Заявление о выдаче/замене паспорта заполнено. </p>
              <p> Однако к нему не прикреплёно временное удостоверение. </p>
              <p> При продолжении заполнения заявления к нему нельзя будет вернуться,
                даже если были допущены ошибки. Убедитесь, что всё правильно заполнено! </p>
              <p style={{ marginTop: "20px" }}> <b>Отправить заявление или продолжить заполнение?</b> </p>
            </div>
          }
        />
      }
    </>
  )
});


export default ApplicationWithNotification;