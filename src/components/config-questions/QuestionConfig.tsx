import React from "react";
import CheckboxConfig from "./CheckboxConfig";
import FillBlankConfig from "./FillBlankConfig";
import ShortAnswerConfig from "./ShortAnswerConfig";
import MCConfig from "./MCConfig";

export default function QuestionConfig(props: any) {
    function dealWithChange() {
        // return;
    }

    function getQuestionConfig(data: any) {
        switch (data.type) {
          case "MultipleChoice":
            return (
              <MCConfig
                config={data}
                updateQuestion={dealWithChange}
              />
            );
          // case "FillInBlank":
          //   return (
          //     <FillBlankConfig
          //       config={data}
          //     />
          //   );
        //   case "ShortAnswer":
        //     return (
        //       <ShortAnswerConfig
        //         config={data}
        //         updateQuestion={dealWithChange}
        //       />
        //     );
          // case "Checkbox":
          //   return (
          //     <CheckboxConfig
          //       config={data}
          //     />
          //   );
          default:
            return <p>"Unknown Question Type"</p>;
        }
      }
}