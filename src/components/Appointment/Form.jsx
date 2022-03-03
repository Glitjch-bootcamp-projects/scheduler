import React, { useState } from "react";

import Button from "components/Button";
import InterviewerList from "components/InterviewerList";

// this component is the intake form rendered after user clicks on an empty appointment, providing option to fill and save one.
// It also doubles up as an edit form where user can modify an already-made appointment.
export default function Form(props) {
	const [name, setName] = useState(props.name || "");
	const [interviewer, setInterviewer] = useState(props.interviewer || null);
  const [error, setError] = useState("");

  function reset () {
    setName("");
    setInterviewer(null);
  };

  function cancel () {
    reset();
    props.onCancel();
  }


  // this validate function prevents incomplete form submissions while updating the database and painting otherwise
  function validate() {
    if (name === "" && interviewer === null) {
      setError("Student name AND interviewer cannot be blank");
      return;
    }
    if (name === "") {
      setError("Student name cannot be blank");
      return;
    }
    if (interviewer === null) {
      setError("Interviewer cannot be blank");
      return;
    }
  
    setError("");
    props.onSave(name, interviewer);
  }

  const onSubmit = (event) => {event.preventDefault()};
  
	return (
		<main className='appointment__card appointment__card--create'>
			<section className='appointment__card-left'>
				<form autoComplete='off' onSubmit={onSubmit}>
					<input
						className='appointment__create-input text--semi-bold'
						name="name"
						type='text'
						placeholder="Enter Student Name"
						value={name}
            onChange={(event) => setName(event.target.value)}
            data-testid="student-name-input"
					/>
				</form>
          <section className="appointment__validation">{error}</section>
				<InterviewerList
					value={interviewer}
					interviewers={props.interviewers}
          onChange={setInterviewer}
				/>
			</section>
			<section className='appointment__card-right'>
				<section className='appointment__actions'>
					<Button danger onClick={cancel}>
						Cancel
					</Button>
					<Button confirm onClick={validate}>
						Save
					</Button>
				</section>
			</section>
		</main>
	);
}
