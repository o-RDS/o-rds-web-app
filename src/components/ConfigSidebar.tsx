import { updateCurrentUser } from "firebase/auth";
import react, { useContext } from "react";
import MCSidebar from "./config-sidebar/MCSidebar";
import ShortAnswerSidebar from "./config-sidebar/ShortAnswerSidebar";
import FillBlankSidebar from "./config-sidebar/FillBlankSidebar";
import CheckboxSidebar from "./config-sidebar/CheckboxSidebar";
import {
  SurveyContext,
} from "../context/SurveyBuilderContext";

export default function ConfigSidebar(props: any) {
  const surveyState = useContext(SurveyContext);

  function getQuestionConfig(data: any) {
    switch (data.type) {
      case "MultipleChoice":
        return <MCSidebar />;
      case "FillInBlank":
        return <FillBlankSidebar />;
      case "ShortAnswer":
        return <ShortAnswerSidebar />;
      case "Checkbox":
        return <CheckboxSidebar />;
      default:
        return <p>"Unknown Question Type"</p>;
    }
  }

  return (
    <>
      <div className="flex w-1/4 flex-col items-center justify-start gap-2 border-r border-black">
        {getQuestionConfig(surveyState["survey"]["questions"][surveyState["question"]])}
      </div>
    </>
  );
}
