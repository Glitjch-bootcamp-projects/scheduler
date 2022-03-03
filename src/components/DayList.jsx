import React from "react";
import DayListItem from "./DayListItem";

// this component represents the five weekdays displayed on the side bar
export default function DayList (props) {
  const dayOfTheWeek = (props.days).map(
      day => 
        <DayListItem 
          {...day} 
          key={day.id}
          selected={day.name === props.value}
          setDay={props.onChange}
        />
    );

  return (
    <ul>
      {dayOfTheWeek}
    </ul>
  );
}

