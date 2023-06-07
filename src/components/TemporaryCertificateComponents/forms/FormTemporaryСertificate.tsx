import { dateFormat } from "../../../options/datePicker";
import { ReactNode, useEffect } from "react";
import { ITemporaryCertificate } from "../../../models/types/temporaryCertificate.model";
import { Button, DatePicker, Form, Input, Space } from "antd";
import dayjs from "dayjs";
import FormBaseProps from "../../../models/props/FormBaseProps";


interface FormTemporaryCertificateProps extends FormBaseProps {
  buttons?: ReactNode,
  temporaryCertificate?: ITemporaryCertificate | null,
}


const FormTemporaryCertificate = (props: FormTemporaryCertificateProps) => {
  const checkFields = () => {
    const values: ITemporaryCertificate = props.form.getFieldsValue();

    if (values.valid_until && values.reason &&
      values.document.id && values.document.series) {
      props.form.submit();
    }
  }


  useEffect(() => {
    let key: keyof ITemporaryCertificate;

    if (props.temporaryCertificate) {
      for (key in props.temporaryCertificate) {
        if (key === "document") {
          props.form.setFieldValue(["document", "series"], props.temporaryCertificate.document.series);
          props.form.setFieldValue(["document", "id"], props.temporaryCertificate.document.id);
        } else if (key === "valid_until") {
          props.form.setFieldValue("valid_until", dayjs(props.temporaryCertificate.valid_until));
        } else {
          props.form.setFieldValue(key, props.temporaryCertificate[key]);
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
      <Form.Item label="Серия и номер паспорта" required={true} >
        <Space.Compact direction="horizontal" style={{ width: "100%" }}>
          <Form.Item
            name={["document", "series"]}
            noStyle
            rules={[
              {
                required: true,
                message: "Это поле является обязательным!",
              },
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
            rules={[
              {
                required: true,
                message: "Это поле является обязательным!",
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
        label="Причина выдачи временного удостоверения"
        name="reason"
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
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
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          }
        ]}
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
    </Form >
  )
};


export default FormTemporaryCertificate;