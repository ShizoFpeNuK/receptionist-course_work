import { dateFormat } from "../../../options/datePicker";
import { IApplicantionMarriage } from "../../../models/types/applicantion.model";
import { ReactNode, useEffect, useState } from "react";
import { Button, DatePicker, Form, Input, Space } from "antd";
import dayjs from "dayjs";
import FormBaseProps from "../../../models/props/FormBaseProps";


interface FormApplicantionMarriageProps extends FormBaseProps {
  codeFamilyStatus: number | undefined,
  buttons?: ReactNode,
  mirrage?: IApplicantionMarriage | null,
}


const FormApplicantionMarriage = (props: FormApplicantionMarriageProps) => {
  const [disabledFormItem, setDisabledFormItem] = useState<boolean>(false);


  const checkFields = () => {
    if (disabledFormItem) {
      props.form.submit();
      return
    }

    const values: IApplicantionMarriage = props.form.getFieldsValue();

    if (
      values.full_name_spouse &&
      values.date_of_birth_spouse &&
      values.date_of_conclusion
    ) {
      props.form.submit();
      return;
    }
  }


  useEffect(() => {
    if (props.codeFamilyStatus === 1 || props.codeFamilyStatus === 4) {
      props.form.resetFields();
      setDisabledFormItem(true);
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
        label="Дата заключения/расторжения брака"
        name="date_of_conclusion"
        initialValue={props.mirrage ? dayjs(props.mirrage.date_of_conclusion) : null}
      >
        <DatePicker
          format={dateFormat}
          disabled={disabledFormItem}
          style={{ width: "100%" }}
          placeholder="Выберите дату"
        />
      </Form.Item>

      <Form.Item
        label="ФИО супруга/супруги"
        name="full_name_spouse"
        initialValue={props.mirrage ? props.mirrage.full_name_spouse : null}
        rules={[
          {
            pattern: new RegExp(/^[А-Я][а-яА-Я\s-]+[а-я]$/),
            message: "ФИО начинается с заглавной буквы"
          }
        ]}
      >
        <Input
          disabled={disabledFormItem}
          placeholder="Введите ФИО супруга/супруги"
        />
      </Form.Item>

      <Form.Item
        label="Дата рождения супруга/супруги"
        name="date_of_birth_spouse"
        initialValue={props.mirrage ? dayjs(props.mirrage.date_of_birth_spouse) : null}
      >
        <DatePicker
          format={dateFormat}
          style={{ width: "100%" }}
          disabled={disabledFormItem}
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


export default FormApplicantionMarriage;