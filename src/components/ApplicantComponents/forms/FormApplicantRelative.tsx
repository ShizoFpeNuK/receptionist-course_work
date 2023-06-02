import { ReactNode } from "react";
import { Button, DatePicker, Form, Input, Select, Space } from "antd";
import dayjs from "dayjs";
import FormBaseProps from "../../../models/props/FormBaseProps";


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
            initialValue="Иванов Иван Петрович" //
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
            initialValue="Иванова Елена Васильевна" //
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
        initialValue="In_brake" //
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
        ]}
      >
        <Select
          options={selectFamilyStatus}
          placeholder="Выберите статус семьи"
        />
      </Form.Item>

      <Form.Item
        label="Дата заключения/расторжения брака"
        name="date_of_conclusion"
        initialValue={dayjs("11.03.2003", dateFormat)} //
      >
        <DatePicker
          format={dateFormat}
          style={{ width: "100%" }}
          placeholder="Выберите дату"
        />
      </Form.Item>

      <Form.Item
        label="ФИО супруга/супруги"
        name="full_name_spouse"
        initialValue={"Иванова Алена Сергеевна"} //
        rules={[
          {
            pattern: new RegExp(/^[А-Я][а-яА-Я\s-]+[а-я]$/),
            message: "ФИО начинается с заглавной буквы"
          }
        ]}
      >
        <Input placeholder="Введите ФИО супруга/супруги" />
      </Form.Item>

      <Form.Item
        label="Дата рождения супруга/супруги"
        name="date_of_birth_spouse"
        initialValue={dayjs("04.07.1981", dateFormat)} //
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


export default FormApplicantRelative;