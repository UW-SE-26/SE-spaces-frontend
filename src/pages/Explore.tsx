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
      _id: -1,
      name: "Loading Sections",
      capacity: -1,
    }],
  };

  const names_initial = [""];
  
  const images_initial = [[""]];

  //const [section_ids, setSectionIDs] = useState([""]);
  const [all_sections, setSections] = useState(all_sections_initial);
  const [room_names, setNames] = useState(names_initial);
  const [room_images, setImages] = useState(images_initial);
  //const [shown_sections, updateSections] = useState(all_sections_initial);

  useEffect(() => {
    console.log("Token: " + window.sessionStorage.token);
    axios.get('http://134.122.43.103:3000/api/rooms', {
      headers: {
        Authorization: `bearer ${window.sessionStorage.token}`
      }
    }).then(res => {
      console.log("/api/rooms result:", res)

      let temp_sections = all_sections_initial;
      let temp_names = names_initial;
      let temp_images = images_initial;

      temp_sections.sections.pop();
      temp_names.pop();
      temp_images.pop();
      for(let i = 0; i < res.data.rooms.length; i++) {
        for(let j = 0; j < res.data.rooms[i].sections.length; j++) {
          temp_sections.sections.push(res.data.rooms[i].sections[j]);
          temp_names.push(res.data.rooms[i].name);
          temp_images.push(res.data.rooms[i].images);
          console.log(temp_images);
        }
      }

      setSections(temp_sections);
      setNames(temp_names);
      setImages(temp_images);
      console.log(room_images);

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
          {all_sections.sections.map((section, index) =>
            <div>
              <BookingModal
                section_id={section._id}
                name={section.name}
                room_name={room_names[index]}
                capacity={section.capacity}
                images={room_images[index]}
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
