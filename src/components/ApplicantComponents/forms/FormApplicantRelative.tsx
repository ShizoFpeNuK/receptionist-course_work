import { ReactNode } from "react";
import { Button, DatePicker, Form, Input, Select, Space } from "antd";
import FormBaseProps from "../../../models/props/FormBaseProps";

import "dayjs/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";


const dateFormat = "DD.MM.YYYY";
const selectFamilyStatus = [
  { label: "В браке", value: "In_brake" },
  { label: "Разведён", value: "Razveden" },
  { label: "Холост", value: "Xoloct" },
]

interface FormApplicantRelativeProps extends FormBaseProps {
  buttons?: ReactNode,
}


const FormApplicantRelative = (props: FormApplicantRelativeProps) => {
  return (
    <Form
      layout="vertical"
      form={props.form}
      onFinish={props.onFinish}
      onFinishFailed={props.onFinishFailed}
    >
      <Form.Item label="Родственники">
        <Space.Compact direction="horizontal" style={{ width: "100%" }}>
          <Form.Item
            name={["relatives", "full_name_father"]}
            noStyle
            style={{ width: "33%" }}
            rules={[
              {
                pattern: new RegExp(/^[А-Я][а-яА-Я\s-]+[а-я]$/),
                message: "Фамилия начинается с заглавной буквы"
              }
            ]}
          >
            <Input placeholder="Введите ФИО отца" />
          </Form.Item>
          <Form.Item
            name={["relatives", "full_name_mother"]}
            noStyle
            style={{ width: "33%" }}
            rules={[
              {
                pattern: new RegExp(/^[А-Я][а-яА-Я\s-]+[а-я]$/),
                message: "Имя начинается с заглавной буквы"
              }
            ]}
          >
            <Input placeholder="Введите ФИО матери" />
          </Form.Item>
        </Space.Compact>
      </Form.Item>

      <Form.Item
        label="Семейное положение"
        name="family_status"
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
        ]}
      >
        <Select
          // labelInValue
          options={selectFamilyStatus}
          placeholder="Выберите статус семьи"
        />
      </Form.Item>

      <Form.Item
        label="Дата заключения/расторжения брака"
        name="date_of_conclusion"
      >
        <DatePicker
          format={dateFormat}
          style={{ width: "100%" }}
          placeholder="Выберите дату"
          locale={locale}
        />
      </Form.Item>

      <Form.Item
        label="ФИО супруга/супруги"
        name="full_name_spouse"
        rules={[
          {
            pattern: new RegExp(/^[А-Я][а-яА-Я\s-]+[а-я]$/),
            message: "Имя начинается с заглавной буквы"
          }
        ]}
      >
        <Input placeholder="Введите ФИО супруга/супруги" />
      </Form.Item>

      <Form.Item
        label="Дата рождения супруга/супруги"
        name="date_of_birth_spouse"
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


export default FormApplicantRelative;