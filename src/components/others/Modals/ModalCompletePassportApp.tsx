import '../../../style/css/components/others/modalPassportAppInfo.css';
import { FormInstance } from "antd/es/form/Form";
import { dateFormat } from "../../../options/datePicker";
import { DatePicker, Form, Input, Modal, Space } from "antd";
import locale from "antd/es/date-picker/locale/ru_RU";


const ModalCompletePassportApp = (
  form: FormInstance,
  onFinish: (values: any) => void
) => {
  Modal.confirm({
    className: "modal_complete_application",
    title: <h3> Документ, удостоверяющий личность </h3>,
    icon: null,
    centered: true,
    width: "700px",
    okText: "Отправить",
    onOk() {
      form.submit();
    },
    content: (
      <Form
        layout="vertical"
        form={form}
        preserve={false}
        onFinish={onFinish}
      >
        <Form.Item
          label="Серия и номер паспорта"
          required={true}
        >
          <Space.Compact direction="horizontal" style={{ width: "100%" }}>
            <Form.Item
              name={["document", "series"]}
              noStyle
              rules={[
                {
                  required: true,
                  message: "Поле Серия является обязательным!",
                },
                {
                  pattern: new RegExp(/^[IXV\-А-Я\d]+$/),
                  message: `Серия может состоять из римских или 
                арабских цифр, дефиса и заглавных русских букв!`
                }
              ]}
            >
              <Input
                style={{ width: "30%" }}
                placeholder="Введите серию"
              />
            </Form.Item>
            <Form.Item
              name={["document", "id"]}
              noStyle
              rules={[
                {
                  required: true,
                  message: "Поле Номер является обязательным!"
                },
                {
                  pattern: new RegExp(/^\d{6}$/),
                  message: "Номер состоит из 6 цифр!"
                }
              ]}
            >
              <Input
                style={{ width: "70%" }}
                placeholder="Введите номер"
              />
            </Form.Item>
          </Space.Compact>
        </Form.Item>

        <Form.Item
          label="Дата выдачи документа"
          name="date_of_issue"
          rules={[
            {
              required: true,
              message: "Это поле является обязательным!",
            },
          ]}
        >
          <DatePicker
            format={dateFormat}
            style={{ width: "100%" }}
            locale={locale}
            placeholder="Выберите дату"
          />
        </Form.Item>

        <Form.Item
          label="Кем выдан предъявленный документ"
          name="issued_by"
          rules={[
            {
              required: true,
              message: "Это поле является обязательным!",
            },
          ]}
        >
          <Input placeholder="Введите кем выдан документ" />
        </Form.Item>
      </Form>
    )
  });
};


export default ModalCompletePassportApp;