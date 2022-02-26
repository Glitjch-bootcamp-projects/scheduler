import React from "react";

import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const SAVING = "SAVING";

export default function Appointment(props) {
  // when there is an interview, use the hook to transition empty to show.
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )
	return (
		<article className='appointment'>
			<Header time={props.time} />
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer}/>}
      {mode === EMPTY &&  <Empty onAdd={() => transition(CREATE)} />}
      {mode === CREATE && <Form interviewers={props.interviewers} onCancel={() => back(EMPTY)} onSave={() => transition(SAVING)}/>}
      {mode === SAVING && <Status message={"Saving"}/>}
      
		</article>
	);
}
