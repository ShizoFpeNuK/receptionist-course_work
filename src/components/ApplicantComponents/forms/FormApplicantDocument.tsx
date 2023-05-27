import { ReactNode } from "react";
import { Button, DatePicker, Form, Input, Select, Space } from "antd";
import FormBaseProps from "../../../models/props/FormBaseProps";

import "dayjs/locale/ru";
import dayjs from "dayjs";
import locale from "antd/es/date-picker/locale/ru_RU";


const dateFormat = "DD.MM.YYYY";
const selectTypeDocument = [
  { label: "Временное удостоверение личности гражданина", value: 5 },
  { label: "Паспорт гражданина РФ", value: 2 },
  { label: "Свидетельство о рождении", value: 4 },
  { label: "Служебный паспорт РФ", value: 3 },
  { label: "Удостоверение личности военнослужащего РФ", value: 6 },
  { label: "Удостоверение личности гражданина РФ", value: 1 },
]

interface FormApplicantDocumentProps extends FormBaseProps {
  buttons?: ReactNode,
}


const FormApplicantDocument = (props: FormApplicantDocumentProps) => {
  return (
    <Form
      layout="vertical"
      form={props.form}
      onFinish={props.onFinish}
      onFinishFailed={props.onFinishFailed}
    >
      <Form.Item
        label="Тип предъявленного документа"
        name="type_document"
        initialValue={2} //
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
        ]}
      >
        <Select
          options={selectTypeDocument}
          placeholder="Выберите тип документа"
        />
      </Form.Item>

      <Form.Item
        label="Серия и номер паспорта (доделать, не все поля обязательны)"
        required={true}
      >
        <Space.Compact direction="horizontal" style={{ width: "100%" }}>
          <Form.Item
            name={["document", "series"]}
            noStyle
            style={{ width: "50%" }}
            initialValue={1111} //
            rules={[
              {
                required: true,
                message: "Поле Серия является обязательным!",
              },
              {
                pattern: new RegExp(/^\d{4}$/),
                message: "Серия состоит из 4 цифр!"
              }
            ]}
          >
            <Input placeholder="Введите серию" />
          </Form.Item>
          <Form.Item
            name={["document", "id"]}
            noStyle
            style={{ width: "50%" }}
            initialValue={111111} //
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
            <Input placeholder="Введите номер" />
          </Form.Item>
        </Space.Compact>
      </Form.Item>

      <Form.Item
        label="Дата выдачи документа"
        name="date_of_issue"
        initialValue={dayjs("09.11.2000", dateFormat)} //
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
        label="Кем выдан предъявленный документ"
        name="issued_by"
        initialValue="МВД по г. Москве" //
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
        ]}
      >
        <Input placeholder="Введите кем выдан документ" />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0, marginTop: "30px", textAlign: "center" }}>
        <Space.Compact style={{ width: "100%" }}>
          {props.buttons}
          <Button
            type="primary"
            danger
            onClick={() => props.form.resetFields()}
            style={{ width: "33.333%" }}
          >
            Очистить
          </Button>
          <Button
            type="primary"
            onClick={props.form.submit}
            style={{ width: "33.333%" }}
          >
            Продолжить
          </Button>
        </Space.Compact>
      </Form.Item>
    </Form>
  )
}


export default FormApplicantDocument;