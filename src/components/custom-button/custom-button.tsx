import { Button } from "antd";
import "./custom-button.pcss";
import { MouseEventHandler } from "react";

export type CustomButtonType = {
  onClick: (e: any) => void;
  label: string;
};

export default function CustomButton(props: CustomButtonType) {
  const { onClick, label } = props;
  return (
    <Button className="custom-button text-lg-font-medium" onClick={onClick}>
      {label}
    </Button>
  );
}
