import { ReactNode } from "react";
import { Button, DatePicker, Form, Input, Space } from "antd";
import FormBaseProps from "../../../models/props/FormBaseProps";

import "dayjs/locale/ru";
import locale from "antd/es/date-picker/locale/ru_RU";


const dateFormat = "DD.MM.YYYY";


interface FormTemporaryCertificateProps extends FormBaseProps {
  // buttons?: ReactNode,
}


const FormTemporaryCertificate = (props: FormTemporaryCertificateProps) => {
  return (
    <Form
      layout="vertical"
      form={props.form}
      onFinish={props.onFinish}
      onFinishFailed={props.onFinishFailed}
    >
      <Form.Item label="Серия и номер" required={true}>
        <Space.Compact direction="horizontal" style={{ width: "100%" }}>
          <Form.Item
            name={["temporary_certificate", "series"]}
            noStyle
            style={{ width: "50%" }}
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
            name={["temporary_certificate", "id"]}
            noStyle
            style={{ width: "50%" }}
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
        label="Причина выдачи"
        name="reason"
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
        ]}
      >
        <Input placeholder="Введите причину выдачи" />
      </Form.Item>

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


export default FormTemporaryCertificate;