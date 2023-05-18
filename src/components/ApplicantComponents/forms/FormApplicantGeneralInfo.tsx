import { Button, DatePicker, Form, Input, Select, Space } from "antd";
import FormBaseProps from "../../../models/props/FormBaseProps";

import "dayjs/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";


const dateFormat = "DD.MM.YYYY";
const selectSex = [
  { label: "Мужской", value: 1 },
  { label: "Женский", value: 2 }
]


const FormApplicantGeneralInfo = (props: FormBaseProps) => {
  return (
    <Form
      layout="vertical"
      form={props.form}
      onFinish={props.onFinish}
      onFinishFailed={props.onFinishFailed}
    >
      <Form.Item label="ФИО заявителя" required={true}>
        <Space.Compact direction="horizontal" style={{ width: "100%" }}>
          <Form.Item
            name={["full_name", "last_name"]}
            noStyle
            style={{ width: "33%" }}
            rules={[
              {
                required: true,
                message: "Поле Фамилия является обязательным!"
              },
              {
                pattern: new RegExp(/^[А-Я][а-яА-Я\s-]+[а-я]$/),
                message: "Фамилия начинается с заглавной буквы"
              }
            ]}
          >
            <Input placeholder="Введите фамилию" />
          </Form.Item>
          <Form.Item
            name={["full_name", "first_name"]}
            noStyle
            style={{ width: "33%" }}
            rules={[
              {
                required: true,
                message: "Поле Имя является обязательным!"
              },
              {
                pattern: new RegExp(/^[А-Я][а-яА-Я\s-]+[а-я]$/),
                message: "Имя начинается с заглавной буквы"
              }
            ]}
          >
            <Input placeholder="Введите имя" />
          </Form.Item>
          <Form.Item
            name={["full_name", "middle_name"]}
            noStyle
            style={{ width: "33%" }}
            rules={[
              {
                pattern: new RegExp(/^[А-Я][а-яА-Я\s-]+[а-я]$/),
                message: "Отчество начинается с заглавной буквы!"
              }
            ]}
          >
            <Input placeholder="Введите отчество" />
          </Form.Item>
        </Space.Compact>
      </Form.Item>

      <Form.Item
        label="Пол заявителя"
        name="sex"
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
        ]}
      >
        <Select
          // labelInValue
          options={selectSex}
          placeholder="Выберите пол"
        />
      </Form.Item>

      <Form.Item
        label="Место рождения"
        name="place_of_birth"
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
        ]}
      >
        <Input placeholder="Введите место рождения" />
      </Form.Item>

      <Form.Item
        label="Дата рождения"
        name="date_of_birth"
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
        label="Место проживания/пребывания"
        name="place_of_residence"
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
        ]}
      >
        <Input placeholder="Введите место проживания/пребывания" />
      </Form.Item>

      <Form.Item
        label="Номер телефона заявителя"
        name="telephone"
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
          {
            pattern: new RegExp(/^\+7\s[\(]9\d{2}[\)]\s\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}$/),
            message: "Пример ввода: +7 (916) 419-52-28"
          }
        ]}
      >
        <Input placeholder="Введите номер телефона" />
      </Form.Item>

      <Form.Item
        label="Электронная почта"
        name="email"
        rules={[
          {
            pattern: new RegExp(/^[a-zA-Z\d]+\@[a-z]+\.[a-z]+$/),
            message: "Неправильный вид почты"
          }
        ]}
      >
        <Input placeholder="Введите электронную почту" />
      </Form.Item>

      <Form.Item style={{ marginBottom: 0, marginTop: "30px", textAlign: "center" }}>
        <Space.Compact style={{width: "100%"}}>
          <Button type="primary" danger onClick={() => props.form.resetFields()} style={{width: "50%"}}> Очистить </Button>
          <Button type="primary" onClick={props.form.submit} style={{width: "50%"}}> Продолжить </Button>
        </Space.Compact>
      </Form.Item>
    </Form>
  )
}


export default FormApplicantGeneralInfo;