import { useState, useEffect } from "react";
import FilterDropdownGroup from "../components/FilterDropdownGroup";
import BookingModal from "../components/BookingModal";
import axios from "axios";
import exploreStyles from "../styles/explore.module.css";

function Explore() {
  const [room, setRoom] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [capacity, setCapacity] = useState("");

  const [loadingData, setLoadingData] = useState(true);
  const all_bookings_initial = {
    rooms: [{
      name: "Loading Rooms",
    }],
  };
  const [all_bookings, setBookings] = useState(all_bookings_initial);

  useEffect(() => {
    axios.get('http://134.122.43.103:3000/api/rooms').then(res => {
      setBookings(res.data);
      setLoadingData(false);
      console.log(all_bookings);
    });
  }, []);

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
    <>
      {loadingData ? (
        <div>Loading...</div>
      ) : 
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
        <div className={exploreStyles.cardContainer}>
          {console.log(all_bookings)}
          {all_bookings.rooms.map((room, index) =>
            <div>
              <BookingModal name={room.name}/>
            </div>
          )}
        </div>
      </div>
      }
    </>
  );
}

export default Explore;
