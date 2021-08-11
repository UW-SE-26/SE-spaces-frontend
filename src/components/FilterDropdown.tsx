import React from "react";
import { Menu, Dropdown, Button } from "antd";
import ArrowDropDownOutlined from '@material-ui/icons/ArrowDropDownOutlined';

function FilterDropdown(props: any) {
  function handleMenuClick(e: any) {
    props.onChange(e.key);
  }

  const menu = (
    <Menu onClick={handleMenuClick}>
      {props.items.map((item: string, index: number) => (
        <Menu.Item key={index} icon={props.icon}>
          {item}
        </Menu.Item>
      ))}
    </Menu>
  );

  return (
    <div>
      <Dropdown overlay={menu}>
        <Button>
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-between",
              alignItems: "stretch",
            }}
          >
            <div>{props.icon}</div>
            <div>
              {props.value ? props.items[props.value] : props.category}{" "}
            </div>
            <div>
              <ArrowDropDownOutlined />
            </div>
          </div>
        </Button>
      </Dropdown>
    </div>
  );
}

export default FilterDropdown;
