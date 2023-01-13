import React from "react";
import MultipleChoice from "./MultipleChoice";
import FillInTheBlank from "./FillInTheBlank";
import "./Question.css";

export default function Question(props: any) {
  // this defines the properties that should be present on each question
  interface QuestionData {
    type: string;
    page: number;
    config?: Object;
  };

  // this will retrieve the questions default config, add type and page, and pass it to the SurveyBuilder component (up the chain)
  function getConfig(configData: Object) {
    const data: QuestionData = {
      type: props.data.type,
      page: props.data.page,
      config: configData,
    };
    // TODO call a function passed from SurveyBuilder to update the config
  }

  // this will be called in the question, then called a function from Survey to pass new response data up the chain
  function updateResponse(answers: Object) {
    if (props.handleResponse) {
      props.handleResponse(answers, props.index);
    }
  }

  // This function will take the type property of the question object and return the appropriate component, passing the needed data
  function getQuestionType(data: QuestionData) {
    console.log(data);
    switch (data.type) {
      case "MultipleChoice":
        return <MultipleChoice config={data.config} updateResponse={updateResponse}/>;
      case "FillInBlank":
        return <FillInTheBlank config={data.config} updateResponse={updateResponse}/>;
      default:
        return <p>"Unknown Question Type"</p>;
    }
  }

  // Returns the appropriate component
  return <div className="Question">{getQuestionType(props.data)}</div>;
}
