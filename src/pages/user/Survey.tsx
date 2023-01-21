import React, { useState, useRef } from "react";
import Question from "../../components/questions/Question";
import SurveyTakerStandardPage from "../../components/SurveyTakerStandardPage";

export default function Survey() {
  const [page, setPage] = useState(0);
  const [surveyQuestions, setSurveyQuestions] = useState([{}]);
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
    {
      page: 0,
      type: "FillInBlank",
      config: {
        prompt: {
          value: "The Declaration of Indpendence was written in ____________",
          configPrompt: "Question Prompt:",
          type: "text",
        }
      }
    },
    {
      page: 1,
      type: "ShortAnswer",
      config: {
        prompt: {
          value: "Tell me why you are here",
          configPrompt: "Question Prompt",
          type: "text",
        }
      }
    },
    {
      page: 0,
      type: "Checkbox",
      config: {
        prompt: {
          value: "This is an example question?",
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

  const changePage = (whichWay: string) => {
    let pageTo: number = 0;
    if (whichWay === "up") {
      if (page < 4) {
        pageTo = page + 1;
      } else {
        pageTo = page;
      }
    } else if (whichWay === "down") {
      if ((page) > 0) {
        pageTo = page - 1;
      } else {
        pageTo = page;
      }
    }
    setPage(pageTo);
  }

  // renders all questions on the current page
  function renderQuestions() {
    console.log("Rendering questions");
    return design.map((question, index) => {
      console.log("Rendering question " + index);
      console.log(question);
      let answerIndex = "Question " + (index + 1).toString();
      if (question.page === page) {
        return <Question data={question} index={index} handleResponse={handleResponse} currentAnswer={response.current[answerIndex]}/>;
      } else {
        return null;
      }
    });
  }

  return (
    <SurveyTakerStandardPage>
        <div className="flex flex-col gap-y-3">
          <p className="max-w-prose">
            Here is where some instructions could go. In the future, this should be a variable based on what the researcher inputs in the Builder.
          </p>
          <hr className="w-9/12 border-1 border-gray-800 self-center" />
        </div>

        {/*Question Section*/}
        <div className="flex flex-col gap-y-6 flex-grow-1">
          {renderQuestions()}
        </div>
        
        {/*Bottom Navigation*/}
        <div className="flex flex-row justify-center mt-auto md:mt-0 w-4/5 md:w-1/3 min-h-[36px]">
          {page > 0 ? 
            <button className="p-1 w-1/3 rounded bg-white border-2 border-rdsOrange text-rdsOrange" onClick={() => setPage(page - 1)}>Back</button>
            :
            <div className="w-1/3"></div>
          }
          <p className="w-1/3 text-center">{page + 1} of #</p>
          <button className="p-1 w-1/3 rounded bg-rdsOrange text-white" onClick={() => setPage(page + 1)}>Next</button>
        </div>
    </SurveyTakerStandardPage>
  );
}
