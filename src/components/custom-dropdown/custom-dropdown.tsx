import "./custom-dropdown.pcss";
import { DownOutlined } from "@ant-design/icons";
import { Dropdown, Space, Typography } from "antd";
import { useState } from "react";

export type ItemsType = { key: string; label: string }[];

function getLabelByKey(items: ItemsType, key: string) {
  return items?.filter((item) => item?.key == key)[0]?.label;
}

export type CustomDropdownProps = {
  items: ItemsType;
  selectedKey: string;
  setSelectedKey: (key: string) => void;
  label: string;
};

export default function CustomDropdown(props: CustomDropdownProps) {
  const { selectedKey, setSelectedKey, items, label } = props;
  const [selectedLabel, setSelectedLabel] = useState(
    getLabelByKey(items, selectedKey)
  );

  return (
    <Dropdown
      menu={{
        items,
        onClick: (e) => {
          setSelectedLabel(getLabelByKey(items, e.key));
          setSelectedKey(e.key);
        },
        selectedKeys: [selectedKey],
      }}
      trigger={["click"]}
    >
      <Typography.Link>
        <Space>
          <span className="custom-dropdown__label">{label}</span>
          {selectedLabel}
          <DownOutlined />
        </Space>
      </Typography.Link>
    </Dropdown>
  );
}
