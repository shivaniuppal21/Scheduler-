import React, { useEffect, useState } from 'react';
import DayList from "./DayList";
import "components/Application.scss";
import axios from 'axios'
import Appointment from "components/Appointment";

import getAppointmentsForDay from "helpers/selectors"

export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    // you may put the line below, but will have to remove/comment hardcoded appointments variable
    appointments: {}
  });
  
  const setDay = day => setState({ ...state, day });

  useEffect(() => {
    Promise.all([
      axios.get('/api/days'),
      axios.get('/api/appointments'),
      axios.get('/api/interviewers'),
    ]).then((all) => {
      console.log("days", all[0].data); // first
      console.log("appointments", all[1].data); // second
      console.log("interviewers", all[2].data); // third
      setState(prev => ({...prev, days: all[0].data, 
        appointments: all[1].data, 
        interviewers: all[2].data }));
        
      //setDays(all[0].data);
      //setAppointments(dailyAppointments)
      console.log(state)
    });
  },[state])
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  
  const app_schedule = dailyAppointments.map(appointment =>
    {
      return(
        <Appointment key={appointment.id} {...appointment} />
      )
    })
  return (
    <main className="layout">
      <section className="sidebar">
        {/* Replace this with the sidebar elements during the "Project Setup & Familiarity" activity. */}
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
      </section>
      <li className="interviewers__item">
          <img
          className="interviewers__item-image"
          src="https://i.imgur.com/LpaY82x.png"
          alt="Sylvia Palmer"
       />
       Sylvia Palmer
      </li>
    </main>
  );
}
