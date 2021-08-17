import { useState } from "react";
import { Modal, Button, TimePicker, DatePicker, Select } from "antd"
import MapImage from "../assets/Temp_Map.png"
import bookingStyles from "../styles/booking.module.css"
import {MomentInput } from "moment";
import { FormOutlined, UserAddOutlined } from "@ant-design/icons";
import HomeOutlined from "@material-ui/icons/HomeOutlined";
import PersonOutlined from "@material-ui/icons/PersonOutlined";
import BuisnessOutlined from "@material-ui/icons/BusinessOutlined"

interface BookedEvent {
  date: string;
  start: string;
  end: string;
  guests: string[];
}

//temporary, will be replaced by api call to backend
let recent_guests = ["tswift@uwaterloo.ca","lvuitton@uwaterloo.ca","emusk@uwaterloo.ca", "jbezos@uwaterloo.ca"];

function BookingModal() {

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [selected_date, setDate] = useState("");
  const [selected_start, setStart] = useState("");
  const [selected_end, setEnd] = useState("");
  const [selected_guests, setGuests] = useState([""]);

  //keys for dropdown list
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

    //to be passed to backend
    let bookedEvent: BookedEvent = {
      date: selected_date,
      start: selected_start,
      end: selected_end,
      guests: selected_guests,
    };

    //adds the most recently selected to top of list
    for(let i = 0; i < selected_guests.length; i++) {
      const guest = selected_guests[i];
      let guestIndex = recent_guests.indexOf(guest);
      if(guestIndex == -1) {
        recent_guests.unshift(guest);
      }
      else {
        recent_guests.splice(guestIndex, 1);
        recent_guests.unshift(guest);
      }
    }

    console.log(bookedEvent);

    setTimeout(() => {
      setVisible(false);
      setConfirmLoading(false);
    }, 1000);
  };

  function handleCancel() {
    setVisible(false);
  };

  function logDate(value_moment_in: MomentInput, selected_date_in: string) {
    setDate(selected_date_in);
    console.log(selected_date_in);
  }

  function logTime(value_moment_in: [MomentInput, MomentInput] | null, selected_time_in: [string, string]) {
    setStart(selected_time_in[0]);
    setEnd(selected_time_in[1]);
    console.log(selected_time_in[0], "->", selected_time_in[1]);
  }

  function logGuest(selected_guests_in: string[]) {
    setGuests(selected_guests_in);
    console.log(selected_guests_in);
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
                  <DatePicker style={{boxShadow:"0px 2px 18px rgba(158, 158, 158, 0.5)"}} size="large" onChange={logDate}/>
                </div>
                <div className={bookingStyles.genericPadding}>
                  <TimePicker.RangePicker style={{width: "100%", boxShadow:"0px 2px 18px rgba(158, 158, 158, 0.5)"}} size="large" use12Hours format="h:mm a" minuteStep={30} onChange={logTime}/>
                </div>
              </div>
              <div className={bookingStyles.genericPadding}>
                <h4>Guests <UserAddOutlined></UserAddOutlined></h4>
                <div className={bookingStyles.genericPadding}>
                  <Select mode="tags" style={{width: "100%", boxShadow:"0px 2px 18px rgba(158, 158, 158, 0.5)"}} onChange={logGuest} tokenSeparators={[',']} placeholder="Waterloo Email">
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

export default BookingModal;