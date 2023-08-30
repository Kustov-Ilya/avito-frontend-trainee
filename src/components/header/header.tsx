import "./header.pcss";
import { Header } from "antd/es/layout/layout";
import logoImage from "@/assets/logo.png";

export default function CustomHeader() {
  return (
    <Header className="custom-header">
      <img src={logoImage} alt="Лого" />
    </Header>
  );
}
