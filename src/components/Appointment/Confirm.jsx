import React from "react";

import Button from "components/Button";

// This component is used as a precursor visual before use deletes an appointment
export default function Confirm(props) {
  const { onCancel, onDelete } = props;
  return (
    <main className="appointment__card appointment__card--confirm">
      <h1 className="text--semi-bold">{props.message}</h1>
      <section className="appointment__actions">
        <Button onClick={() => onCancel()} danger>Cancel</Button>
        <Button onClick={onDelete} danger>Confirm</Button>
      </section>
    </main>
  );
};
