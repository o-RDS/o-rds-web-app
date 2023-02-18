import { updateCurrentUser } from "firebase/auth";
import react, { useContext } from "react";
import MCSidebar from "./config-sidebar/MCSidebar";
import ShortAnswerSidebar from "./config-sidebar/ShortAnswerSidebar";
import FillBlankSidebar from "./config-sidebar/FillBlankSidebar";
import CheckboxSidebar from "./config-sidebar/CheckboxSidebar";
import {
  SurveyContext,
  SurveyDispatchContext,
} from "../context/SurveyBuilderContext";

export default function ConfigSidebar(props: any) {
  const SurveyState = useContext(SurveyContext);
  console.log(SurveyState);

  function getQuestionConfig(data: any) {
    try {
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
  } catch(error) {
    console.log(error);
    return (<h2>This is a deleted question. Please pick a new one.</h2>)
  }
  }

  return (
    <>
      <div className="flex w-[20%] flex-col items-center justify-start gap-4 border-r border-black p-4 dark:border-none dark:bg-rdsDarkAccent3 dark:text-white">
        <h2 className="self-start text-2xl font-bold">
          {"Question Settings"}
        </h2>
        {getQuestionConfig(SurveyState["survey"]["questions"][SurveyState["question"]])}
      </div>
    </>
  );
}
