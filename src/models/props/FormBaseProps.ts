import { FormInstance } from "antd";


export default interface FormBaseProps {
  form: FormInstance<any>,
  onFinish: (values: any) => void,
  onFinishFailed?: (values: any) => void,
}