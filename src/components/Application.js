import React from 'react';
import DayList from "./DayList";
import "./Application.scss";
import Appointment from "./Appointment";
import useApplicationData from "../hooks/useApplicationData";

import { getAppointmentsForDay, getInterview, getInterviewersForDay }   from "../helpers/selectors"


export default function Application() {
  //state helps to keep data to application component which is sent as props to children 
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
        //passing bookInterview as props to Appointment component
        bookInterview={bookInterview}
         //passing cancelInterview as props to Appointment component
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
