import { ReactNode } from "react";
import CardNotification from "../others/Cards/CardNotification";
import TemporaryCertificateStore from "../../store/applications/TemporaryCertificateStore";
import TemporaryCertificateComponent from "../TemporaryCertificateComponents/TemporaryCertificateComponent";


interface TemporaryCertificateWithNotificationProps {
  temporaryCertificateStore: TemporaryCertificateStore,
  cancelTemporaryCertificate?: () => void,
  sendTemporaryCertificate: () => void,
  continueTemporaryCertificate?: () => void,
  buttonCancel?: ReactNode,
  isOpenNotification: boolean,
}


const TemporaryCertificateWithNotification = (props: TemporaryCertificateWithNotificationProps) => {
  const cancelPassportApplication = () => {
    props.temporaryCertificateStore.setIsApplicantionReady(false);
  }


  return (
    <>
      <TemporaryCertificateComponent
        temporaryCertificateStore={props.temporaryCertificateStore}
        buttonCancel={props.buttonCancel}
      />
      {props.isOpenNotification &&
        <CardNotification
          onCancel={props.cancelTemporaryCertificate ?? cancelPassportApplication}
          onSend={props.sendTemporaryCertificate}
          onContinue={props.continueTemporaryCertificate}
          bodyText={
            <div style={{ padding: "0 20%" }}>
              <p> Временное удостоверение личности заполнено. </p>
              <p> При продолжении заполнения заявления к нему уже нельзя будет вернуться. </p>
              <p style={{ marginTop: "20px" }}> <b>Отправить заявление?</b> </p>
            </div>
          }
        />
      }
    </>
  )
};


export default TemporaryCertificateWithNotification;