import { dateFormat } from "../../../options/datePicker";
import { OptionSelect } from "../../../options/select";
import { IClassifierOKIN } from "../../../models/types/classifiers.model";
import { IApplicantionDocument } from "../../../models/types/applicantion.model";
import { ReactNode, useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Select, Space } from "antd";
import dayjs from "dayjs";
import FormBaseProps from "../../../models/props/FormBaseProps";
import classifiersOKIN from "../../../store/other/ClassifiersStore";


const regExpPassport = new RegExp(/^\d{4}$/);
const regExpСertificate = new RegExp(/^[IVX]+[\-]{1}[А-Я]{2}$/);

const selectTypeDocument: OptionSelect[] = [
  { label: "Паспорт гражданина РФ", value: "Паспорт гражданина РФ" },
  { label: "Свидетельство о рождении", value: "Свидетельство о рождении" },
  { label: "Национальный заграничный паспорт", value: "Национальный заграничный паспорт" },
]

interface FormApplicantDocumentProps extends FormBaseProps {
  buttons?: ReactNode,
}


const FormApplicantDocument = (props: FormApplicantDocumentProps) => {
  const [selectSex, setSelectSex] = useState<OptionSelect[]>([]);


  const checkFields = () => {
    const values: IApplicantionDocument = props.form.getFieldsValue();

    if (values.full_name.first_name || values.full_name.last_name) {
      if (values.type_document === "Паспорт гражданина РФ" &&
        regExpPassport.test(values.document.series)) {
        props.form.submit();
        return
      }
      if (values.type_document === "Свидетельство о рождении" &&
        regExpСertificate.test(values.document.series)) {
        props.form.submit();
        return
      }
      if (values.type_document !== "Паспорт гражданина РФ" &&
        values.type_document !== "Свидетельство о рождении") {
        props.form.submit();
        return
      }
    }
  }


  useEffect(() => {
    const buffer: OptionSelect[] = [];

    classifiersOKIN.classifierSex.forEach((el: IClassifierOKIN) => {
      buffer.push({
        label: el.name,
        value: el.id
      })
    })

    setSelectSex(buffer);
  }, [classifiersOKIN.classifierSex])


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
        initialValue={"Паспорт гражданина РФ"} //
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
        label="Серия и номер паспорта"
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
            <Input
              style={{ width: "70%" }}
              placeholder="Введите номер"
            />
          </Form.Item>
        </Space.Compact>
      </Form.Item>

      <Form.Item label="ФИО по документу" required={true}>
        <Space.Compact direction="horizontal" style={{ width: "100%" }}>
          <Form.Item
            name={["full_name", "last_name"]}
            noStyle
            initialValue="Иванов" //
            rules={[
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
            initialValue="Иван" //
            rules={[
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
            initialValue="Иванович" //
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
        name="code_sex"
        initialValue={1}
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
        ]}
      >
        <Select
          options={selectSex}
          placeholder="Выберите пол"
        />
      </Form.Item>

      <Form.Item
        label="Место рождения"
        name="place_of_birth"
        initialValue="г. Москва"
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
        initialValue={dayjs("10.10.1980", dateFormat)} //
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
            style={props.buttons ? { width: "33.333%" } : { width: "50%" }}
          >
            Очистить
          </Button>
          <Button
            type="primary"
            onClick={checkFields}
            style={props.buttons ? { width: "33.333%" } : { width: "50%" }}
          >
            Продолжить
          </Button>
        </Space.Compact>
      </Form.Item>
    </Form>
  )
};


export default FormApplicantDocument;