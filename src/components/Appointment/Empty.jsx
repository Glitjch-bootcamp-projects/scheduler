import React from "react";

// this component is used as placeholders for any appointment slots that have no interview with the option to add one.
export default function Empty(props) {
  return (
    <main className="appointment__add" onClick={props.onAdd} data-testid="add-button">
      <img className="appointment__add-button" src="images/add.png" alt="Add" />
    </main>
  );
}
