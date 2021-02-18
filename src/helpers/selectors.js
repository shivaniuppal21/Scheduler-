export default function getAppointmentsForDay(state, day) {
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


  
  