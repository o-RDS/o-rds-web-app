import { render } from "@testing-library/react";
import React, { useContext } from "react";
import ResultRow from "../../components/ResultRow";
import StandardPage from "../../components/StandardPage";

const dummySurveyConfig = {
  question1: {
    prompt: {
      value: "Wie geht's?",
    },
  },
  question2: {
    prompt: {
      value: "Which is the capital of France?",
    },
  },
  question3: {
    prompt: {
      value:
        "What is the name for the German ice cream dish that imitates an Italian pasta dish?",
    },
  },
};

const dummySurveyResponses = {
  1234: {
    answers: {
      Q1: "Ich bin gut!",
      Q2: "A",
      Q3: "Spaghettieis",
    },
  },
  5432: {
    answers: {
      Q1: "Ich bin müde...",
      Q2: "C",
      Q3: "Spaghettieis SpaghettieisSpaghettieisSpaghettieisSpaghettieisSpaghettieisSpaghettieisSpaghettieisSpaghettieisSpaghettieisSpaghettieisSpaghettieisSpaghettieisSpaghettieisSpaghettieis",
    },
  },
};

function getUserResponses(/*selectedQuestionIDs: Array<string>*/): Array<
  Array<string>
> {
  //Thinking of function overloading to have an "All version" with no arguments and a "Selector version" with an array argument
  let responses: any = dummySurveyResponses; //CHANGE TO PROPER POINT IN DATABASE LATER ON
  let allUserResponses = [];

  for (let userID in responses) {
    let currUserResponses = [];
    currUserResponses.push(userID);
    for (let questionID in responses[userID].answers) {
      currUserResponses.push(responses[userID].answers[questionID]);
    }
    allUserResponses.push(currUserResponses);
  }

  return allUserResponses;
}

function renderTableHeader() {
  let config: any = dummySurveyConfig; //CHANGE TO PROPER POINT IN DATABASE LATER ON
  let headers = [];

  headers.push("User ID"); //NOTE THAT THIS VALUE IS CURRENTLY HARD-CODED IN. THIS CAN PROBABLY BE CHANGED IN THE FUTURE
  for (let questionID in config) {
    headers.push(config[questionID].prompt.value);
  }

  return <ResultRow rowData={headers} type="header" />;
}

function renderTableBody() {
  let userResponses = getUserResponses();

  return userResponses.map((row, index) => {
    if (index % 2 == 0) {
      return <ResultRow rowData={row} type="body" bgColor="bg-white" />;
    } else {
      return <ResultRow rowData={row} type="body" bgColor="bg-gray-200" />;
    }
  });
}

export default function Results() {
  return (
    <StandardPage>
      <div className="flex w-full flex-col gap-y-2 p-6">
        <div className="flex w-full flex-row items-baseline">
          <h1 className="flex-grow pl-10 text-left text-2xl">Survey Name</h1>
          <button className="w-fit rounded bg-rdsOrange p-2 text-white">
            Download CSV
          </button>
        </div>

        <table className="w-fit table-auto text-left">
          <thead>{renderTableHeader()}</thead>
          <tbody>{renderTableBody()}</tbody>
        </table>
      </div>
    </StandardPage>
  );
}
