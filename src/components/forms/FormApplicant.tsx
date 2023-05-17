import { FormBaseProps } from "../../models/props/FormBaseProps";
import { Button, DatePicker, Form, Input, Select, Space } from "antd";

import "dayjs/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";


const dateFormat = "DD.MM.YYYY";
const selectFamilyStatus = [
  { label: "В браке", value: "In_brake" },
  { label: "Разведён", value: "Razveden" },
  { label: "Холост", value: "Xoloct" },
]


const FormApplicant = (props: FormBaseProps) => {
  return (
    <Form
      layout="vertical"
      form={props.form}
      onFinish={props.onFinish}
      onFinishFailed={props.onFinishFailed}
    >
      <Form.Item label="ФИО заявителя" required={true}>
        <Space direction="horizontal" style={{ width: "100%" }}>
          <Form.Item
            name={["full_name", "last_name"]}
            noStyle
            rules={[
              {
                required: true,
                message: "Поле Фамилия является обязательным!"
              },
              {
                pattern: new RegExp(/^[А-Я][а-я\s-]+[а-я]$/),
                message: "Фамилия начинается с заглавной буквы"
              }
            ]}
          >
            <Input placeholder="Введите фамилию" />
          </Form.Item>
          <Form.Item
            name={["full_name", "first_name"]}
            noStyle
            rules={[
              {
                required: true,
                message: "Поле Имя является обязательным!"
              },
              {
                pattern: new RegExp(/^[А-Я][а-я\s-]+[а-я]$/),
                message: "Имя начинается с заглавной буквы"
              }
            ]}
          >
            <Input placeholder="Введите имя" />
          </Form.Item>
          <Form.Item
            name={["full_name", "middle_name"]}
            noStyle
            rules={[
              {
                pattern: new RegExp(/^[А-Я][а-я\s-]+[а-я]$/),
                message: "Отчество начинается с заглавной буквы"
              }
            ]}
          >
            <Input placeholder="Введите отчество" />
          </Form.Item>
        </Space>
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
          options={[
            { label: "Мужской", value: 1 },
            { label: "Женский", value: 2 }
          ]}
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
          placeholder="Выберите дату"
          locale={locale}
        />
      </Form.Item>

      <Form.Item
        label="Тип предъявленного документа"
        name="type_document"
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
        ]}
      >
        <Select
          // labelInValue
          options={[
            { label: "Временное удостоверение личности гражданина", value: 5 },
            { label: "Паспорт гражданина РФ", value: 2 },
            { label: "Свидетельство о рождении", value: 4 },
            { label: "Служебный паспорт РФ", value: 3 },
            { label: "Удостоверение личности военнослужащего РФ", value: 6 },
            { label: "Удостоверение личности гражданина РФ", value: 1 },
          ]}
          placeholder="Выберите тип документа"
        />
      </Form.Item>

      <Form.Item label="Серия и номер паспорта (доделать, не все поля обязательны)" required={true}>
        <Space direction="horizontal" style={{ width: "100%" }}>
          <Form.Item
            name={["document", "series"]}
            noStyle
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
        </Space>
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

      <Form.Item style={{ marginBottom: 0, marginTop: "30px", textAlign: "center" }}>
        <Button type="primary" onClick={props.form.submit}> Заполнить </Button>
      </Form.Item>
    </Form>
  )
}


export default FormApplicant;