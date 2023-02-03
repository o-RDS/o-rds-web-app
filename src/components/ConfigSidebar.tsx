import { updateCurrentUser } from "firebase/auth";
import react, { useContext } from "react";
import MCSidebar from "./config-sidebar/MCSidebar";
import ShortAnswerSidebar from "./config-sidebar/ShortAnswerSidebar";
import FillBlankSidebar from "./config-sidebar/FillBlankSidebar";
import CheckboxSidebar from "./config-sidebar/CheckboxSidebar";
import { TasksContext, TasksDispatchContext } from "../context/SurveyBuilderContext";

export default function ConfigSidebar(props: any) {
  const task = useContext(TasksContext);
  const dispatch = useContext(TasksDispatchContext);

  function getQuestionConfig(data: any) {
    switch (data.type) {
      case "MultipleChoice":
        return (
          <MCSidebar
            config={data}
            // updateQuestion={dealWithChange}
            index={props.questionIndex}
          />
        );
      case "FillInBlank":
        return (
          <FillBlankSidebar
          config={data}
          // updateQuestion={dealWithChange}
          index={props.questionIndex}
          />
        );
      case "ShortAnswer":
        return (
          <ShortAnswerSidebar
            config={data}
            // updateQuestion={dealWithChange}
            index={props.questionIndex}
          />
        );
      case "Checkbox":
        return (
          <CheckboxSidebar
          config={data}
          // updateQuestion={dealWithChange}
          index={props.questionIndex}
          />
        );
      default:
        return <p>"Unknown Question Type"</p>;
    }
  }
  

  return (
    <>
      <div className="flex flex-col justify-start items-center border-r border-black w-1/4 gap-2">
        {getQuestionConfig(task['survey']['questions'][task['question']])}
      </div>
    </>
  );
}
