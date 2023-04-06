import React from "react";

export default function SurveyitemComplete(props: any) {
  if (props.done) {
    return (
      <div className="text-green-500">
        <p>✔ {props.item}</p>
      </div>
    );
  } else {
    return (
      <div className="text-red-500">
        <p>X {props.item}</p>
      </div>
    );
  }
}
