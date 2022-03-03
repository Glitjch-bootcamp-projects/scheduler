import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
	});

  const setDay = (day) => setState({ ...state, day });
  
  const spotUpdates = (dayValue, day, variable, appointment) =>{
    let spot = day.spots;
    if (dayValue.day === day.name && variable === "removeSpots") {
      return spot + 1;
    }
    // just before setting new state, check the PREVIOUS state of the interview, matched by the CURRENT appointment id.
    // if the interview wasn't null then that implies user is editing an existing appointment. 
    if (dayValue.day === day.name && state.appointments[appointment.id].interview !== null) {
      return spot;
    }
    if (dayValue.day === day.name && variable === "addSpots") {
      return spot - 1;
    }
    return spot;
  };
  
  // saves into server database and updates client state when an appointment is created or editted. Also updates spot count on the side bar 
  const bookInterview = (id, interview) => {

		return axios
			.put(`/api/appointments/${id}`, {
				interview,
			})
			.then(() => {
        const appointment = {
          ...state.appointments[id],
          interview: { ...interview },
        };
        const appointments = {
          ...state.appointments,
          [id]: appointment,
        };

        const newDays = state.days.map((day)=>{
          return {
            ...day,
            spots: spotUpdates(state, day, "addSpots", appointment)
          }
        });

				setState({
					...state,
					appointments,
          days: newDays
				});

      });
	};

  // removes appointment on both backend and front when user confirms a delete, also updating the day's available spots count
	const cancelInterview = (id) => {
		const appointment = {
			...state.appointments[id],
			interview: null,
		};
    const appointments = {
			...state.appointments,
			[id]: appointment,
		};
		return axios
      .delete(`/api/appointments/${id}`)
      .then(() => {
        const newDays = state.days.map((day)=>{
          return {
            ...day,
            spots: spotUpdates( state, day, "removeSpots", appointment)
          }
        })
				setState({
					...state,
					appointments,
          days: newDays
				})

		});
	};

  useEffect(() => {
		const getDaysURL = axios.get(`/api/days`);
		const getAppointmentsURL = axios.get(`/api/appointments`);
		const getInterviewersURL = axios.get(`/api/interviewers`);

		const promises = [getDaysURL, getAppointmentsURL, getInterviewersURL];
		Promise.all(promises).then((all) => {
			setState((prev) => {
				const days = all[0].data;
				const appointments = all[1].data;
				const interviewers = all[2].data;
				return {
					...prev,
					days,
					appointments,
					interviewers,
				};
			});
		});
	}, []);

  return { state, setState, setDay, bookInterview, cancelInterview };
};