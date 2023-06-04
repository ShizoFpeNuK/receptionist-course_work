import { ReactNode } from "react";
import { Button, Form, Input, Space } from "antd";
import FormBaseProps from "../../../models/props/FormBaseProps";


interface FormApplicantPassportApplicantionProps extends FormBaseProps {
  buttons?: ReactNode,
}


const FormApplicantPassportApplicantion = (props: FormApplicantPassportApplicantionProps) => {
  return (
    <Form
      layout="vertical"
      form={props.form}
      onFinish={props.onFinish}
      onFinishFailed={props.onFinishFailed}
    >
      <Form.Item
        label="Причина выдачи/замены паспорта"
        name="grounds_for_extradition"
        initialValue="Достижение 20-летнего возраста"
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
        ]}
      >
        <Input placeholder="Введите причину выдачи/замены" />
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
            onClick={props.form.submit}
            style={props.buttons ? { width: "33.333%" } : { width: "50%" }}
          >
            Продолжить
          </Button>
        </Space.Compact>
      </Form.Item>
    </Form>
  )
};


export default FormApplicantPassportApplicantion;