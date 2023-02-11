import { updateCurrentUser } from "firebase/auth";
import react, { useContext } from "react";
import MCSidebar from "../config-sidebar/MCSidebar";
import ShortAnswerSidebar from "../config-sidebar/ShortAnswerSidebar";
import FillBlankSidebar from "../config-sidebar/FillBlankSidebar";
import CheckboxSidebar from "../config-sidebar/CheckboxSidebar";
import {
  TasksContext,
  TasksDispatchContext,
} from "../../context/SurveyBuilderContext";

export default function SurveySettingsSide(props: any) {
  const task = useContext(TasksContext);

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
      <div className="flex w-1/4 flex-col items-center justify-start gap-2 border-r border-black dark:bg-rdsDarkAccent3 dark:text-white dark:border-none">
        <h2>Stuff Here</h2>
        <button>General</button>
        <button>Appearance</button>
        <button>Referrals & Payments</button>
        <button>Tremendous</button>
        <button>Contact Information</button>
      </div>
    </>
  );
}
