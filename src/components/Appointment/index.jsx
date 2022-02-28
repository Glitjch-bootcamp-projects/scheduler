import React from "react";

import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

import useVisualMode from "hooks/useVisualMode";
import { delayStatus } from "helpers/selectors";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";


export default function Appointment(props) {
  const { bookInterview, id, interview } = props;
  console.log("TJ index appointment props", props.interview);

  // when there is an interview, use the hook to transition empty to show.
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )
  
  // creates the object of the interview. Pass into Form component with the arguments
  const save = (name, interviewer) => {
    const interview = {
      student: name,
      interviewer
    };
    bookInterview(id, interview);
    transition(SHOW);
  }


	return (
		<article className='appointment'>
			<Header time={props.time} />
      {mode === SHOW && <Show student={interview.student} interviewer={interview.interviewer}/>}
      {mode === EMPTY &&  <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form
        interviewers={props.interviewers} 
        onCancel={() => back(EMPTY)} 
        onSave={save}
      />}
      {mode === SAVING && <Status message={"Saving"} onComplete={() => delayStatus(transition, SHOW)}/>}
      
		</article>
	);
}
