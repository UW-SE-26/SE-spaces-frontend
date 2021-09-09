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
      schedule: [],
      sections: [],
    }],
  };

  const [all_bookings, setBookings] = useState(all_bookings_initial);
  const [shown_bookings, updateBookings] = useState(all_bookings_initial);

  const all_sections_initial = {
    sections: [{
      id: -1,
      name: "Loading Sections",
    }],
  };

  const [section_ids, setSectionIDs] = useState([""])
  const [all_sections, setSections] = useState(all_sections_initial);
  const [shown_sections, updateSections] = useState(all_sections_initial);

  useEffect(() => {
    axios.get('http://134.122.43.103:3000/api/rooms').then(res => {
      console.log("/api/rooms result:", res)
      let sectionID_list: string[] = []
      for(let i=0; i<res["data"]["rooms"].length; i++){
        let partial_section_list: string[] = res["data"]["rooms"][i]["sections"]
        for(let j=0; j<partial_section_list.length; j++){
          sectionID_list.push(partial_section_list[j])
        }
      }
      console.log("Sections List:", sectionID_list)
      setSectionIDs(sectionID_list)
      setBookings(res.data);
      updateBookings(res.data);
    });

    setLoadingData(false);
    console.log(shown_bookings);

  }, []);

  function updateCards() {
    console.log("updateCards called");
    let updated_bookings = all_bookings;

    for(let i = 0; i < updated_bookings.rooms.length; i++) {
      
    }
  }

  useEffect(() => {
    if (room || date || time || capacity) {
      console.table({room: room, date: date, time: time, capacity: capacity});
      updateCards();
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
          {section_ids.map((section, index) =>
            <div>
              <BookingModal
                key={section}
                name={section}
              />
            </div>
          )}
        </div>
      </div>
      }
    </>
  );
}

export default Explore;
