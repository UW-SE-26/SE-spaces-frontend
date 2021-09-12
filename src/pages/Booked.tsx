import React from 'react'
import { Card, Col, Row, Button, Tag} from "antd"
import {Typography} from "antd"
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import EventNoteIcon from '@material-ui/icons/EventNote';
import MeetingRoomIcon from '@material-ui/icons/MeetingRoom';
import PersonIcon from '@material-ui/icons/Person';
import { useState, useEffect } from "react";
import axios from 'axios';

const {Title} = Typography
const iconStyle = {width: "18px", height: "18px", marginRight: "10px", color: "#6C6C6C"}

let bookedEvents = [
    {
      booker: true,
      timeBlock: { users: ["steve", "joe"], booker: "jeff", sectionId: "61398a38893e2c6799974f7a", startsAt: new Date("2021-9-15T13:00:00.000Z") }
    },
    {
      booker: false,
      timeBlock: { users: ["steve2", "joe2"], booker: "jeff2", sectionId: "61398a38893e2c6799974f7a", startsAt: new Date("2021-9-15T14:00:00.000Z") }
    },
    {
      booker: true,
      timeBlock: { users: ["steve3", "joe3"], booker: "jeff3", sectionId: "61398a38893e2c6799974f7a", startsAt: new Date("2021-9-15T15:00:00.000Z") }
    }
];


function Booked() {

  
  const [section_names, setNames] = useState([""]);
  const [loadingData, setLoadingData] = useState(true);

  let sectionNames = ["test"];
  sectionNames.pop();

  async function getData() {
    console.log("Token: " + window.sessionStorage.token);
    await axios.get('http://134.122.43.103:3000/api/bookings', {
      headers: {
        Authorization: `bearer ${window.sessionStorage.token}`
      }
    }).then(res => {
    console.log("/api/bookings result:", res)
    bookedEvents = res.data;

  });

    for(let i = 0; i < bookedEvents.length; i++) {
      //let roomId;
      console.log(window.sessionStorage.token);
      await axios.get(`http://134.122.43.103:3000/api/sections/${bookedEvents[i].timeBlock.sectionId}`, {
        headers: {
          Authorization: `bearer ${window.sessionStorage.token}`
        }
      }).then(res => {
        sectionNames.push(res.data.name);
        setNames(sectionNames)
        console.log(res.data);
      });
      console.log(section_names);
    }
  }

  useEffect(() => {

    getData();
    setLoadingData(false);

  }, []);
  

  


  return (
    <>
      {loadingData ? (
        <div>Loading...</div>
      ) : 
      <div style={{height: "calc(100vh - 56px)", width: "100vw", padding: "70px"}}>
        <Title level={2} style={{marginBottom: "40px"}}> Booked Spaces</Title>
        <Row gutter={[16, { xs: 8, sm: 16, md: 24, lg: 32 }]} justify="start">
          <Col xs={24} sm={24} md={12} lg={8} xxl={4} >
            {bookedEvents.map((cur_booking, index) =>
              <Card style={{backgroundColor: "white", boxShadow: "0px 2px 20px rgba(158, 158, 158, 0.2)", width: "300px"}} bordered={false}>
                <div style={{display: "flex", flexDirection: "column", justifyContent: "space-evenly"}}>
                  <div>
                    <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between"}}>
                      <Title level={5} style={{marginBottom: "5px"}}>Section {section_names[index]}</Title>
                      <p style={{color: "#BB78FE", cursor: "pointer"}}>Cancel</p>
                    </div>
                    
                    <div style={{display: "flex", flexDirection: "row", marginBottom: "25px"}}>
                      <MeetingRoomIcon style={{...iconStyle, marginRight: "5px"}}/>
                      <p style={{margin: 0, color: "#6C6C6C", fontSize: "13px", marginRight: "10px"}}>Room 10</p>
                      
                      <PersonIcon style={{...iconStyle, marginRight: "5px"}}/>
                      <p style={{margin: 0, color: "#6C6C6C", fontSize: "13px"}}>20</p>
                    </div>
                    
                  </div>
                  <div style={{display: "flex", justifyContent: "center", flexDirection: "column", marginBottom: "25px"}}>
                    <div style={{display: "flex", flexDirection: "row"}}>
                      <EventNoteIcon style={iconStyle}/>
                      <p style={{margin: 0, marginBottom: "5px"}}>August 12th, 2021</p>
                    </div>
                    <div style={{display: "flex", flexDirection: "row"}}>
                      <AccessTimeIcon style={iconStyle}/>
                      <p style={{margin: 0}}>6:20 pm EST</p>
                    </div>
                  </div>

                  <div style={{display: "flex", flexDirection: "row"}}>
                      <PersonIcon style={iconStyle}/>
                      <Tag color="#C694FF">John Smith</Tag>
                      <Tag color="#C694FF">John Smith</Tag>
                      
                  </div>

                
                </div>
              </Card>
            )}
          </Col>
          
        </Row>
      </div>
      }
    </>
  )
}

export default Booked
