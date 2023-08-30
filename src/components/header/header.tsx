import './header.pcss';
import { Header } from 'antd/es/layout/layout';
import logoImage from '@/assets/logo.png';
import { FC } from 'react';

const CustomHeader: FC = () => (
  <Header className="custom-header">
    <img src={logoImage} alt="Лого"/>
  </Header>
);

export default CustomHeader;
