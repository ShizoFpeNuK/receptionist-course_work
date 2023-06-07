import { ReactNode } from "react";
import CardNotification from "../others/Cards/CardNotification";
import ApplicantionStore from "../../store/applications/ApplicantionStore";
import ApplicantionComponent from "../ApplicantionComponents/ApplicantionComponent";


interface ApplicationWithNotificationProps {
  applicantionStore: ApplicantionStore,
  cancelPassportApplication?: () => void,
  sendPassportApplication: () => void,
  continuePassportApplication?: () => void,
  isOpenNotification: boolean,
  buttonCancel?: ReactNode,
  isLostPassport?: boolean,
}


const ApplicationWithNotification = (props: ApplicationWithNotificationProps) => {
  const cancelPassportApplication = () => {
    props.applicantionStore.setIsApplicantionReady(false);
  }


  return (
    <>
      <ApplicantionComponent
        isLostPassport={props.isLostPassport}
        applicantionStore={props.applicantionStore}
        buttonCancel={props.buttonCancel}
      />
      {props.isOpenNotification &&
        <CardNotification
          onCancel={props.cancelPassportApplication ?? cancelPassportApplication}
          onSend={props.sendPassportApplication}
          onContinue={props.continuePassportApplication}
          bodyText={
            <div style={{ padding: "0 20%" }}>
              <p> Заявление выдачи/замены паспорта заполнено. </p>
              <p> Однако к нему не прикреплёно временное удостоверение. </p>
              <p> При продолжении заполнения заявления к нему можно будет вернуться. </p>
              <p style={{ marginTop: "20px" }}> <b>Отправить заявление или продолжить заполнение?</b> </p>
            </div>
          }
        />
      }
    </>
  )
};


export default ApplicationWithNotification;