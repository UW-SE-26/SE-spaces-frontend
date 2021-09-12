import { useState } from "react";
import { Modal, Button, TimePicker, DatePicker, Select } from "antd"
import MapImage from "../assets/Temp_Map.png"
import bookingStyles from "../styles/booking.module.css"

import { MomentInput } from "moment";

import moment from 'moment';

import { FormOutlined, UserAddOutlined } from "@ant-design/icons";
import HomeOutlined from "@material-ui/icons/HomeOutlined";
import PersonOutlined from "@material-ui/icons/PersonOutlined";
import BuisnessOutlined from "@material-ui/icons/BusinessOutlined"
import axios from "axios";

interface BookedEvent {
  sectionId: string;
  userEmails: string[];
  startsAt: string;
}

//temporary, will be replaced by api call to backend
let recent_guests = ["tswift@uwaterloo.ca","lvuitton@uwaterloo.ca","emusk@uwaterloo.ca", "jbezos@uwaterloo.ca"];

function BookingModal(props: any) {

  const [visible, setVisible] = useState(false);
  const [confirmLoading, setConfirmLoading] = useState(false);

  const [selected_date, setDate] = useState("");
  const [selected_start, setStart] = useState("");
  const [unavailable_hours, setUnavailableHours] = useState([0])
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

    let reformat_date = new Date(selected_date + "T" + selected_start);

    //to be passed to backend
    let booked_event: BookedEvent = {
      sectionId: props.section_id,
      userEmails: selected_guests,
      startsAt: reformat_date.toISOString(),
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

    console.log(booked_event);

    axios.post('http://134.122.43.103:3000/api/bookings/create', booked_event, {
      headers: {
        Authorization: `bearer ${window.sessionStorage.token}`
      }
    }).then(res => {
      console.log(res.data);
    });
    
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
    // in the line below, add code to query the API for times booked (unavailable for further booking) for a given section)
    // setUnavailableHours()

    let cur_day = {
      id: props.section_id,
      date: selected_date_in,
    }

    console.log(cur_day);

    axios.post('http://134.122.43.103:3000/api/sections/queryTimes', cur_day, {
      headers: {
        Authorization: `bearer ${window.sessionStorage.token}`
      }
    }).then(res => {
      console.log("Time Data", res.data);

      let temp_hours = [];
      for(let i = 0; i < 24; i++) {
        temp_hours.push(i);
      }

      for(let i = 0; i < res.data.length; i++) {
        if(!res.data[i].booked) {
          temp_hours.splice(temp_hours.indexOf(res.data[i].startsAt), 1);
        }
      }

      setUnavailableHours(temp_hours);

    });
  }

  function logTime(value_moment_in: MomentInput | null, selected_time_in: string) {
    let hour = moment(value_moment_in).format("HH")
    setStart(hour + ":00:00");
    console.log("Time Selected: ", hour);
  }

  function logGuest(selected_guests_in: string[]) {
    setGuests(selected_guests_in);
    console.log(selected_guests_in);
  }

  return (
    <div>
      <div className={bookingStyles.mainCard} onClick={showModal}>
        <img src={props.images[0]} className={bookingStyles.cardImage}/>
        <h3>{props.name}</h3> 
        {props.room_name} 
        <br/>
        Capacity: {props.capacity}
      </div>
      <Modal
        title={
          <div className={bookingStyles.headerLine}>
            <h2>Booking Space Details</h2>
            <div className={bookingStyles.selectionAttributes}>
              <HomeOutlined></HomeOutlined> Room {props.room_name} &emsp;
              <BuisnessOutlined></BuisnessOutlined> Section {props.name} &emsp;
              <PersonOutlined></PersonOutlined> Capacity {props.capacity} &emsp;
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
                <DatePicker 
                  className={bookingStyles.dataEntry} 
                  size="large" 
                  onChange={logDate}/>
              </div>
              <div className={bookingStyles.genericPadding}>
                <TimePicker 
                  className={bookingStyles.dataEntry} 
                  size="large" 
                  use12Hours 
                  format="h a" 
                  minuteStep={30} 
                  onChange={logTime} 
                  disabledHours={() => unavailable_hours}/>
              </div>
            </div>
            <div className={bookingStyles.genericPadding}>
              <h4>Guests <UserAddOutlined></UserAddOutlined></h4>
              <div className={bookingStyles.genericPadding}>
                <Select 
                  mode="tags" 
                  className={bookingStyles.dataEntry} 
                  size="large" 
                  onChange={logGuest} 
                  tokenSeparators={[',']} 
                  placeholder="Waterloo Email">
                  {guest_keys}
                </Select>
              </div>
            </div>
          </div>
          <div className={bookingStyles.bookingInfo}>
            <img src={props.images[1]} className={bookingStyles.mapSection}/>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default BookingModal;