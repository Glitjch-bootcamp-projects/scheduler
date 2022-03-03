import React from "react";
import classNames from "classnames";

import "components/Button.scss";

// this component is used for Save, Delete, Edit, Confirm, and Cancel
export default function Button(props) {
  let buttonClass = classNames(
    "button",
    { "button--confirm": props.confirm },
    { "button--danger": props.danger }
  );

  return (
    <button
      className={buttonClass}
      onClick={props.onClick}
      disabled={props.disabled}
    >
      {props.children}
    </button>
  );
}
