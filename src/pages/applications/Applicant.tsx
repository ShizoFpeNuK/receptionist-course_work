import { message } from "antd";
import { observer } from "mobx-react";
import { clearTimer } from "../../options/clearTimer";
import { useEffect, useState } from "react";
import { errorMessage, successMessage } from "../../configs/messageAntd.config";
import ApplicantionStore from "../../store/applications/ApplicantStore";
import DialogTimerReturn from "../../components/others/Dialogs/DialogTimerReturn";
import ApplicationsServices from "../../services/applications.service";
import TemporaryCertificateStore from "../../store/applications/TemporaryCertificateStore";
import ApplicationWithNotification from "../../components/unionComponents/ApplicationWithNotification";
import TemporaryCertificateWithNotification from "../../components/unionComponents/TemporaryCertificateWithNotification";


const secondsDefault: number = 5;
const applicantionStore = new ApplicantionStore();
const temporaryCertificateStore = new TemporaryCertificateStore();


const Applicant = observer(() => {
  const [messageApi, contextHolder] = message.useMessage();
  const [isOpenApplication, setIsOpenApplication] = useState<boolean>(true);
  const [isOpenTemporaryCertificate, setIsOpenTemporaryCertificate] = useState<boolean>(false);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(secondsDefault);


  const clearComponent = () => {
    applicantionStore.clearStore();
    temporaryCertificateStore.clearStore();
    setSeconds(secondsDefault)
    setIsOpenApplication(true);
    setIsOpenTemporaryCertificate(false);
    setIsOpenDialog(false);
  }


  /* Для заявления выдачи/замены паспорта */
  const sendPassportApplication = async () => {
    await ApplicationsServices.createPassportApplication(
      applicantionStore.getApplicationCreate(),
      null
    ).then(() => {
      successMessage(messageApi, "Заявление успешно занесено!");
      applicantionStore.setIsApplicantionSend(false);
      setIsOpenApplication(false);
      setIsOpenDialog(true);
    }).catch((err) => {
      errorMessage(messageApi);
    })
  }

  const continuePassportApplication = () => {
    applicantionStore.setIsApplicantionSend(false);
    setIsOpenApplication(false);
    setIsOpenTemporaryCertificate(true);
  }


  /* Для временного удостоверения */
  const sendTemporaryCertificate = async () => {
    await ApplicationsServices.createPassportApplication(
      applicantionStore.getApplicationCreate(),
      temporaryCertificateStore.temporaryCertificate
    ).then(() => {
      successMessage(messageApi, "Заявление успешно занесено!");
      temporaryCertificateStore.setIsApplicantionSend(false);
      setIsOpenTemporaryCertificate(false);
      setIsOpenDialog(true);
    }).catch((err) => {
      errorMessage(messageApi);
    })
  }


  useEffect(() => {
    return () => {
      applicantionStore.clearStore();
      temporaryCertificateStore.clearStore();
    }
  }, [])

  /* Очистка */
  useEffect(() => {
    clearTimer(isOpenDialog, seconds, setSeconds, clearComponent);
  }, [seconds, isOpenDialog]);


  return (
    <div className="applicant">
      {contextHolder}
      <h1
        className="applicant_header title--border"
        style={{ marginBottom: "40px" }}
      >
        Заявление о выдаче/замене паспорта
      </h1>
      {isOpenApplication &&
        <ApplicationWithNotification
          applicantionStore={applicantionStore}
          sendPassportApplication={sendPassportApplication}
          continuePassportApplication={continuePassportApplication}
        />
      }
      {isOpenTemporaryCertificate &&
        <TemporaryCertificateWithNotification
          temporaryCertificateStore={temporaryCertificateStore}
          sendTemporaryCertificate={sendTemporaryCertificate}
        />
      }
      {isOpenDialog &&
        <DialogTimerReturn seconds={seconds} />
      }
    </div>
  )
});


export default Applicant;