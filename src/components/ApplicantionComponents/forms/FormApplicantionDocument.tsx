import { dateFormat } from "../../../options/datePicker";
import { OptionSelect } from "../../../options/select";
import { ReactNode, useEffect } from "react";
import { IApplicantionDocument } from "../../../models/types/passportApplicantion.model";
import { Button, DatePicker, Form, Input, Select, Space } from "antd";
import dayjs from "dayjs";
import FormBaseProps from "../../../models/props/FormBaseProps";


const regExpPassport = new RegExp(/^\d{4}$/);
const regExpСertificate = new RegExp(/^[IVX]+[\-]{1}[А-Я]{2}$/);

const selectTypeDocument: OptionSelect[] = [
  { label: "Паспорт гражданина РФ", value: "Паспорт гражданина РФ" },
  { label: "Свидетельство о рождении", value: "Свидетельство о рождении" },
  { label: "Национальный заграничный паспорт", value: "Национальный заграничный паспорт" },
]

interface FormApplicantionDocumentProps extends FormBaseProps {
  buttons?: ReactNode,
  document?: IApplicantionDocument | null,
}


const FormApplicantionDocument = (props: FormApplicantionDocumentProps) => {
  const checkFields = () => {
    const values: IApplicantionDocument = props.form.getFieldsValue();

    if (values.type_document === "Паспорт гражданина РФ" &&
      regExpPassport.test(values.document.series)) {
      props.form.submit();
      return;
    }
    if (values.type_document === "Свидетельство о рождении" &&
      regExpСertificate.test(values.document.series)) {
      props.form.submit();
      return;
    }
    if (values.type_document !== "Паспорт гражданина РФ" &&
      values.type_document !== "Свидетельство о рождении") {
      props.form.submit();
      return;
    }
  }


  useEffect(() => {
    let key: keyof IApplicantionDocument;

    if (props.document) {
      for (key in props.document) {
        if (key === "document") {
          props.form.setFieldValue(["document", "series"], props.document.document.series);
          props.form.setFieldValue(["document", "id"], props.document.document.id);
        } else if (key === "date_of_issue") {
          props.form.setFieldValue("date_of_issue", dayjs(props.document.date_of_issue));
        } else {
          props.form.setFieldValue(key, props.document[key])
        }
      }
    }
  }, [])


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


export default FormApplicantionDocument;