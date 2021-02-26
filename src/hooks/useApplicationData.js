import React, { useEffect, useState } from 'react';
import axios from 'axios'
import {getNewSpotsForDays} from "../helpers/selectors";

export default function useApplicationData(props) {
  //updates state object
    const [state, setState] = useState({
      day: "Monday",
      days: [],
      appointments: {},
      interviewers: {}
    });
      //updates state for day
    const setDay = day => setState({ ...state, day });
    useEffect(() => {
      Promise.all([
        axios.get('/api/days'),
        axios.get('/api/appointments'),
        axios.get('/api/interviewers'),
      ]).then((all) => {
        
        setState(prev => ({...prev, days: all[0].data, 
          appointments: all[1].data, 
          interviewers: all[2].data }));
        
      });
    },[])
    
  //books or updates an interview, updates db and state
    function bookInterview(id, interview) {
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
          //prev is the most upto date version of the state and avoid stale
        setState(prev=>({
          ...prev,
          appointments,
          days: newDays
        }))
      })//.catch(()=>console.log("Put error"));
    };
  //cancels an interview, updates db and state
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
     //returns an object with 4 keys
    return {
      state,
      setDay,
      bookInterview,
      cancelInterview
    };
  }
  