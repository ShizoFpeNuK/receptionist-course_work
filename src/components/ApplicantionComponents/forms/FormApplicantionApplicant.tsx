import { observer } from "mobx-react";
import { dateFormat } from "../../../options/datePicker";
import { OptionSelect } from "../../../options/select";
import { IClassifierOKIN } from "../../../models/types/classifiers.model";
import { IApplicantionApplicant } from "../../../models/types/passportApplicantion.model";
import { ReactNode, useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Select, Space } from "antd";
import dayjs from "dayjs";
import FormBaseProps from "../../../models/props/FormBaseProps";
import classifiersOKIN from "../../../store/other/ClassifiersStore";


interface FormApplicantionApplicant extends FormBaseProps {
  buttons?: ReactNode,
  applicant?: IApplicantionApplicant | null,
}


const FormApplicantionApplicant = observer((props: FormApplicantionApplicant) => {
  const [selectSex, setSelectSex] = useState<OptionSelect[]>([]);
  const [selectFamilyStatus, setSelectFamilyStatus] = useState<OptionSelect[]>([]);


  const checkFields = () => {
    const values: IApplicantionApplicant = props.form.getFieldsValue();

    if ((values.relatives.full_name_father || values.relatives.full_name_mother) &&
      (values.full_name.first_name || values.full_name.last_name)) {
      if (!values.full_name.last_name?.length) {
        props.form.setFieldValue(["full_name", "last_name"], null);
      }
      if (!values.full_name.first_name?.length) {
        props.form.setFieldValue(["full_name", "first_name"], null);
      }
      if (!values.full_name.middle_name?.length) {
        props.form.setFieldValue(["full_name", "middle_name"], null);
      }

      if (!values.relatives.full_name_father?.length) {
        props.form.setFieldValue(["relatives", "full_name_father"], null);
      }
      if (!values.relatives.full_name_mother?.length) {
        props.form.setFieldValue(["relatives", "full_name_mother"], null);
      }
      if (!values.email?.length) {
        props.form.setFieldValue("email", null);
      }
      if (!values.other_nationality?.length) {
        props.form.setFieldValue("other_nationality", null);
      }

      props.form.submit();
    }
  }


  useEffect(() => {
    const buffer: OptionSelect[] = [];

    classifiersOKIN.classifierFamilyStatus.forEach((el: IClassifierOKIN) => {
      buffer.push({
        label: el.name,
        value: el.id
      })
    })

    setSelectFamilyStatus(buffer);
  }, [classifiersOKIN.classifierFamilyStatus])

  useEffect(() => {
    const buffer: OptionSelect[] = [];

    classifiersOKIN.classifierSex.forEach((el: IClassifierOKIN) => {
      buffer.push({
        label: el.name,
        value: el.id
      })
    });

    setSelectSex(buffer);
  }, [classifiersOKIN.classifierSex])

  useEffect(() => {
    let key: keyof IApplicantionApplicant;

    if (props.applicant) {
      for (key in props.applicant) {
        if (key === "full_name") {
          props.form.setFieldValue(["full_name", "last_name"], props.applicant.full_name.last_name);
          props.form.setFieldValue(["full_name", "first_name"], props.applicant.full_name.first_name);
          props.form.setFieldValue(["full_name", "middle_name"], props.applicant.full_name.middle_name);
        } else if (key === "date_of_birth") {
          props.form.setFieldValue("date_of_birth", dayjs(props.applicant.date_of_birth));
        } else {
          props.form.setFieldValue(key, props.applicant[key]);
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
      <Form.Item label="ФИО заявителя" required={true}>
        <Space.Compact direction="horizontal" style={{ width: "100%" }}>
          <Form.Item
            name={["full_name", "last_name"]}
            noStyle
            rules={[
              {
                pattern: new RegExp(/^[А-Я][а-яА-Я\s-]+[а-я]$/),
                message: "Фамилия начинается с заглавной буквы"
              }
            ]}
          >
            <Input placeholder="Введите фамилию" />
          </Form.Item>
          <Form.Item
            name={["full_name", "first_name"]}
            noStyle
            rules={[
              {
                pattern: new RegExp(/^[А-Я][а-яА-Я\s-]+[а-я]$/),
                message: "Имя начинается с заглавной буквы"
              }
            ]}
          >
            <Input placeholder="Введите имя" />
          </Form.Item>
          <Form.Item
            name={["full_name", "middle_name"]}
            noStyle
            rules={[
              {
                pattern: new RegExp(/^[А-Я][а-яА-Я\s-]+[а-я]$/),
                message: "Отчество начинается с заглавной буквы!"
              }
            ]}
          >
            <Input placeholder="Введите отчество" />
          </Form.Item>
        </Space.Compact>
      </Form.Item>

      <Form.Item
        label="Пол заявителя"
        name="code_sex"
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
        ]}
      >
        <Select
          options={selectSex}
          placeholder="Выберите пол"
        />
      </Form.Item>

      <Form.Item
        label="Место рождения"
        name="place_of_birth"
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
        ]}
      >
        <Input placeholder="Введите место рождения" />
      </Form.Item>

      <Form.Item
        label="Дата рождения"
        name="date_of_birth"
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
        label="Место проживания/пребывания"
        name="place_of_residence"
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
        ]}
      >
        <Input placeholder="Введите место проживания/пребывания" />
      </Form.Item>

      <Form.Item
        label="Номер телефона заявителя"
        name="telephone"
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
          {
            pattern: new RegExp(/^\+7\s[\(]9\d{2}[\)]\s\d{3}[-]{0,1}\d{2}[-]{0,1}\d{2}$/),
            message: "Пример ввода: +7 (916) 419-52-28"
          }
        ]}
      >
        <Input placeholder="Введите номер телефона" />
      </Form.Item>

      <Form.Item
        label="Иностранное гражданство"
        name="other_nationality"
      >
        <Input placeholder="Выберите гражданство" />
      </Form.Item>

      <Form.Item
        label="Электронная почта"
        name="email"
        initialValue={props.applicant ? props.applicant.email : null}
        rules={[
          {
            pattern: new RegExp(/^[a-zA-Z\d]+\@[a-z]+\.[a-z]+$/),
            message: "Неправильный вид почты"
          }
        ]}
      >
        <Input placeholder="Введите электронную почту" />
      </Form.Item>

      <Form.Item label="Родственники" required={true}>
        <Space.Compact direction="horizontal" style={{ width: "100%" }}>
          <Form.Item
            name={["relatives", "full_name_father"]}
            noStyle
            rules={[
              {
                pattern: new RegExp(/^[А-Я][а-яА-Я\s-]+[а-я]$/),
                message: "Фамилия начинается с заглавной буквы"
              }
            ]}
          >
            <Input placeholder="Введите ФИО отца" />
          </Form.Item>
          <Form.Item
            name={["relatives", "full_name_mother"]}
            noStyle
            rules={[
              {
                pattern: new RegExp(/^[А-Я][а-яА-Я\s-]+[а-я]$/),
                message: "Имя начинается с заглавной буквы"
              }
            ]}
          >
            <Input placeholder="Введите ФИО матери" />
          </Form.Item>
        </Space.Compact>
      </Form.Item>

      <Form.Item
        label="Семейное положение"
        name="code_family_status"
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
        ]}
      >
        <Select
          options={selectFamilyStatus}
          placeholder="Выберите статус семьи"
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
});


export default FormApplicantionApplicant;