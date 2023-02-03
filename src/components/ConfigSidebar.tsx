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
  console.log(task);
  console.log(dispatch);
  console.log(props.otherCurrentQuestion);
  // const choicesArray: any = props.otherCurrentQuestion[props.questionIndex].config.choices.value.map((choice: any) => <li key={choice}>{choice}</li>);
  // console.log(props.otherCurrentQuestion[props.questionIndex].page);

  const dealWithChange = (newData: any) => {
    // console.log(e.target.value);
    let test: any = props.otherCurrentQuestion;
    test[props.questionIndex] = newData;
    let newTest = task;
    newTest["questions"][props.questionIndex] = newData;
    dispatch({
      type: 'question-prompt',
      message: newTest
    })
    props.update(test);
  }

  function getQuestionConfig(data: any) {
    switch (data.type) {
      case "MultipleChoice":
        return (
          <MCSidebar
            config={data}
            updateQuestion={dealWithChange}
          />
        );
      case "FillInBlank":
        return (
          <FillBlankSidebar
          config={data}
          updateQuestion={dealWithChange}
          />
        );
      case "ShortAnswer":
        return (
          <ShortAnswerSidebar
            config={data}
            updateQuestion={dealWithChange}
          />
        );
      case "Checkbox":
        return (
          <CheckboxSidebar
          config={data}
          updateQuestion={dealWithChange}
          />
        );
      default:
        return <p>"Unknown Question Type"</p>;
    }
  }
  

  return (
    <>
      <div className="flex flex-col justify-start items-center border-r border-black w-1/4 gap-2">
        {getQuestionConfig(props.otherCurrentQuestion[props.questionIndex])}
      </div>
    </>
  );
}
