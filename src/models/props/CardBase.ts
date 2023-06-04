import { CSSProperties, ReactNode } from "react";


export default interface CardBaseProps {
  title?: string,
  style?: CSSProperties,
  className?: string;
  children?: ReactNode,
}