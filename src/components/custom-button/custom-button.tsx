import { Button } from 'antd';
import './custom-button.pcss';
import { FC, MouseEventHandler } from 'react';

export type CustomButtonType = {
  onClick: MouseEventHandler<HTMLElement>;
  label: string;
};

const CustomButton: FC<CustomButtonType> = ({ onClick, label }) => (
  <Button className="custom-button text-lg-font-medium" onClick={onClick}>
    {label}
  </Button>
);

export default CustomButton;
