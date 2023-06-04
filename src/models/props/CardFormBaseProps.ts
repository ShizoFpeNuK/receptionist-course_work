import { FormInstance } from "antd";
import CardBaseProps from "./CardBase";


export default interface CardFormBaseProps extends CardBaseProps {
  form: FormInstance<any>,
  onFinish: (values: any) => void,
  onFinishFailed?: (values: any) => void,
}