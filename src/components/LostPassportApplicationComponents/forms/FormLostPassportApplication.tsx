import { ReactNode } from "react";
import { Button, DatePicker, Form, Input, Select, Space } from "antd";
import FormBaseProps from "../../../models/props/FormBaseProps";

import "dayjs/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";


const dateFormat = "DD.MM.YYYY";
const selectResponse = [
  { label: "По телефону", value: "По телефону" },
  { label: "По почте", value: "По почте" },
  { label: "По электронной почте", value: "По электронной почте" },
  { label: "Лично", value: "Лично" },
];

interface FormLostPassportApplicationProps extends FormBaseProps {
  // buttons?: ReactNode,
}


const FormLostPassportApplication = (props: FormLostPassportApplicationProps) => {
  return (
    <Form
      layout="vertical"
      form={props.form}
      onFinish={props.onFinish}
      onFinishFailed={props.onFinishFailed}
    >
      <Form.Item
        label="Дата потери документа"
        name="date_of_loss"
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
          placeholder="Выберите дату"
          locale={locale}
        />
      </Form.Item>

      <Form.Item
        label="Место потери документа"
        name="place_of_loss"
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
        ]}
      >
        <Input placeholder="Введите место потери" />
      </Form.Item>

      <Form.Item
        label="Обстоятельства потери документа"
        name="circumstances_of_loss"
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
        ]}
      >
        <Input placeholder="Введите обстоятельства потери" />
      </Form.Item>

      <Form.Item
        label="Дата обращения по факту похищения"
        name="date_of_the_kidnapping"
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
          placeholder="Выберите дату"
          locale={locale}
        />
      </Form.Item>

      <Form.Item
        label="Метод ответа"
        name="response_method"
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
        ]}
      >
        <Select
          options={selectResponse}
          placeholder="Выберите метод ответа"
        />
      </Form.Item>

      <Form.Item
        label="Наименование организации по факту похищения"
        name="name_of_organization_on_FOA"
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
        ]}
      >
        <Input placeholder="Введите наименование организации" />
      </Form.Item>

      <Form.Item
        label="Дата заполнения заявления"
        name="date_of_application"
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
          placeholder="Выберите дату"
          locale={locale}
        />
      </Form.Item>


      <Form.Item style={{ marginBottom: 0, marginTop: "30px", textAlign: "center" }}>
        <Space.Compact style={{ width: "100%" }}>
          {/* {props.buttons} */}
          <Button
            type="primary"
            danger
            onClick={() => props.form.resetFields()}
            // style={{ width: "33.333%" }}
            style={{ width: "50%" }}
          >
            Очистить
          </Button>
          <Button
            type="primary"
            onClick={props.form.submit}
            // style={{ width: "33.333%" }}
            style={{ width: "50%" }}
          >
            Продолжить
          </Button>
        </Space.Compact>
      </Form.Item>
    </Form>
  )
}


export default FormLostPassportApplication;