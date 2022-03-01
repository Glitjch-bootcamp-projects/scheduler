import React from "react";

import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";

import useVisualMode from "hooks/useVisualMode";
import { delayStatus } from "helpers/selectors";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";
const CONFIRM = "CONFIRM";
const DELETING = "DELETING";
const EDIT = "EDIT";

export default function Appointment(props) {
  const { bookInterview, id, interview, cancelInterview } = props;


  // when there is an interview, use the hook to transition empty to show.
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  );
  

  // creates the object of the interview. Pass into Form component with the arguments
  const save = (name, interviewer) => {
    transition(SAVING);
    const interview = {
      student: name,
      interviewer: interviewer.id
    };
    bookInterview(id, interview);
  };


  const deleteAppointment = (id) => {
    console.log("TJ deleteappointment");
    // added an additional transition(DELETING BELOW because the actual deleting in db takes a while until it loads the "deleting" form)
    transition(DELETING)
    cancelInterview(id)
      .then(() => {transition(DELETING)})
  }

	return (
		<article className='appointment'>
			<Header time={props.time} />
        {mode === SHOW && <Show 
        student={interview.student} 
        interviewer={interview.interviewer} 
        cancelInterview={() => {transition(CONFIRM)}}
        onEdit={() => {transition(EDIT)}}
      />}
      {mode === EMPTY &&  <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form
        interviewers={props.interviewers} 
        onCancel={() => back(EMPTY)} 
        onSave={save}
      />}
      {mode === SAVING && <Status message={"Saving"} onComplete={() => delayStatus(transition, SHOW)}/>}
      {mode === DELETING && <Status message={"Deleting"} onComplete={() => delayStatus(transition, EMPTY)}/>}
      {mode === CONFIRM && 
        <Confirm message={"Are you fo'shizzle you want to d'lizzle?"} 
        onCancel={back}
        onDelete={() => deleteAppointment(id)}
        />}
      {mode === EDIT && <Form 
        onSave={save}
        onCancel={() => back()}
        interviewers={props.interviewers} 
        student={interview.student}
        interviewer={interview.interviewer}
      />}
      
		</article>
	);
}
