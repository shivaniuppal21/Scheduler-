import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {getNewSpotsForDays} from "helpers/selectors";

export default function useApplicationData(props) {
    const [state, setState] = useState({
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {}
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
        //console.log(state)
      });
    },[state])
    
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
      const newState = {...state, appointments};
      const newDays = getNewSpotsForDays(newState, id);
      return axios.put(`/api/appointments/${id}`, {interview})
      .then(()=>{
        setState(prev=>({
          ...prev,
          appointments,
          days: newDays
        }))
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
      const newState = {...state, appointments};
      const newDays = getNewSpotsForDays(newState, id);
       return axios.delete(`/api/appointments/${id}`)
      .then(()=> {
        //setState({
          //...state,
          //appointments
          setState(prev=>({
            ...prev,
            appointments,
            days: newDays
        }));
      })//.catch(()=>console.log("Put error"));
    }
    return {
      state,
      setDay,
      bookInterview,
      cancelInterview
    };
  }
  