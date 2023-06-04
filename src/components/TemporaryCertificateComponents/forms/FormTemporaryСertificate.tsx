import { ReactNode } from "react";
import { dateFormat } from "../../../options/datePicker";
import { ITemporaryCertificate } from "../../../models/types/temporaryCertificate.model";
import { Button, DatePicker, Form, Input, Space } from "antd";
import dayjs from "dayjs";
import FormBaseProps from "../../../models/props/FormBaseProps";


interface FormTemporaryCertificateProps extends FormBaseProps {
  buttons?: ReactNode,
}


const FormTemporaryCertificate = (props: FormTemporaryCertificateProps) => {
  const checkFields = () => {
    const values: ITemporaryCertificate = props.form.getFieldsValue();

    if (values.valid_until && values.reason &&
      values.document.id && values.document.series) {
      props.form.submit();
    }
  }


  return (
    <Form
      layout="vertical"
      form={props.form}
      onFinish={props.onFinish}
      onFinishFailed={props.onFinishFailed}
    >
      <Form.Item label="Серия и номер паспорта" >
        <Space.Compact direction="horizontal" style={{ width: "100%" }}>
          <Form.Item
            name={["document", "series"]}
            noStyle
            initialValue="БА"
            rules={[
              {
                pattern: new RegExp(/^[А-Я]+$/),
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
            initialValue={111111}
            rules={[
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
        label="Причина выдачи временного удостоверения"
        name="reason"
        initialValue="Добраться до дома"
        rules={[
          {
            pattern: new RegExp(/^[а-яА-Я\s]+$/),
            message: "Только буквы русского алфавита!"
          }
        ]}
      >
        <Input
          placeholder="Введите причину выдачи" />
      </Form.Item>

      <Form.Item
        label="Удостоверение действительно до"
        name="valid_until"
        initialValue={dayjs("10.10.2023", dateFormat)}
      >
        <DatePicker
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
};


export default FormTemporaryCertificate;