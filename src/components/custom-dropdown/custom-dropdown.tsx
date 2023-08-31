import './custom-dropdown.pcss';
import { DownOutlined } from '@ant-design/icons';
import { Dropdown, Space, Typography } from 'antd';
import { MenuProps } from 'rc-menu';
import { FC, useCallback, useState } from 'react';

export type ItemsType = { key: string; label: string }[];

export type CustomDropdownProps = {
  items: ItemsType;
  selectedKey: string;
  setSelectedKey: (key: string) => void;
  label: string;
};

const getLabelByKey = (items: ItemsType, key: string) =>
  items?.filter((item) => item?.key == key)[0]?.label;

const CustomDropdown: FC<CustomDropdownProps> = ({
  selectedKey,
  setSelectedKey,
  items,
  label,
}) => {
  const [selectedLabel, setSelectedLabel] = useState(
    getLabelByKey(items, selectedKey),
  );

  const handleClick: MenuProps['onClick'] = useCallback(
    (e: Parameters<NonNullable<MenuProps['onClick']>>[0]) => {
      setSelectedLabel(getLabelByKey(items, e.key));
      setSelectedKey(e.key);
    },
    [setSelectedKey, items],
  );

  return (
    <Dropdown
      menu={{
        items,
        onClick: handleClick,
        selectedKeys: [selectedKey],
      }}
      trigger={['click']}
    >
      <Typography.Link>
        <Space>
          <span className="custom-dropdown__label">{label}</span>
          {selectedLabel}
          <DownOutlined/>
        </Space>
      </Typography.Link>
    </Dropdown>
  );
};

export default CustomDropdown;
