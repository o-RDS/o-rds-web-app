import React from "react";
import CheckboxConfig from "./CheckboxConfig";
import FillBlankConfig from "./FillBlankConfig";
import ShortAnswerConfig from "./ShortAnswerConfig";
import MCConfig from "./MCConfig";

export default function QuestionConfig(props: any) {
  function getQuestionConfig(data: any) {
    try {
      switch (data.type) {
        case "MultipleChoice":
          return (
            <MCConfig
              config={data}
              index={props.index}
              otherIndex={props.otherIndex}
            />
          );
        case "FillInBlank":
          return (
            <FillBlankConfig
              config={data}
              index={props.index}
              otherIndex={props.otherIndex}
            />
          );
        case "ShortAnswer":
          return (
            <ShortAnswerConfig
              config={data}
              index={props.index}
              otherIndex={props.otherIndex}
            />
          );
        case "Checkbox":
          return (
            <CheckboxConfig
              config={data}
              index={props.index}
              otherIndex={props.otherIndex}
            />
          );
        default:
          return <p>"Unknown Question Type"</p>;
      }
    } catch (error) {
      console.log(error);
    }
  }

  return <>{getQuestionConfig(props.data)}</>;
}
