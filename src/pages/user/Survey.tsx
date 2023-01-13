import React, { useState, useRef } from "react";
import Question from "../../components/questions/Question";
import SurveyTakerStandardPage from "../../components/SurveyTakerStandardPage";

export default function Survey() {
  const [page, setPage] = useState(0);
  const response:any = useRef({});

  // this would eventually load in data from DB, not use this dummy data
  const design = [
    {
      page: 0,
      type: "MultipleChoice",
      config: {
        prompt: {
          value: "This is an example question (Page 0)?",
          configPrompt: "Question Prompt:",
          type: "text",
        },
        shuffle: {
          value: true,
          configPrompt: "Shuffle choices?",
          type: "bool",
        },
        choices: {
          value: ["A", "B", "C", "D", "E"],
          configPrompt: "Enter choices:",
          type: "stringArray",
        },
      },
    },
    {
      page: 0,
      type: "MultipleChoice",
      config: {
        prompt: {
          value: "This is an example question (Page 0)?",
          configPrompt: "Question Prompt:",
          type: "text",
        },
        shuffle: {
          value: true,
          configPrompt: "Shuffle choices?",
          type: "bool",
        },
        choices: {
          value: ["A", "B", "C", "D", "E"],
          configPrompt: "Enter choices:",
          type: "stringArray",
        },
      },
    },
    {
      page: 1,
      type: "MultipleChoice",
      config: {
        prompt: {
          value: "This is an example question (Page 1)?",
          configPrompt: "Question Prompt:",
          type: "text",
        },
        shuffle: {
          value: true,
          configPrompt: "Shuffle choices?",
          type: "bool",
        },
        choices: {
          value: ["A", "B", "C", "D", "E"],
          configPrompt: "Enter choices:",
          type: "stringArray",
        },
      },
    },
  ];

  // this will be called by the question component whenever the question requests to update the response
  // goes through each column sent by the question and updates the response object
  function handleResponse(data: any, questionIndex: number) {
    Object.entries(data).forEach(([key, value]) => {
      let questionName = key;
      questionName = questionName.replace("#", "Question " + (questionIndex+1).toString());
      response.current[questionName] = value;
    });
    console.log(response.current);
  }

  // renders all questions on the current page
  function renderQuestions() {
    console.log("Rendering questions");
    return design.map((question, index) => {
      console.log("Rendering question " + index);
      console.log(question);
      if (question.page === page) {
        return <Question data={question} index={index} handleResponse={handleResponse}/>;
      } else {
        return null;
      }
    });
  }

  return (
    <SurveyTakerStandardPage>
      <div className="flex flex-col mt-6 max-w-prose">
        <p>
          Here is where some instructions could go. In the future, this should be a variable based on what the researcher inputs in the Builder.
        </p>
        
      </div>
      <hr className="mt-4 w-9/12 border-1 border-gray-800" />

      {/*Question Section*/}
      <div className="flex flex-col mt-6 gap-y-6 flex-grow-1">
        {renderQuestions()}
      </div>
      
      {/*Bottom Navigation*/}
      <div className="flex flex-row justify-center mt-auto md:mt-16 w-4/5 min-h-[36px]">
        {page > 0 ? 
          <button className="p-1 w-1/3 rounded bg-white border-2 border-orange-600 text-orange-600" onClick={() => setPage(page - 1)}>Back</button>
          :
          <div className="w-1/3"></div>
        }
        <p className="w-1/3 text-center">{page + 1} of #</p>
        <button className="p-1 w-1/3 rounded bg-orange-600 text-white" onClick={() => setPage(page + 1)}>Next</button>
      </div>
    </SurveyTakerStandardPage>
  );
}
