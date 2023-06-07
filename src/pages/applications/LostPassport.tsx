import { message } from "antd";
import { observer } from "mobx-react";
import { clearTimer } from "../../options/clearTimer";
import { useEffect, useState } from "react";
import { errorMessage, messageConfig, successMessage } from "../../configs/messageAntd.config";
import {
  applicantStartValues,
  lostPassportStartValues,
  temporaryCertificateStartValues
} from "../../startValues/applicantion";
import ButtonStep from "../../components/others/Buttons/ButtonStep";
import ApplicantionStore from "../../store/applications/ApplicantionStore";
import DialogTimerReturn from "../../components/others/Dialogs/DialogTimerReturn";
import LostPassportStore from "../../store/applications/LostPassportStore";
import ApplicationsServices from "../../services/applications.service";
import TemporaryCertificateStore from "../../store/applications/TemporaryCertificateStore";
import ApplicationWithNotification from "../../components/unionComponents/ApplicationWithNotification";
import LostPassportWithNotification from "../../components/unionComponents/LostPassportWithNotification";
import TemporaryCertificateWithNotification from "../../components/unionComponents/TemporaryCertificateWithNotification";


const secondsDefault: number = 5;
const lostPassportStore = new LostPassportStore();
const applicantionStore = new ApplicantionStore();
const temporaryCertificateStore = new TemporaryCertificateStore();

//Потом удалить
const startValues = () => {
  lostPassportStore.setLostPassportInfo(lostPassportStartValues);
  applicantionStore.setApplicantionApplicant(applicantStartValues);
  temporaryCertificateStore.setTemporaryCertificate(temporaryCertificateStartValues);
}

startValues();


const LostPassport = observer(() => {
  const [messageApi, contextHolder] = message.useMessage(messageConfig);
  const [isOpenLostPassport, setIsOpenLostPassport] = useState<boolean>(true);
  const [isOpenApplication, setIsOpenApplication] = useState<boolean>(false);
  const [isOpenTemporaryCertificate, setIsOpenTemporaryCertificate] = useState<boolean>(false);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(secondsDefault);


  const clearComponent = () => {
    applicantionStore.clearStore();
    temporaryCertificateStore.clearStore();
    lostPassportStore.clearStore();
    setSeconds(secondsDefault);
    setIsOpenLostPassport(true);
    setIsOpenApplication(false);
    setIsOpenTemporaryCertificate(false);
    setIsOpenDialog(false);
    startValues();
  };


  /* Для заявления утери паспорта */
  const continueLostPassport = () => {
    setIsOpenLostPassport(false);
    setIsOpenApplication(true);
  }

  /* Для заявления выдачи/замены паспорта */
  const cancelPassportApplication = () => {
    lostPassportStore.setIsApplicantionReady(false);
    setIsOpenApplication(false);
    setIsOpenLostPassport(true);
  }

  const sendPassportApplication = async () => {
    await ApplicationsServices.createLostPassportApplication(
      lostPassportStore.lostPassportInfo!,
      applicantionStore.getApplicationCreate(),
      null
    ).then(() => {
      successMessage(messageApi, "Заявление успешно занесено!");
      setIsOpenApplication(false);
      setIsOpenDialog(true);
    }).catch((err) => {
      errorMessage(messageApi);
    })
  }

  const continuePassportApplication = () => {
    setIsOpenApplication(false);
    setIsOpenTemporaryCertificate(true);
  }


  /* Для временного удостоверения */
  const cancelTemporaryCertificate = () => {
    applicantionStore.setIsApplicantionReady(false);
    setIsOpenTemporaryCertificate(false);
    setIsOpenApplication(true);
  }


  const sendTemporaryCertificate = async () => {
    await ApplicationsServices.createLostPassportApplication(
      lostPassportStore.lostPassportInfo!,
      applicantionStore.getApplicationCreate(),
      temporaryCertificateStore.temporaryCertificate
    ).then(() => {
      successMessage(messageApi, "Заявление успешно занесено!");
      setIsOpenTemporaryCertificate(false);
      setIsOpenDialog(true);
    }).catch((err) => {
      errorMessage(messageApi);
    })
  }


  useEffect(() => {
    return () => {
      lostPassportStore.clearStore();
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
        Заявление утери паспорта
      </h1>
      {isOpenLostPassport &&
        <LostPassportWithNotification
          lostPassportStore={lostPassportStore}
          continueLostPassport={continueLostPassport}
          isOpenNotification={lostPassportStore.isApplicantionReady}
        />
      }
      {isOpenApplication &&
        <ApplicationWithNotification
          isLostPassport={true}
          applicantionStore={applicantionStore}
          sendPassportApplication={sendPassportApplication}
          continuePassportApplication={continuePassportApplication}
          isOpenNotification={applicantionStore.isApplicantionReady}
          buttonCancel={
            <ButtonStep
              onClick={cancelPassportApplication}
              style={{ width: "33.333%" }}
            >
              Назад
            </ButtonStep>
          }
        />
      }
      {isOpenTemporaryCertificate &&
        <TemporaryCertificateWithNotification
          temporaryCertificateStore={temporaryCertificateStore}
          sendTemporaryCertificate={sendTemporaryCertificate}
          isOpenNotification={temporaryCertificateStore.isApplicantionReady}
          buttonCancel={
            <ButtonStep
              onClick={cancelTemporaryCertificate}
              style={{ width: "33.333%" }}
            >
              Назад
            </ButtonStep>
          }
        />
      }
      {isOpenDialog &&
        <DialogTimerReturn seconds={seconds} />
      }
    </div>
  )
});


export default LostPassport;