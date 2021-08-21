import React from "react";
import FilterDropdown from "./FilterDropdown";
import HomeOutlined from "@material-ui/icons/HomeOutlined";
import PersonOutlined from "@material-ui/icons/PersonOutlined";
import { DatePicker, TimePicker, Space, Button } from "antd";
import moment, { MomentInput } from "moment";

function FilterDropdownGroup(props: any) {
  function onRoomChange(room: string) {
    props.onRoomChange(room);
  }

  function onDateChange(date: MomentInput, dateString: string) {
    props.onDateChange(date);
  }

  function onTimeChange(time: MomentInput, timeString: string) {
    props.onTimeChange(time);
  }

  function onCapacityChange(room: string) {
    props.onCapacityChange(room);
  }

  function clearAllFilters() {
    props.onRoomChange("");
    props.onDateChange("");
    props.onTimeChange("");
    props.onCapacityChange("");
  }

  return (
    <div>
      <Space direction="horizontal">
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "flex-start",
          }}
        >
          <Button
            type="link"
            style={{ color: "rgb(0, 0, 0)", cursor: "default" }}
          >
            <b>Filter By:</b>
          </Button>
          <div style={{ marginRight: "10px" }}>
            <FilterDropdown
              category="Room"
              items={["A", "B", "C", "D", "E"]}
              icon={<HomeOutlined />}
              value={props.room}
              onChange={onRoomChange}
            />
          </div>
          <div style={{ marginRight: "10px" }}>
            <DatePicker onChange={onDateChange} value={props.date}/>
          </div>
          <div style={{ marginRight: "10px" }}>
            <TimePicker
              onChange={onTimeChange}
              defaultValue={moment("00:00:00", "HH:mm:ss")}
              value={props.time}
            />
          </div>
          <FilterDropdown
            category="Capacity"
            items={Array.from({ length: 10 }, (_, i) => i + 1)}
            icon={<PersonOutlined />}
            value={props.capacity}
            onChange={onCapacityChange}
          />
          <Button type="text" onClick={clearAllFilters}>
            Clear All
          </Button>
        </div>
      </Space>
    </div>
  );
}

export default FilterDropdownGroup;
