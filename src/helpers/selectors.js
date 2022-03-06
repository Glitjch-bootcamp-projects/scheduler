export function getAppointmentsForDay(state, day) {
	// matches the day to the state to retrieve appointments
	const appointmentsOfMatchedDay = state.days.filter(
		(filteredDay) => filteredDay.name === day
	)[0];

	// renders the appointment details
	const matchedAppointments = [];
	if (appointmentsOfMatchedDay) {
		appointmentsOfMatchedDay.appointments.map((appointment) =>
			matchedAppointments.push(state.appointments[appointment])
		);
	}
	return matchedAppointments;
};


export function getInterviewersForDay(state, day) {
	// matches the day to the state
	const appointmentsOfMatchedDay = state.days.filter(
		(filteredDay) => filteredDay.name === day
	)[0];

	// renders the interviewers detail from given appointments
	const matchedInterviewers = [];
	if (appointmentsOfMatchedDay) {
		appointmentsOfMatchedDay.interviewers.map((interviewer) =>
			matchedInterviewers.push(state.interviewers[interviewer])
		);
	}
	return matchedInterviewers;
};


export function getInterview(state, interview) {
	if (!interview) {
		return null;
	}
  // re-renders already set interviews (prevents white-screen)
  if (interview.interviewer.id) {
    return interview;
  }
  // replaces the interview's id tag with interviewer detail. 
	interview.interviewer = state.interviewers[interview.interviewer];
	return interview;
};


export function delayStatus(hook, newMode) {
  setTimeout(()=> hook(newMode)
  , 2000);
};