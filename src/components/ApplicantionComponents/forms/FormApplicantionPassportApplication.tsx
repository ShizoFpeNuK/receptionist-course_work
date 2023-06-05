import { dateFormat } from "../../../options/datePicker";
import { OptionSelect } from "../../../options/select";
import { IClassifierOKIN } from "../../../models/types/classifiers.model";
import { ReactNode, useEffect, useState } from "react";
import { IApplicantionPassportApplication } from "../../../models/types/applicantion.model";
import { Button, DatePicker, Form, Input, Select, Space } from "antd";
import dayjs from "dayjs";
import FormBaseProps from "../../../models/props/FormBaseProps";
import classifiersOKIN from "../../../store/other/ClassifiersStore";


interface fullName {
  last_name: string | null,
  first_name: string | null,
  middle_name: string | null
}

const checkEmpty = (values: IApplicantionPassportApplication): boolean => {
  let key: keyof IApplicantionPassportApplication;

  if (values["requisites"]) {
    for (key in values) {
      if (key !== "grounds_for_extradition" && key !== "requisites" && values[key]) {
        if (typeof (values[key]) === "object") {
          let atr: keyof fullName;

          for (atr in values["full_name"]) {
            if (values["full_name"][atr]) {
              return false;
            }
          }
        } else {
          return false;
        }
      }
    }
  }

  return true;
}

interface FormApplicantionPassportApplicantionProps extends FormBaseProps {
  buttons?: ReactNode,
  passportApplication?: IApplicantionPassportApplication | null,
}


const FormApplicantionPassportApplicantion = (props: FormApplicantionPassportApplicantionProps) => {
  const [selectSex, setSelectSex] = useState<OptionSelect[]>([]);


  const checkFields = () => {
    const values: IApplicantionPassportApplication = props.form.getFieldsValue();
    const isEmpty = checkEmpty(values);

    if (!isEmpty) {
      props.form.submit();
      return;
    }

    const value = props.form.getFieldValue("grounds_for_extradition");
    props.form.resetFields();
    props.form.setFieldValue("grounds_for_extradition", value);
    props.form.submit();
  }


  useEffect(() => {
    const buffer: OptionSelect[] = [];

    classifiersOKIN.classifierSex.forEach((el: IClassifierOKIN) => {
      buffer.push({
        label: el.name,
        value: el.id
      })
    })

    setSelectSex(buffer);
  }, [classifiersOKIN.classifierSex])


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
        initialValue={
          props.passportApplication
            ? props.passportApplication.grounds_for_extradition
            : null
        }
        rules={[
          {
            required: true,
            message: "Это поле является обязательным!",
          },
        ]}
      >
        <Input placeholder="Введите причину выдачи/замены" />
      </Form.Item>

      <Form.Item label="Старое ФИО">
        <Space.Compact direction="horizontal" style={{ width: "100%" }}>
          <Form.Item
            name={["full_name", "last_name"]}
            noStyle
            initialValue={
              props.passportApplication
                ? props.passportApplication.full_name.last_name
                : null
            }
            rules={[
              {
                pattern: new RegExp(/^[А-Я][а-яА-Я\s-]+[а-я]$/),
                message: "Фамилия начинается с заглавной буквы"
              }
            ]}
          >
            <Input
              placeholder="Введите фамилию"
            />
          </Form.Item>
          <Form.Item
            name={["full_name", "first_name"]}
            noStyle
            initialValue={
              props.passportApplication
                ? props.passportApplication.full_name.first_name
                : null
            }
            rules={[
              {
                pattern: new RegExp(/^[А-Я][а-яА-Я\s-]+[а-я]$/),
                message: "Имя начинается с заглавной буквы"
              }
            ]}
          >
            <Input
              placeholder="Введите имя"
            />
          </Form.Item>
          <Form.Item
            name={["full_name", "middle_name"]}
            noStyle
            initialValue={
              props.passportApplication
                ? props.passportApplication.full_name.middle_name
                : null
            }
            rules={[
              {
                pattern: new RegExp(/^[А-Я][а-яА-Я\s-]+[а-я]$/),
                message: "Отчество начинается с заглавной буквы!"
              }
            ]}
          >
            <Input
              placeholder="Введите отчество"
            />
          </Form.Item>
        </Space.Compact>
      </Form.Item>

      <Form.Item
        label="Старый пол заявителя"
        name="code_sex"
        initialValue={
          props.passportApplication
            ? props.passportApplication.code_sex
            : null
        }
      >
        <Select
          options={selectSex}
          allowClear
          placeholder="Выберите пол"
        />
      </Form.Item>

      <Form.Item
        label="Старое место рождения"
        name="place_of_birth"
        initialValue={
          props.passportApplication
            ? props.passportApplication.place_of_birth
            : null
        }
      >
        <Input
          placeholder="Введите место рождения"
        />
      </Form.Item>

      <Form.Item
        label="Старая дата рождения"
        name="date_of_birth"
        initialValue={
          props.passportApplication?.date_of_birth
            ? dayjs(props.passportApplication.date_of_birth)
            : null
        }
      >
        <DatePicker
          format={dateFormat}
          style={{ width: "100%" }}
          placeholder="Выберите дату"
        />
      </Form.Item>

      <Form.Item
        label="Реквизиты"
        name="requisites"
        initialValue={
          props.passportApplication
            ? props.passportApplication.requisites
            : null
        }
        rules={[
          {
            pattern: new RegExp(/^[а-яА-Я\s\-№\d\/]+$/),
            message: "Только буквы русского алфавита, №, пробел, дефис, /"
          }
        ]}
      >
        <Input
          placeholder="Введите реквизиты"
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


export default FormApplicantionPassportApplicantion;