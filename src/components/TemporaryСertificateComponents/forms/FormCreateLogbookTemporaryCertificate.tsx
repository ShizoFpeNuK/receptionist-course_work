import { ReactNode } from "react";
import { Button, DatePicker, Form, Input, Space } from "antd";
import FormBaseProps from "../../../models/props/FormBaseProps";

import "dayjs/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";


const dateFormat = "DD.MM.YYYY";


interface FormCreateLogbookTemporaryCertificateProps extends FormBaseProps {
  // buttons?: ReactNode,
}

//Нужна ли отдельная форма???
const FormCreateLogbookTemporaryCertificate = (props: FormCreateLogbookTemporaryCertificateProps) => {
  return (
    <Form
      layout="vertical"
      form={props.form}
      onFinish={props.onFinish}
      onFinishFailed={props.onFinishFailed}
    >
   

      <Form.Item
        label="Удостоверение действительно до"
        name="valid_until"
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


export default FormCreateLogbookTemporaryCertificate;