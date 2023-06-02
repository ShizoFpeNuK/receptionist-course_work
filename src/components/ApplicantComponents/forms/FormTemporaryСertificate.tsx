import { ReactNode, useState } from "react";
import { ITemporaryCertificate } from "../../../models/types/temporaryCertificate.model";
import { Button, DatePicker, Form, Input, Select, Space } from "antd";
import FormBaseProps from "../../../models/props/FormBaseProps";


const dateFormat = "DD.MM.YYYY";
const selectBoolean = [
  { label: "Да", value: true },
  { label: "Нет", value: false }
];

interface FormTemporaryCertificateProps extends FormBaseProps {
  buttons?: ReactNode,
}


const FormTemporaryCertificate = (props: FormTemporaryCertificateProps) => {
  const [disabledFields, setDisabledFields] = useState<boolean>(true);


  const checkFields = () => {
    const values: ITemporaryCertificate = props.form.getFieldsValue();

    if (values.temporary_certificate) {
      if (values.valid_until && values.reason) {
        props.form.submit();
        return
      }
    } else {
      props.form.submit();
      return
    }
  }


  const changeSelectBoolean = (value: string) => {
    if (value) {
      setDisabledFields(false);
    } else {
      setDisabledFields(true);
    }
  }


  return (
    <Form
      layout="vertical"
      form={props.form}
      onFinish={props.onFinish}
      onFinishFailed={props.onFinishFailed}
    >
      <Form.Item
        label="Требуется ли временное удостоверение"
        name="temporary_certificate"
        initialValue={false}
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
        ]}
      >
        <Select
          options={selectBoolean}
          onChange={changeSelectBoolean}
          placeholder="Выберите Да или Нет"
        />
      </Form.Item>

      <Form.Item
        label="Причина выдачи временного удостоверения"
        name="reason"
        rules={[
          {
            pattern: new RegExp(/^[а-яА-Я]+$/),
            message: "Только буквы русского алфавита!"
          }
        ]}
      >
        <Input
          disabled={disabledFields}
          placeholder="Введите причину выдачи" />
      </Form.Item>

      <Form.Item
        label="Удостоверение действительно до"
        name="valid_until"
      >
        <DatePicker
          disabled={disabledFields}
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
}


export default FormTemporaryCertificate;