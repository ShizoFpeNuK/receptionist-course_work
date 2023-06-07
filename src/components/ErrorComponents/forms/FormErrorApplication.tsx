import { IErrorApplication } from "../../../models/types/errorApplication";
import { ReactNode, useEffect } from "react";
import { Button, Form, Input, Space } from "antd";
import FormBaseProps from "../../../models/props/FormBaseProps";


interface FormErrorApplicationProps extends FormBaseProps {
  errorApplication?: IErrorApplication | null,
  buttons?: ReactNode,
}


const FormErrorApplication = (props: FormErrorApplicationProps) => {
  useEffect(() => {
    let key: keyof IErrorApplication;

    if (props.errorApplication) {
      for (key in props.errorApplication) {
        props.form.setFieldValue(key, props.errorApplication[key]);
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
        label="Описание допущеных опечаток (ошибок)"
        name="description_of_typos"
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
          {
            pattern: new RegExp(/^[а-яА-Я\s\-\,\.]+$/),
            message: "Только буквы русского алфавита, пробелы, дефисы, запятые и точки!"
          }
        ]}
      >
        <Input.TextArea
          autoSize={{ minRows: 1, maxRows: 10 }}
          placeholder="Введите описание ошибок"
        />
      </Form.Item>

      <Form.Item
        label="Метод ответа"
        name="response_method"
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
          {
            pattern: new RegExp(/^[а-яА-Я\s]+$/),
            message: "Только буквы русского алфавита и пробелы!"
          }
        ]}
      >
        <Input placeholder="Введите метод ответа" />
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


export default FormErrorApplication;