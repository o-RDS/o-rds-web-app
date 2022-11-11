import React from "react";
import MultipleChoice from "./MultipleChoice";

export default function Question(props: any) {
  // I may move all configurable properties into an object for easier passing and typing
  interface QuestionData {
    type: string;
    config?: Object;
  }

  // This function will take the type property of the question object and return the appropriate component, passing the needed data
  function getQuestionType(data: QuestionData) {
    switch (data.type) {
      case "MultipleChoice":
        return <MultipleChoice data={data.config}/>;
      default:
        return <p>"Unknown Question Type"</p>;
    }
  }

  // Returns the appropriate component
  return <div>{getQuestionType(props.data)}</div>;
}
