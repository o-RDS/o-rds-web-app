import React, { useState, useRef } from "react";
import Question from "../../components/questions/Question";
import "./Survey.css";

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
    {
      page: 0,
      type: "FillInBlank",
      config: {
        prompt: {
          value: "Fill in the blank",
          configPrompt: "Question Prompt:",
          type: "text",
        }
      }
    }
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
    <div className="Survey">
      <h1>Welcome To The Survey</h1>
      {renderQuestions()}
    </div>
  );
}
