import react, { useState } from "react";
import MultipleChoice from "./questions/MultipleChoice";
import Question from "./questions/Question";
import QuestionConfig from "./config-questions/QuestionConfig";
import sampleResearcherLogo from "../images/sample_researcher_logo.png";
import contactResearcherIcon from "../images/contact_researcher_icon.png";

export default function QuestionViewer(props: any) {
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

  // const testArray = props.questions.map((question: any, index: number) => {
  // return <div key={index} className="rounded-sm hover:border-2 hover:border-red-500 focus:border-red-500 border-2 border-white transition-all p-1" onClick={(e) => chooseQuestion(question.config, e.target, index)}>
  //   <div className="w-full">
  //         <h3>{"Q" + (index + 1)}</h3>
  //         <div className="bg-gray-100 p-3 rounded-md">
  //           <h2>{question.config.prompt.value}</h2>
  //           <ul>
  //             {question.config.choices.value.map((choice: any) => {
  //               return (
  //                 <li key={choice}>
  //                   <input type="radio" value={choice} disabled></input>
  //                   <label>{choice}</label>
  //                 </li>
  //               )
  //             })}
  //           </ul>
  //         </div>
  //       </div>
  // </div>});

  // const testArray = props.questions.map((question: any, index: number) => {
  //   return <div key={index} className="rounded-sm hover:border-2 hover:border-red-500 focus:border-red-500 border-2 border-white transition-all p-1" onClick={(e) => chooseQuestion(question.config, e.target, index)}>
  //     <div className="w-full">
  //           <h3>{"Q" + (index + 1)}</h3>
  //           <div className="bg-gray-100 p-3 rounded-md">
  //             <h2>{question.config.prompt.value}</h2>
  //             {/* <ul>
  //               {question.config.choices.value.map((choice: any) => {
  //                 return (
  //                   <li key={choice}>
  //                     <input type="radio" value={choice} disabled></input>
  //                     <label>{choice}</label>
  //                   </li>
  //                 )
  //               })}
  //             </ul> */}
  //             <input type="text"></input>
  //           </div>
  //         </div>
  //   </div>});

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
      <div className="h-min-56 mt-3 flex flex-col gap-10">
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
