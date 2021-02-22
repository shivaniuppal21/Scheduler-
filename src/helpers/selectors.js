export function getAppointmentsForDay(state, day) {
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


    export function getInterview(state, interview) {

            if (!interview) {
        return null;
      }
    
      const interviewerInfo = state.interviewers[interview.interviewer];
      return {
        student: interview.student,
        interviewer: interviewerInfo
      }    
    }

    export function getInterviewersForDay(state, day) {
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

     export function getNewSpotsForDays(state, id){
      const foundDay = state.days.find(day => day.appointments.includes(id));
      console.log("foundDay: ", foundDay);
      const newDays = state.days.map(day=>{
        if (day.id === foundDay.id){
          return {
            ...day,
            //calculating the length of array
            spots: day.appointments.filter(id=>state.appointments[id].interview === null).length
          }
        } else{
          //day is an obj
          return day;
        }
      });
      return newDays;
    };

// module.exports = { getAppointmentsForDay, getInterview ,getInterviewersForDay, getNewSpotsForDays};

  
  