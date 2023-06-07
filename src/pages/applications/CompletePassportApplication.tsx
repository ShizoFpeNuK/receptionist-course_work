import { useForm } from "antd/es/form/Form";
import { observer } from "mobx-react";
import { MessageInstance } from "antd/es/message/interface";
import { useEffect, useState } from "react";
import { IApplicantionDocument } from "../../models/types/passportApplicantion.model";
import { IUncompletedPassportApp } from "../../models/types/uncompletedPassportApplication";
import { Button, Pagination, Space, message } from "antd";
import { errorMessage, messageConfig, successMessage } from "../../configs/messageAntd.config";
import dayjs from "dayjs";
import ModalCompletePassportApp from "../../components/others/Modals/ModalCompletePassportApp";
import CardUncompletedPassportApp from "../../components/others/Cards/CardUncompletedPassportApp";
import CompletePassportApplicationServices from "../../services/completePassportApplication";
import UncompletedPassportApplicationStore from "../../store/applications/UncompletedPassportApplicationStore";


const pageSize: number = 10;
const passportApplications = new UncompletedPassportApplicationStore();

const requestApplications = async (messageApi: MessageInstance) => {
  await CompletePassportApplicationServices.getAllPassportApplications()
    .then((applications: IUncompletedPassportApp[]) => {
      passportApplications.setApplications(applications);
    })
    .catch((err) => {
      errorMessage(messageApi);
    })
}

interface ValuesFormDocument extends IApplicantionDocument {
  date_of_issue: dayjs.Dayjs,
}


const CompletePassportApplication = observer(() => {
  const [form] = useForm();
  const [page, setPage] = useState<number>(1);
  const [messageApi, contextHolder] = message.useMessage(messageConfig);
  let appId: number = 0;


  const handlerGetApplications = async () => {
    await requestApplications(messageApi);
  }


  const onFinish = async (values: ValuesFormDocument) => {
    const correctValues: IApplicantionDocument = {
      ...values,
      "type_document": "Паспорт гражданина РФ",
      "date_of_issue": values["date_of_issue"].format("YYYY-MM-DD")
    }


    await CompletePassportApplicationServices.completePassportApplication(appId, correctValues)
      .then(async () => {
        successMessage(messageApi, "Заявление успешно дополнено!");
        await requestApplications(messageApi);
      })
      .catch(() => {
        errorMessage(messageApi, "Заявление не удалось дополнить!");
      })
  }

  const onComplete = (applicationId: number) => {
    appId = applicationId;
    ModalCompletePassportApp(form, onFinish);
  }


  useEffect(() => {
    requestApplications(messageApi);

    return () => {
      passportApplications.clearStore();
    }
  }, [])


  return (
    <div className="uncompleted_applicant">
      {contextHolder}
      <h1
        className="uncompleted_applicant_header title--border"
        style={{ marginBottom: "40px" }}
      >
        Найти заявления выдачи/замены паспорта
      </h1>
      <div className="applicant_find_inner">
        <div style={{ textAlign: "right", marginBottom: "20px" }}>
          <Button onClick={handlerGetApplications}> Найти все </Button>
        </div>
        <div className="uncompleted_applicant_cards">
          <Space
            wrap={true}
            direction="horizontal"
            align="start"
            size={[20, 20]}
            style={{ width: "100%", justifyContent: "center" }}
          >
            {passportApplications.applications.filter((application, index: number) => {
              return index + 1 <= page * pageSize && index >= (page - 1) * pageSize;
            }).map((application: IUncompletedPassportApp) =>
              <CardUncompletedPassportApp
                onComplete={() => onComplete(application.register_id)}
                passportApplication={application}
                key={application.register_id}
              />
            )}
          </Space>
          {passportApplications.applications.length !== 0
            ? <Pagination
              current={page}
              pageSize={pageSize}
              onChange={setPage}
              style={{ marginTop: "30px" }}
              total={passportApplications.applications.length || 0}
            />
            : <p> Ничего нет... </p>
          }
        </div>
      </div>
    </div>
  )
});


export default CompletePassportApplication;