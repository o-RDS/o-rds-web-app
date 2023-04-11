import React from "react";
import MultipleChoice from "./MultipleChoice";
import FillInTheBlank from "./FillInTheBlank";
import ShortAnswer from "./ShortAnswer";
import Checkbox from "./Checkbox";

export default function Question(props: any) {
  // this defines the properties that should be present on each question
  interface QuestionData {
    type: string;
    require: boolean;
    page: number;
    id: any;
    config?: Object;
  }

  // this will retrieve the questions default config, add type and page, and pass it to the SurveyBuilder component (up the chain)
  function getConfig(configData: Object) {
    const data: QuestionData = {
      type: props.data.type,
      require: props.data.require,
      page: props.data.page,
      config: configData,
      id: props.data.id,
    };
    // TODO call a function passed from SurveyBuilder to update the config
  }

  // this will be called in the question, then called a function from Survey to pass new response data up the chain
  function updateResponse(answers: Object) {
    if (props.handleResponse) {
      props.handleResponse(answers, props.id);
    }
  }

  // This function will take the type property of the question object and return the appropriate component, passing the needed data
  function getQuestionType(data: QuestionData) {
    // console.log(data);
    // console.log(props.currentValue);
    switch (data.type) {
      case "MultipleChoice":
        return (
          <MultipleChoice
            config={data.config}
            updateResponse={updateResponse}
            currentValue={props.currentAnswer}
            index={props.index}
            require={data.require}
            id={props.id}
          />
        );
      case "FillInBlank":
        return (
          <FillInTheBlank
            config={data.config}
            updateResponse={updateResponse}
            currentValue={props.currentAnswer}
            index={props.index}
            require={data.require}
            id={props.id}
          />
        );
      case "ShortAnswer":
        return (
          <ShortAnswer
            config={data.config}
            updateResponse={updateResponse}
            currentValue={props.currentAnswer}
            index={props.index}
            require={data.require}
            id={props.id}
          />
        );
      case "Checkbox":
        return (
          <Checkbox
            config={data.config}
            updateResponse={updateResponse}
            currentValue={props.currentAnswer}
            index={props.index}
            require={data.require}
            id={data.id}
          />
        );
      default:
        return <p>"Unknown Question Type"</p>;
    }
  }

  // Returns the appropriate component
  return (
    <div className="rounded-md border-t-2 border-t-rdsOrange bg-white p-4 shadow-sm shadow-black">
      {getQuestionType(props.data)}
    </div>
  );
}
