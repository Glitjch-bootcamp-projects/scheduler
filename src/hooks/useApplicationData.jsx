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
    // checks PREVIOUS state for an interview, matched by the CURRENT appointment id.
    if (dayValue.day === day.name && state.appointments[appointment.id].interview !== null) {
      return spot;
    }
    if (dayValue.day === day.name && variable === "addSpots") {
      return spot - 1;
    }
    return spot;
  };
  
  // saves into server database, updates client state, and spot count.
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

  // removes appointment on backend and client; also updating spots count
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