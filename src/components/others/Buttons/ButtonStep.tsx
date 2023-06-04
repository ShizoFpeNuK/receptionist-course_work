import { Button } from "antd";
import { CSSProperties } from "react";


interface ButtonsStepProps {
  onClick: () => void,
  children: string,
  block?: boolean,
  style?: CSSProperties,
}


const ButtonStep = (props: ButtonsStepProps) => {
  return (
    <Button
      className="button_next_step"
      block={props.block ?? true}
      style={props.style}
      type="primary"
      onClick={props.onClick}
    >
      {props.children}
    </Button>
  )
}


export default ButtonStep;