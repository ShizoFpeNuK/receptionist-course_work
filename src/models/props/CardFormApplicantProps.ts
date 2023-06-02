import { FormInstance } from "antd";
import { CSSProperties, ReactNode } from "react";


export default interface CardFormBaseProps {
  title?: string,
  style?: CSSProperties,
  className?: string;
  form: FormInstance<any>,
  onFinish: (values: any) => void,
  onFinishFailed?: (values: any) => void,
  children?: ReactNode,
}