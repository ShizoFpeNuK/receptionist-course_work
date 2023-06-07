import { ReactNode, useEffect } from "react";
import { dateFormat } from "../../../options/datePicker";
import { ILostPassport } from "../../../models/types/lostPassport.model";
import { Button, DatePicker, Form, Input, Space } from "antd";
import dayjs from "dayjs";
import FormBaseProps from "../../../models/props/FormBaseProps";


interface FormLostPassportApplicationProps extends FormBaseProps {
  lostPassport?: ILostPassport | null,
  buttons?: ReactNode,
}


const FormLostPassportApplication = (props: FormLostPassportApplicationProps) => {
  const checkFields = () => {
    const values: ILostPassport = props.form.getFieldsValue();

    if (!values.document.series) {
      props.form.setFieldValue(["document", "id"], null);
    }
    if (!values.document.id) {
      props.form.setFieldValue(["document", "series"], null);
    }
    if (!values.issued_by?.length) {
      props.form.setFieldValue("issued_by", null);
    }
    if (!values.name_of_organization_on_FOA?.length) {
      props.form.setFieldValue("name_of_organization_on_FOA", null);
    }

    props.form.submit();
  }


  useEffect(() => {
    let key: keyof ILostPassport;

    if (props.lostPassport) {
      for (key in props.lostPassport) {
        if (key === "document") {
          props.form.setFieldValue(["document", "series"], props.lostPassport.document.series);
          props.form.setFieldValue(["document", "id"], props.lostPassport.document.id);
        } else if (key === "date_of_issue") {
          if (props.lostPassport.date_of_issue) {
            props.form.setFieldValue("date_of_issue", dayjs(props.lostPassport.date_of_issue));
          }
        } else if (key === "date_of_loss") {
          props.form.setFieldValue("date_of_loss", dayjs(props.lostPassport.date_of_loss));
        } else if (key === "date_of_kidnapping") {
          if (props.lostPassport.date_of_kidnapping) {
            props.form.setFieldValue("date_of_kidnapping", dayjs(props.lostPassport.date_of_kidnapping));
          }
        } else {
          props.form.setFieldValue(key, props.lostPassport[key]);
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
      <Form.Item label="Серия и номер утерянного паспорта">
        <Space.Compact direction="horizontal" style={{ width: "100%" }}>
          <Form.Item
            name={["document", "series"]}
            noStyle
            style={{ width: "50%" }}
            rules={[
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
        label="Дата выдачи паспорта"
        name="date_of_issue"
      >
        <DatePicker
          format={dateFormat}
          style={{ width: "100%" }}
          placeholder="Выберите дату"
        />
      </Form.Item>

      <Form.Item
        label="Кем был выдан паспорт"
        name="issued_by"
        rules={[
          {
            pattern: new RegExp(/^[а-яА-Я\d\s\-\,\.]+$/),
            message: "Только буквы русского алфавита, цифры, пробелы, дефисы, запятые и точки!"
          }
        ]}
      >
        <Input placeholder="Введите кем выдан документ" />
      </Form.Item>

      <Form.Item
        label="Дата утери паспорта"
        name="date_of_loss"
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
        label="Место утери паспорта"
        name="place_of_loss"
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
          {
            pattern: new RegExp(/^[а-яА-Я\d\s\-\,\.]+$/),
            message: "Только буквы русского алфавита, цифры, пробелы, дефисы, запятые и точки!"
          }
        ]}
      >
        <Input placeholder="Введите место потери" />
      </Form.Item>

      <Form.Item
        label="Обстоятельства утери паспорта"
        name="circumstances_of_loss"
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
          {
            pattern: new RegExp(/^[а-яА-Я\d\s\-\,\.]+$/),
            message: "Только буквы русского алфавита, цифры, пробелы, дефисы, запятые и точки!"
          }
        ]}
      >
        <Input placeholder="Введите обстоятельства потери" />
      </Form.Item>

      <Form.Item
        label="Дата обращения по факту похищения"
        name="date_of_kidnapping"
      >
        <DatePicker
          format={dateFormat}
          style={{ width: "100%" }}
          placeholder="Выберите дату"
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
        <Input placeholder="Напишите метод ответа" />
      </Form.Item>

      <Form.Item
        label="Наименование организации по факту похищения"
        name="name_of_organization_on_FOA"
        rules={[
          {
            pattern: new RegExp(/^[а-яА-Я\d\s\-\,\.]+$/),
            message: "Только буквы русского алфавита, цифры, пробелы, дефисы, запятые и точки!"
          }
        ]}
      >
        <Input placeholder="Введите наименование организации" />
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


export default FormLostPassportApplication;