import React, { useEffect, useState } from 'react';
import DayList from "./DayList";
import "components/Application.scss";
import axios from 'axios'
import Appointment from "components/Appointment";

import { getAppointmentsForDay ,getInterview, getInterviewersForDay }   from "helpers/selectors"


export default function Application(props) {
  const [state, setState] = useState({
    day: "Monday",
    days: [],
    appointments: {},
    interviewers: {}
  });
  const setDay = day => setState({ ...state, day });
  const dailyAppointments = getAppointmentsForDay(state, state.day);
  const interviewers_schedule  = getInterviewersForDay(state, state.day);

  function bookInterview(id, interview) {
   // console.log(id, interview);
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(`/api/appointments/${id}`, {interview})
    .then(()=>{
      setState({
        ...state,
        appointments
      });
    })//.catch(()=>console.log("Put error"));
  };

  function cancelInterview(id) {
    const appointment = {
     ...state.appointments[id],
     interview: null};
     const appointments = {
      ...state.appointments,
      [id]: appointment
    };
     return axios.delete(`/api/appointments/${id}`)
    .then(()=> {
      setState({
        ...state,
        appointments
      });
    })//.catch(()=>console.log("Put error"));
  }

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
      //console.log(state)
    });
  },[state])
  
  const app_schedule = dailyAppointments.map(appointment =>
    { const interview = getInterview(state, appointment.interview)

      return(
        <Appointment  
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
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
