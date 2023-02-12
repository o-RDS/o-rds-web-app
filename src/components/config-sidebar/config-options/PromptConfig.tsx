import React, {useContext} from "react";
import { TasksContext, TasksDispatchContext } from "../../../context/SurveyBuilderContext";

export default function PromptConfig() {
    const task = useContext(TasksContext);
    const taskQuestions = task["survey"]["questions"][task["question"]];
    const dispatch = useContext(TasksDispatchContext);

    function handleTitleChange(e: any) {
        let test: any = task;
        test["survey"]["questions"][test["question"]]["config"]["prompt"]["value"] =
          e.target.value;
        dispatch({
          type: "question-prompt",
          questions: test["survey"],
          question: task["question"],
        });
      }
      
    return (
        <div id="question-prompt" className="mt-3 flex flex-col items-center justify-center">
        <label htmlFor="question-prompt">{taskQuestions["config"]["prompt"]["configPrompt"]}</label>
        <textarea
          placeholder="This is a question"
          className="w-full h-20 p-1 rounded-md border border-rdsOrange dark:bg-inherit"
          onChange={(e: any) => handleTitleChange(e)}
          value={taskQuestions['config']['prompt']['value']}
        ></textarea>
      </div>
    )
}