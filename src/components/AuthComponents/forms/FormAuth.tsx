import { Button, Form, Input } from "antd";
import FormBaseProps from "../../../models/props/FormBaseProps";


const FormAuth = (props: FormBaseProps) => {
  return (
    <Form
      layout="vertical"
      form={props.form}
      initialValues={{ remember: true }}
      onFinish={props.onFinish}
      onFinishFailed={props.onFinishFailed}
      autoComplete="off"
    >
      <Form.Item
        label="Логин"
        name="username"
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
        ]}
      >
        <Input placeholder="Введите ваш логин" />
      </Form.Item>
      <Form.Item
        label="Пароль"
        name="password"
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
        ]}
      >
        <Input.Password placeholder="Введите ваш пароль" />
      </Form.Item>

      {/* <Form.Item name="remember" valuePropName="checked" style={{marginBottom: "10px"}}>
          <Checkbox>Remember me</Checkbox>
        </Form.Item> */}

      <Form.Item style={{ marginBottom: 0 }}>
        <Button type="primary" onClick={props.form.submit}> Войти </Button>
      </Form.Item>
    </Form>
  )
}


export default FormAuth;