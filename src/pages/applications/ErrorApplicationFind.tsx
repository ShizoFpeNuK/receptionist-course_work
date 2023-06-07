import { observer } from "mobx-react";
import { OptionSelect } from "../../options/select";
import { errorMessage } from "../../configs/messageAntd.config";
import { MessageInstance } from "antd/es/message/interface";
import { useEffect, useState } from "react";
import { messageConfig, successMessage } from "../../configs/messageAntd.config";
import { Pagination, Select, Space, message } from "antd";
import { IPassportApplicationFullInfo, IPassportApplicationInfo } from "../../models/types/applications.model";
import ModalPassportAppInfo from "../../components/others/Modals/ModalPassportAppInfo";
import CardPassportApplication from "../../components/others/Cards/CardPassportApplication";
import PassportApplicationStore from "../../store/applications/PassportApplication";
import PassportApplicationServices from "../../services/passportApplication.service";


const pageSize: number = 10;
const statusDefault: string = "На рассмотрении";
const passportApplications = new PassportApplicationStore();

const selectStatusApllication: OptionSelect[] = [
  { label: "На рассмотрении", value: "На рассмотрении" },
  { label: "Одобрено", value: "Одобрено" },
  { label: "Отклонено", value: "Отклонено" },
];

const requestApplications = async (statusApplication: string, messageApi: MessageInstance) => {
  await PassportApplicationServices.getAllPassportApplications(statusApplication)
    .then((applications: IPassportApplicationInfo[]) => {
      passportApplications.setApplications(applications);
    })
    .catch(() => {
      errorMessage(messageApi);
    })
}


const ErrorApplicationFind = observer(() => {
  const [page, setPage] = useState<number>(1);
  const [removeButtons, setRemoveButtons] = useState<boolean>(false);
  const [messageApi, contextHolder] = message.useMessage(messageConfig);


  const changeStatus = async (status: string) => {
    await requestApplications(status, messageApi)
      .then(() => {
        successMessage(messageApi);
        if (status === statusDefault) {
          setRemoveButtons(false);
        } else {
          setRemoveButtons(true);
        }
      })
  }


  const clickInfo = async (applicationId: number) => {
    await PassportApplicationServices.getPassportApplicationInfo(applicationId)
      .then((applicantion: IPassportApplicationFullInfo) => {
        ModalPassportAppInfo(applicantion);
      })
      .catch(() => {
        errorMessage(messageApi, "Не удалось просмотреть полную информацию!");
      })
  }

  const clickOk = async (applicationId: number) => {
    await PassportApplicationServices.updatePassportApplication(applicationId, "Одобрено")
      .then(async () => {
        successMessage(messageApi, "Успешно обновлена информация!");
        await requestApplications(statusDefault, messageApi)
      })
      .catch(() => {
        errorMessage(messageApi, "Не удалось обновить информацию!");
      })
  }

  const clickReject = async (applicationId: number) => {
    await PassportApplicationServices.updatePassportApplication(applicationId, "Отклонено")
      .then(async () => {
        successMessage(messageApi, "Успешно обновлена информация!");
        await requestApplications(statusDefault, messageApi);
      })
      .catch(() => {
        errorMessage(messageApi, "Не удалось обновить информацию!");
      })
  }


  useEffect(() => {
    requestApplications(statusDefault, messageApi);

    return () => {
      passportApplications.clearStore();
    }
  }, [])


  return (
    <div className="applicant_find">
      {contextHolder}
      <h1
        className="applicant_find_header title--border"
        style={{ marginBottom: "40px" }}
      >
        Найти заявления выдачи/замены паспорта
      </h1>
      <div className="applicant_find_inner">
        <div style={{ textAlign: "right", marginBottom: "20px" }}>
          <Select
            options={selectStatusApllication}
            defaultValue={"На рассмотрении"}
            placeholder="Выберите статус заявления"
            style={{ width: "200px", textAlign: "left" }}
            onChange={changeStatus}
          />
        </div>
        <div className="applicant_find_cards">
          <Space
            wrap={true}
            direction="horizontal"
            align="start"
            size={[20, 20]}
            style={{ width: "100%", justifyContent: "center" }}
          >
            {passportApplications.applications.filter((application, index: number) => {
              return index + 1 <= page * pageSize && index >= (page - 1) * pageSize;
            }).map((application: IPassportApplicationInfo) =>
              <CardPassportApplication
                onSeeInfo={() => clickInfo(application.register_id)}
                onOk={() => clickOk(application.register_id)}
                onReject={() => clickReject(application.register_id)}
                onlySeeInfo={removeButtons}
                passportApplication={application}
                disabledOk={application.is_identity_document}
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


export default ErrorApplicationFind;