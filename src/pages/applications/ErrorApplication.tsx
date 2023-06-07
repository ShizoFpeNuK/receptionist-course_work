import { message } from "antd";
import { observer } from "mobx-react";
import { clearTimer } from "../../options/clearTimer";
import { useEffect, useState } from "react";
import { errorMessage, messageConfig, successMessage } from "../../configs/messageAntd.config";
import {
  applicantStartValues, documentStartValues,
  errorApplication as errorApplicationValues, passportApplicationStartValues,
  temporaryCertificateStartValues
} from "../../startValues/applicantion";
import ButtonStep from "../../components/others/Buttons/ButtonStep";
import ApplicantionStore from "../../store/applications/ApplicantionStore";
import DialogTimerReturn from "../../components/others/Dialogs/DialogTimerReturn";
import ApplicationsServices from "../../services/applications.service";
import ErrorApplicationStore from "../../store/applications/ErrorApplicationStore";
import TemporaryCertificateStore from "../../store/applications/TemporaryCertificateStore";
import ApplicationWithNotification from "../../components/unionComponents/ApplicationWithNotification";
import ErrorApplicationWithNotification from "../../components/unionComponents/ErrorApplicationWithNotification";
import TemporaryCertificateWithNotification from "../../components/unionComponents/TemporaryCertificateWithNotification";


const secondsDefault: number = 5;
const errorApplicationStore = new ErrorApplicationStore();
const applicantionStore = new ApplicantionStore();
const temporaryCertificateStore = new TemporaryCertificateStore();

//Потом удалить
const startValues = () => {
  errorApplicationStore.setErrorApplication(errorApplicationValues);
  applicantionStore.setApplicantionApplicant(applicantStartValues);
  applicantionStore.setApplicantionDocument(documentStartValues);
  applicantionStore.setApplicationPassportApplication(passportApplicationStartValues);
  temporaryCertificateStore.setTemporaryCertificate(temporaryCertificateStartValues);
}

startValues();


const ErrorApplication = observer(() => {
  const [messageApi, contextHolder] = message.useMessage(messageConfig);
  const [isOpenErrorApplication, setIsOpenErrorApplication] = useState<boolean>(true);
  const [isOpenApplication, setIsOpenApplication] = useState<boolean>(false);
  const [isOpenTemporaryCertificate, setIsOpenTemporaryCertificate] = useState<boolean>(false);
  const [isOpenDialog, setIsOpenDialog] = useState<boolean>(false);
  const [seconds, setSeconds] = useState<number>(secondsDefault);


  const clearComponent = () => {
    errorApplicationStore.clearStore();
    applicantionStore.clearStore();
    temporaryCertificateStore.clearStore();
    setSeconds(secondsDefault);
    setIsOpenErrorApplication(true);
    setIsOpenApplication(false);
    setIsOpenTemporaryCertificate(false);
    setIsOpenDialog(false);
    startValues();
  };


  /* Для заявления утери паспорта */
  const continueLostPassport = () => {
    setIsOpenErrorApplication(false);
    setIsOpenApplication(true);
  }

  /* Для заявления выдачи/замены паспорта */
  const cancelErrorApplication = () => {
    errorApplicationStore.setIsApplicantionReady(false);
    setIsOpenApplication(false);
    setIsOpenErrorApplication(true);
  }

  const sendPassportApplication = async () => {
    await ApplicationsServices.createErrorApplication(
      errorApplicationStore.errorApplication!,
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
    await ApplicationsServices.createErrorApplication(
      errorApplicationStore.errorApplication!,
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
      errorApplicationStore.clearStore();
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
        Заявление о допущенных опечаток (ошибок) в паспорте
      </h1>
      {isOpenErrorApplication &&
        <ErrorApplicationWithNotification
          errorApplicationStore={errorApplicationStore}
          continueErrorApplication={continueLostPassport}
          isOpenNotification={errorApplicationStore.isApplicantionReady}
        />
      }
      {isOpenApplication &&
        <ApplicationWithNotification
          applicantionStore={applicantionStore}
          sendPassportApplication={sendPassportApplication}
          continuePassportApplication={continuePassportApplication}
          isOpenNotification={applicantionStore.isApplicantionReady}
          buttonCancel={
            <ButtonStep
              onClick={cancelErrorApplication}
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


export default ErrorApplication;