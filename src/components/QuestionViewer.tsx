import react, { useContext, useState } from "react";
import QuestionConfig from "./config-questions/QuestionConfig";
import {
  TasksContext,
  TasksDispatchContext,
} from "../context/SurveyBuilderContext";

export default function QuestionViewer(props: any) {
  const task = useContext(TasksContext);
  const dispatch = useContext(TasksDispatchContext);
  //questions would be filled in through a database call and any uses of design would be replace with questions
  const proofQuestionToAdd: any = {
    page: 0,
    type: "MultipleChoice",
    config: {
      prompt: {
        value: "Use the side config to edit the question!",
        configPrompt: "Question Prompt 2:",
        type: "text",
      },
      shuffle: {
        value: true,
        configPrompt: "Shuffle: ",
        type: "bool",
      },
      choices: {
        value: ["Option 1", "Option 2", "Option 3", "Option 4"],
        configPrompt: "Enter choices:",
        type: "stringArray",
      },
    },
  };
  function handleAddedQuestion() {
    let test: any = task;
    test["survey"]["questions"] =
      task["survey"]["questions"].concat(proofQuestionToAdd);
    console.log(test);
    dispatch({
      type: "update",
      questions: test["survey"],
      question: task["question"],
      change: true
    });
  }

  let testArray;
  try {
    testArray = task["survey"]["questions"].map(
      (question: any, index: number) => {
        return <QuestionConfig data={question} index={index} />;
      }
    );
  } catch (error) {
    console.log(error);
    console.log(task['survey']);
    console.log(task['survey']['questions']);
  }

  return (
    <>
      <div className="h-min-56 mt-3 mb-3 flex w-full flex-col gap-10 overflow-y-auto rounded-md shadow-lg shadow-black dark:bg-rdsDarkAccent3">
        <div className="flex w-full flex-col items-center justify-center gap-10 rounded-md p-5">
          <div className="flex w-full flex-col gap-4">{testArray}</div>
          <button
            className="w-fit rounded-sm bg-rdsBlue pl-2 pr-2 dark:text-white"
            onClick={() => handleAddedQuestion()}
          >
            + Add Question
          </button>
        </div>
      </div>
    </>
  );
}
