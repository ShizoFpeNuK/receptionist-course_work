import { observer } from "mobx-react";
import CardNotification from "../others/Cards/CardNotification";
import TemporaryCertificateStore from "../../store/applications/TemporaryCertificateStore";
import TemporaryCertificateComponent from "../TemporaryCertificateComponents/TemporaryCertificateComponent";


interface TemporaryCertificateWithNotificationProps {
  temporaryCertificateStore: TemporaryCertificateStore,
  cancelTemporaryCertificate?: () => void,
  sendTemporaryCertificate: () => void,
  continueTemporaryCertificate?: () => void,
}


const TemporaryCertificateWithNotification = observer((props: TemporaryCertificateWithNotificationProps) => {
  const cancelPassportApplication = () => {
    props.temporaryCertificateStore.setIsApplicantionSend(false);
  }


  return (
    <>
      <TemporaryCertificateComponent
        temporaryCertificateStore={props.temporaryCertificateStore}
      />
      {props.temporaryCertificateStore.isApplicantionSend &&
        <CardNotification
          onCancel={props.cancelTemporaryCertificate ?? cancelPassportApplication}
          onSend={props.sendTemporaryCertificate}
          onContinue={props.continueTemporaryCertificate}
          bodyText={
            <div style={{ padding: "0 20%" }}>
              <p> Временное удостоверение личности заполнено. </p>
              <p style={{ marginTop: "20px" }}> <b>Отправить заявление?</b> </p>
            </div>
          }
        />
      }
    </>
  )
});


export default TemporaryCertificateWithNotification;