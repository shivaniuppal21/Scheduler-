    function getAppointmentsForDay(state, day) {
   // const filteredNames = state.users.filter(user => user.name === name);
   // return filteredNames;
   const filtereddays = state.days.filter(filterday => filterday.name === day);
   if (filtereddays.length < 1){
    return []
}
    const AppointmentArray = filtereddays[0].appointments;

    const app_schedule = AppointmentArray.map(appointment =>
        {
          return(
            state.appointments[appointment]
          )
        })

        return app_schedule

  }


    function getInterview(state, interview) {

            if (!interview) {
        return null;
      }
    
      const interviewerInfo = state.interviewers[interview.interviewer];
      return {
        student: interview.student,
        interviewer: interviewerInfo
      }    
    }

    function getInterviewersForDay(state, day) {
      // const filteredNames = state.users.filter(user => user.name === name);
      // return filteredNames;
      const filtereddays = state.days.filter(filterday => filterday.name === day);
      if (filtereddays.length < 1){
       return []
   }
       const InterviewerArray = filtereddays[0].interviewers;
       console.log(state)
   
       const interviwers_schedule = InterviewerArray.map( interviewer =>
           {
             return(
               state.interviewers[interviewer]
             )
           })
   
           return interviwers_schedule
   
     }

module.exports = { getAppointmentsForDay, getInterview ,getInterviewersForDay};

  
  