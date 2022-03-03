import React from "react";

// this component is used to display failed attempts at either creating or deleting an appointment with the appropriate message
export default function Error(props) {
  const { onClose, message } = props;
  return (
    <main className="appointment__card appointment__card--error">
      <section className="appointment__error-message">
        <h1 className="text--semi-bold">Error</h1>
        <h3 className="text--light">{message}</h3>
      </section>
      <img
        className="appointment__error-close"
        src="images/close.png"
        alt="Close"
        onClick={onClose}
      />
    </main>
  );
}
