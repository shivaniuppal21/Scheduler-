import React, { useEffect, useState } from 'react';
import DayList from "./DayList";
import "components/Application.scss";
import axios from 'axios'
import Appointment from "components/Appointment";
import useApplicationData from "hooks/useApplicationData";

import { getAppointmentsForDay ,getInterview, getInterviewersForDay }   from "helpers/selectors"


export default function Application(props) {
  const {state, setDay, bookInterview, cancelInterview} = useApplicationData();
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers_schedule  = getInterviewersForDay(state, state.day);

  const app_schedule = dailyAppointments.map(appointment =>
    { //const interview = getInterview(state, appointment.interview)
      return(
        <Appointment  
        key={appointment.id}
        {...appointment}
        id={appointment.id}
        interview = {getInterview(state, appointment.interview)}
        time={appointment.time}
        interviewers={interviewers_schedule}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
      )
  });
      return (
       <main className="layout">
        <section className="sidebar">
          <img
          className="sidebar--centered"
          src="images/logo.png"
        alt="Interview Scheduler"
      />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
        <DayList
        days={state.days}
        day={state.day}
        setDay={setDay}
        
      />
      </nav>
      <img
        className="sidebar__lhl sidebar--centered"
        src="images/lhl.png"
        alt="Lighthouse Labs"
      />
      </section>
      <section className="schedule">
        {
          app_schedule
        }
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
