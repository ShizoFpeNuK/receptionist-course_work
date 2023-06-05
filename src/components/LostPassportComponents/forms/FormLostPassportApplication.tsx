import { ReactNode } from "react";
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
            initialValue={props.lostPassport ? props.lostPassport.document.series : null}
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
            initialValue={props.lostPassport ? props.lostPassport.document.id : null}
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
        initialValue={props.lostPassport?.date_of_issue ? dayjs(props.lostPassport.date_of_issue) : null}
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
        initialValue={props.lostPassport ? props.lostPassport.issued_by : null}
      >
        <Input placeholder="Введите кем выдан документ" />
      </Form.Item>

      <Form.Item
        label="Дата утери паспорта"
        name="date_of_loss"
        initialValue={props.lostPassport?.date_of_loss ? dayjs(props.lostPassport.date_of_loss) : null}
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
        initialValue={props.lostPassport ? props.lostPassport.place_of_loss : null}
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
        ]}
      >
        <Input placeholder="Введите место потери" />
      </Form.Item>

      <Form.Item
        label="Обстоятельства утери паспорта"
        name="circumstances_of_loss"
        initialValue={props.lostPassport ? props.lostPassport.circumstances_of_loss : null}
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
        ]}
      >
        <Input placeholder="Введите обстоятельства потери" />
      </Form.Item>

      <Form.Item
        label="Дата обращения по факту похищения"
        name="date_of_kidnapping"
        initialValue={props.lostPassport?.date_of_kidnapping ? dayjs(props.lostPassport.date_of_kidnapping) : null}
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
        initialValue={props.lostPassport ? props.lostPassport.response_method : null}
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
        ]}
      >
        <Input placeholder="Напишите метод ответа" />
      </Form.Item>

      <Form.Item
        label="Наименование организации по факту похищения"
        name="name_of_organization_on_FOA"
        initialValue={props.lostPassport ? props.lostPassport.name_of_organization_on_FOA : null}
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


export default FormLostPassportApplication;