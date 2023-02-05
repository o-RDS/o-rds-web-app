import React, {useContext} from "react";
import { TasksContext, TasksDispatchContext } from "../../context/SurveyBuilderContext";

export default function FillBlankSidebar(props: any) {
  const task = useContext(TasksContext);
  const taskQuestions = task['survey']['questions'][task['question']]
  const dispatch = useContext(TasksDispatchContext);

  function handleTitleChange(e: any) {
    let test: any = task;
    test['survey']['questions'][test['question']]['config']['prompt']['value'] = e.target.value;
    dispatch({
      type: 'question-prompt',
      questions: test['survey'],
      question: task['question']
    })
  }

  return (
    <>
     <div className="flex flex-col items-center justify-center mt-3">
        <label>Page</label>
        <div className="flex flex-row gap-2">
          <button className="rounded-full bg-rdsOrange text-white w-6 h-6">-</button>
          <p className="text-lg">{taskQuestions['page']}</p>
          <button className="rounded-full bg-rdsOrange text-white w-6 h-6">+</button>
        </div>
      </div>
      <div className="flex flex-col items-center justify-center mt-3">
        <label>{taskQuestions['config']['prompt']['configPrompt']}</label>
        <input
          type="text"
          placeholder="This is a question"
          className="w-3/5 rounded-sm border border-rdsOrange"
          onChange={(e: any) => handleTitleChange(e)}
        ></input>
      </div>
    </>
  );
}
