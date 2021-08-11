import React, { useState, useEffect } from "react";
import FilterDropdownGroup from "../components/FilterDropdownGroup";
import { Modal, Button, TimePicker, DatePicker, Select } from "antd"
import MapImage from "../assets/Temp_Map.png"
import bookingStyles from "../styles/booking.module.css"
import { MomentInput } from "moment";
import logo192 from '../assets/SE_Logo_192.png';
import { FormOutlined, KeyOutlined, TeamOutlined, UserAddOutlined } from "@ant-design/icons";
import HomeOutlined from "@material-ui/icons/HomeOutlined";
import PersonOutlined from "@material-ui/icons/PersonOutlined";
import BuisnessOutlined from "@material-ui/icons/BusinessOutlined"

let recent_guests = ["tswift@uwaterloo.ca","lvuitton@uwaterloo.ca","emusk@uwaterloo.ca", "jbezos@uwaterloo.ca"];

function BookingButton() {
  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  let guest_keys = [];
  for(let i = 0; i < recent_guests.length; i++) {
    let guest = recent_guests[i];
    guest_keys.push(<Select key = {guest}>{guest}</Select>)
    //guest_keys.push(<Select key = {guest}>{guest.substr(0, guest.indexOf("@"))}</Select>)
  }

  function showModal() {
    setVisible(true);
  };

  function handleOk() {
    setConfirmLoading(true);
    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 1000);
  };

  function handleCancel() {
    setVisible(false);
  };

  function logDate(value_moment: MomentInput, selected_date: string) {
    setDate(selected_date);
    console.log(selected_date);
  }

  function logTime(value_moment: MomentInput, selected_time: string) {
    setTime(selected_time);
    console.log(selected_time);
  }

  function logGuest(selected_guest: string) {
    //recent_guests.unshift(selected_guest);
    console.log(selected_guest);
  }

  return (
    <div>
      <Button type="primary" onClick={showModal}>
        Book this space
      </Button>
      <Modal
        title={
          <div className={bookingStyles.headerLine}>
            <h2>Booking Space Details</h2>
            <div className={bookingStyles.selectionAttributes}>
              <HomeOutlined></HomeOutlined> Room 123 &emsp;
              <BuisnessOutlined></BuisnessOutlined> Section 22 &emsp;
              <PersonOutlined></PersonOutlined> Capacity 8 &emsp;
            </div>
          </div>
        }
        visible={visible}
        onOk={handleOk}
        confirmLoading={confirmLoading}
        onCancel={handleCancel}
        width={1000}
        footer={[
          <Button key="back" type="text" onClick={handleCancel}>
            Cancel Booking
          </Button>,
          <Button key="submit" type="primary" loading={confirmLoading} onClick={handleOk}>
            Book Space
          </Button>,
        ]}
      >
        <div className={bookingStyles.mainContainer}>
            <div className={bookingStyles.bookingInfo}>
              <div className={bookingStyles.genericPadding}>
                <h4>Set Booking Time <FormOutlined></FormOutlined></h4>
                <div className={bookingStyles.genericPadding}>
                  <DatePicker style={{boxShadow:"0px 0px 5px gray"}} size="large" onChange={logDate}/>
                </div>
                <div className={bookingStyles.genericPadding}>
                  <TimePicker style={{boxShadow:"0px 0px 5px gray"}} size="large" use12Hours format="h:mm a" minuteStep={30} onChange={logTime}/>
                </div>
              </div>
              <div className={bookingStyles.genericPadding}>
                <h4>Guests <UserAddOutlined></UserAddOutlined></h4>
                <div className={bookingStyles.genericPadding}>
                  <Select mode="tags" style={{width: "100%", boxShadow:"0px 0px 5px gray"}} onChange={logGuest} tokenSeparators={[',']} placeholder="Waterloo Email">
                    {guest_keys}
                  </Select>
                </div>
              </div>
            </div>
            <div>
              <img src={MapImage} className={bookingStyles.mapSection}/>
            </div>
          </div>
      </Modal>
    </div>
  );
}

function Explore() {
  const [room, setRoom] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [capacity, setCapacity] = useState("");

  useEffect(() => {
    if (room || date || time || capacity) {
      console.table({room: room, date: date, time: time, capacity: capacity});
    } else {
      console.log("No filters selected");
    }
  }, [room, date, time, capacity]);

  function handleRoomChange(updated_room: string) {
    setRoom(updated_room);
  }

  function handleDateChange(updated_date: string) {
    setDate(updated_date);
  }

  function handleTimeChange(updated_time: string) {
    setTime(updated_time);
  }

  function handleCapacityChange(updated_capacity: string) {
    setCapacity(updated_capacity);
  }

  return (
    <div>
      <div>
        <FilterDropdownGroup
          room={room}
          date={date}
          time={time}
          capacity={capacity}
          onRoomChange={handleRoomChange}
          onDateChange={handleDateChange}
          onTimeChange={handleTimeChange}
          onCapacityChange={handleCapacityChange}
        />
      </div>
      <BookingButton></BookingButton>
    </div>
  );
}

export default Explore;
