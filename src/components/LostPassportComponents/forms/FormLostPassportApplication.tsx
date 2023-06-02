import { ReactNode } from "react";
import { Button, DatePicker, Form, Input, Select, Space } from "antd";
import dayjs from "dayjs";
import FormBaseProps from "../../../models/props/FormBaseProps";


const dateFormat = "DD.MM.YYYY";
const selectResponse = [
  { label: "По телефону", value: "По телефону" },
  { label: "По почте", value: "По почте" },
  { label: "По электронной почте", value: "По электронной почте" },
  { label: "Лично", value: "Лично" },
];

interface FormLostPassportApplicationProps extends FormBaseProps {
  buttons?: ReactNode,
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
        label="Дата утери документа"
        name="date_of_loss"
        initialValue={dayjs("20.07.2023", dateFormat)}//
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
        />
      </Form.Item>

      <Form.Item
        label="Место утери документа"
        name="place_of_loss"
        initialValue="г. Москва, бар на Ломаносовкой, д.24" //
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
        label="Обстоятельства утери документа"
        name="circumstances_of_loss"
        initialValue="Утеря возникла по причине алкогольного опъянения" //
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
        name="date_of_kidnapping"
        initialValue={dayjs("23.07.2023", dateFormat)} //
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
        />
      </Form.Item>

      <Form.Item
        label="Метод ответа"
        name="response_method"
        initialValue="По телефону" //
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
        initialValue="МВД по г. Москве по району Чертаново Северное" //
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
        initialValue={dayjs("24.07.2023", dateFormat)} //
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
        />
      </Form.Item>


      <Form.Item style={{ marginBottom: 0, marginTop: "30px", textAlign: "center" }}>
        <Space.Compact style={{ width: "100%" }}>
          {props.buttons}
          <Button
            type="primary"
            danger
            onClick={() => props.form.resetFields()}
            style={props.buttons ? { width: "33.333%" } : {width: "50%"}}
          >
            Очистить
          </Button>
          <Button
            type="primary"
            onClick={props.form.submit}
            style={props.buttons ? { width: "33.333%" } : {width: "50%"}}
          >
            Продолжить
          </Button>
        </Space.Compact>
      </Form.Item>
    </Form>
  )
}


export default FormLostPassportApplication;