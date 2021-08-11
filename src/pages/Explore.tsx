import { useState, useEffect } from "react";
import FilterDropdownGroup from "../components/FilterDropdownGroup";
import BookingModal from "../components/BookingModal";

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
      <BookingModal></BookingModal>
    </div>
  );
}

export default Explore;
