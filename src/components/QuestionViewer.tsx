import react, { useContext, useState } from "react";
import QuestionConfig from "./config-questions/QuestionConfig";
import { TasksContext } from "../context/SurveyBuilderContext";

export default function QuestionViewer(props: any) {
  const task = useContext(TasksContext);
  //questions would be filled in through a database call and any uses of design would be replace with questions
  const proofQuestionToAdd: any[] = [
    {
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
    },
  ];

  const addQuestion = () => {
    //Also update in server you're using
    let newConfig = props.questions;
    console.log(newConfig);
    //TODO: look into updating list a different way. Should be able to use prev and array destructuring
    console.log(newConfig.concat(proofQuestionToAdd));
    props.update(newConfig.concat(proofQuestionToAdd));
    // setQuestions(questions.concat(proofQuestionToAdd));
  };

  const changeOptions = (questionUpdate: any) => {
    props.updateQuestion(questionUpdate);
  };

  const chooseQuestion = (newQuestion: any, index: number) => {
    props.updateQuestion(newQuestion, index);
    // target.tabIndex = -1;
    // target.focus();
  };

  const testArray = props.questions.map((question: any, index: number) => {
    return (
      <QuestionConfig
        data={question}
        index={index}
        changeQuestion={chooseQuestion}
      />
    );
  });

  return (
    <>
      <div className="h-min-56 mt-3 flex flex-col gap-10 overflow-y-auto">
        <div className="flex w-full flex-col items-center justify-center gap-10 rounded-md border border-black p-5">
          <div className="flex w-full flex-col gap-4">{testArray}</div>
          <button
            className="w-fit rounded-sm bg-rdsBlue pl-2 pr-2 text-white"
            onClick={() => addQuestion()}
          >
            + Add Question
          </button>
          <div className="w-full">
            <h3>End of Survey</h3>
            <input
              className="w-full bg-gray-100"
              placeholder="Put what you would like the end of survey message to be!"
            ></input>
          </div>
        </div>
      </div>
    </>
  );
}
