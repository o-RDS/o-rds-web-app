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
    <div className="Survey">
      <h1>Welcome To The Survey</h1>
      {renderQuestions()}
      <button onClick={() => changePage("down")}>Previous Page</button>
      <button onClick={() => changePage("up")}>Next Page</button>
    </div>
  );
}
