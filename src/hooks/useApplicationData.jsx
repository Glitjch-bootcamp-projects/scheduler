import { useState, useEffect } from "react";
import axios from "axios";

export default function useApplicationData() {
  const [state, setState] = useState({
		day: "Monday",
		days: [],
		appointments: {},
		interviewers: {},
	});

  // console.log("TJ appt", state.appointments);

  const setDay = (day) => setState({ ...state, day });
  
  const spotUpdates = (dayValue, day, variable, appointment) =>{
    let spot = day.spots;

    if (dayValue.day === day.name && variable === "removeSpots") {
      return spot + 1;
    }
    
    // this one is tricky, returning unmodified spots count. By checking the PREVIOUS state of the interview, matched by the CURRENT appointment id, if the interview wasn't null then that implies user is editing an appointment. 
    if (dayValue.day === day.name && state.appointments[appointment.id].interview !== null) {
      return spot;
    }

    if (dayValue.day === day.name && variable === "addSpots") {
      return spot - 1;
    }
  
    return spot;
  };
  

  const bookInterview = (id, interview) => {
		const appointment = {
			...state.appointments[id],
			interview: { ...interview },
		};
		const appointments = {
			...state.appointments,
			[id]: appointment,
		};
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
        console.log("TJ appointment from bookInterview", appointment.id);
        console.log("TJ appointments from bookInterview", appointments);

        const newDays = state.days.map((day)=>{
          // console.log("TJ appt", appointment);
          // console.log("TJ day", day);
          return {
            ...day,
            spots: spotUpdates( state, day, "addSpots", appointment)
          }
        });

				setState({
					...state,
					appointments,
          days: newDays
				});

      });
	};


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