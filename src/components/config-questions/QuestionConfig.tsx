import React from "react";
import CheckboxConfig from "./CheckboxConfig";
import FillBlankConfig from "./FillBlankConfig";
import ShortAnswerConfig from "./ShortAnswerConfig";
import MCConfig from "./MCConfig";

export default function QuestionConfig(props: any) {
  function dealWithChange(newQuestion: any, index: any) {
    props.changeQuestion(newQuestion, index);
  }

  function getQuestionConfig(data: any) {
    console.log(data);
    switch (data.type) {
      case "MultipleChoice":
        return (
          <MCConfig
            config={data}
            updateQuestion={dealWithChange}
            index={props.index}
          />
        );
      case "FillInBlank":
        return (
          <FillBlankConfig
            config={data}
            updateQuestion={dealWithChange}
            index={props.index}
          />
        );
      case "ShortAnswer":
        return (
          <ShortAnswerConfig
            config={data}
            updateQuestion={dealWithChange}
            index={props.index}
          />
        );
      case "Checkbox":
        return (
          <CheckboxConfig
            config={data}
            updateQuestion={dealWithChange}
            index={props.index}
          />
        );
      default:
        return <p>"Unknown Question Type"</p>;
    }
  }

  return <>{getQuestionConfig(props.data)}</>;
}
