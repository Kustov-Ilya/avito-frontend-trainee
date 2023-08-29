import "./custom-menu.pcss";
import { Menu, MenuProps } from "antd";

const menuItems: MenuProps["items"] = [
  {
    key: "ps",
    label: "Windows games",
    
  },
  {
    key: "browser",
    label: "Browser games",
  },
  {
    key: "mmo",
    label: "MMO games",
  },
];

export default function CustomMenu() {
  return (
    <Menu
      theme="dark"
      mode="horizontal"
      items={menuItems}
      onClick={(e) => {
        e.key;
      }}
      className="custom-menu"
    />
  );
}
