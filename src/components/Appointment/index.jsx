import React from "react";

import "components/Appointment/styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

import useVisualMode from "hooks/useVisualMode";

const EMPTY = "EMPTY";
const SHOW = "SHOW";

export default function Appointment(props) {
  // when there is an interview, use the hook to transition empty to show.
  const { mode, transition, back } = useVisualMode(
    props.interview ? SHOW : EMPTY
  )
	return (
		<article className='appointment'>
			<Header time={props.time} />
      {mode === SHOW && <Show student={props.interview.student} interviewer={props.interview.interviewer}/>}
      {mode === EMPTY &&  <Empty onAdd={() => console.log("Clicked onAdd")} />}
			{/* {props.interview ? <Show student={props.interview.student} interviewer={props.interview.interviewer}/> : <Empty />} */}
		</article>
	);
}
