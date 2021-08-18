
import { Container } from '@material-ui/core';
import { Button } from 'antd';
import React from 'react';
import Navbar from '../components/Navbar';
import "../styles/landing.css";

function Landing() {
  return (
    <Container className="land">
      <div className="flex-container">
        <div className="flex-item-left">
          <section className="write">
            <p className="waterloo">
              University of Waterloo
            </p>

            <h1 className="bold-text">
              Study Space Booking System for Software Engineering Students.
            </h1>

            <Button className="viola">Book a Room</Button>

          </section>
        </div>
        <div className="flex-item-right">
          <div className="imustrator">
          </div>
        </div>
    </div>
    </Container>
  )
}

export default Landing