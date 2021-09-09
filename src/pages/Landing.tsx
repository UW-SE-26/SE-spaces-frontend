
import { Container } from '@material-ui/core';
import { Button } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';
import landingStyles from "../styles/landing.module.css";

function Landing() {
  return (
    <Container className={landingStyles.wrapper}>
      <div className={landingStyles.flexContainer}>
        <div className={landingStyles.flexItemLeft}>
          <section className={landingStyles.content}>
            <p className={landingStyles.subText}>
              University of Waterloo
            </p>

            <h1 className={landingStyles.boldText}>
              Study Space Booking System for Software Engineering Students.
            </h1>

            <Button className={landingStyles.viola}>
              <Link to="/explore">Book a Room</Link>
            </Button>

          </section>
        </div>
        <div className={landingStyles.flexItemRight}>
          <div className={landingStyles.imustrator}>
          </div>
        </div>
    </div>
    </Container>
  )
}

export default Landing