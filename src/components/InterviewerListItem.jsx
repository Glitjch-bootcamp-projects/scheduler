import React from "react";
import classNames from "classnames";

import "components/InterviewerListItem.scss";

// this component generates the individual interviewer display of a row of interviewers, when an appointment form is shown
export default function InterviewerListItem(props) {
  const { name, avatar, selected, setInterviewer } = props;
  
  const style = classNames("interviewers__item", {"interviewers__item--selected": selected});

  return (
    <li className={style} onClick={setInterviewer}>
      <img
        className="interviewers__item-image"
        src={avatar}
        alt={name}
      />
      {selected && name}
    </li>
  );
}
