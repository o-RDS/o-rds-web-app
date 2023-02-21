import react, { useContext, useState } from "react";
import QuestionConfig from "./config-questions/QuestionConfig";
import { v4 as uuidv4 } from "uuid";
import {
  SurveyContext,
  SurveyDispatchContext,
} from "../context/SurveyBuilderContext";

export default function QuestionViewer(props: any) {
  const SurveyState = useContext(SurveyContext);
  const dispatch = useContext(SurveyDispatchContext);
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
  }
  };
  function handleAddedQuestion() {
    let test: any = SurveyState;
    let id = uuidv4();
    test['survey']['questionOrder'] = SurveyState['survey']['questionOrder'].concat([id]); 
    test["survey"]["questions"][id] = proofQuestionToAdd; 
    dispatch({
      type: "update",
      questions: test["survey"],
      question: SurveyState["question"],
      change: true
    });
  }

  let testArray;
  try {
    testArray = SurveyState["survey"]["questionOrder"].map(
      (question: string, index: number) => {
        console.log(question);
        console.log(SurveyState['survey']['questions'][question]);
        return <QuestionConfig data={SurveyState['survey']['questions'][question]} index={question} otherIndex={index}/>;
      }
    );
  } catch (error) {
    console.log(error);
  }

  return (
    <>
      <div className="h-min-56 mt-3 mb-3 flex w-full flex-col gap-10 rounded-md shadow-lg shadow-black dark:bg-rdsDarkAccent3">
        <div className="flex w-full flex-col items-center justify-center gap-10 rounded-md p-5">
          <div className="flex w-full flex-col gap-4">{testArray}</div>
          <button
            className="w-10 h-10 rounded-full bg-rdsBlue px-2 text-white py-1 text-lg font-bold transition-all"
            onClick={() => handleAddedQuestion()}
          >
            +
          </button>
        </div>
      </div>
    </>
  );
}
