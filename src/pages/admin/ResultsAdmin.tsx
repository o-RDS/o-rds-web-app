import { useState, useEffect } from "react";
import SurveyTopNav from "../../components/SurveyTopNav";
import ResultRow from "../../components/ResultRow";
import StandardPage from "../../components/StandardPage";
import { loadAllResponses } from "../../data/dataLayerManager";
import { useParams, useNavigate } from "react-router-dom";

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
  question4: {
    prompt: {
      value:
        "What is the name for the German ice cream dish that imitates an Italian pasta dish?",
    },
  },
  question5: {
    prompt: {
      value:
        "What is the name for the German ice cream dish that imitates an Italian pasta dish?",
    },
  },
  question6: {
    prompt: {
      value:
        "What is the name for the German ice cream dish that imitates an Italian pasta dish?",
    },
  },
  question7: {
    prompt: {
      value:
        "What is the name for the German ice cream dish that imitates an Italian pasta dish?",
    },
  },
  question8: {
    prompt: {
      value:
        "What is the name for the German ice cream dish that imitates an Italian pasta dish?",
    },
  },
  question9: {
    prompt: {
      value:
        "What is the name for the German ice cream dish that imitates an Italian pasta dish?",
    },
  },
  question10: {
    prompt: {
      value:
        "What is the name for the German ice cream dish that imitates an Italian pasta dish?",
    },
  },
  question11: {
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
      Q4: "Ich bin gut!",
      Q5: "A",
      Q6: "Spaghettieis",
      Q7: "Ich bin gut!",
      Q8: "A",
      Q9: "Spaghettieis",
      Q10: "Ich bin gut!",
      Q11: "A",
    },
    completed: true,
  },
  5432: {
    answers: {
      Q1: "Ich bin müde...",
      Q2: "C",
      Q3: "Spaghettieis SpaghettieisSpaghettieisSpaghettieisSpaghettieisSpaghettieisSpaghettieisSpaghettieisSpaghettieisSpaghettieisSpaghettieisSpaghettieisSpaghettieisSpaghettieisSpaghettieis",
    },
    completed: false,
  },
};

export default function Results() {
  const [filterCompleted, setFilterCompleted] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.id){
      loadAllResponses(params.id)
    } else {
      console.log("No survey ID provided")
      navigate("/admin/dashboard")
    }
  }, []);

  function getUserResponses(): Array<Array<string>> {
    let responses: any = dummySurveyResponses; //CHANGE TO PROPER POINT IN DATABASE LATER ON
    let allUserResponses = [];

    for (let userID in responses) {
      let currUserResponses = [];
      currUserResponses.push(userID);
      for (let questionID in responses[userID].answers) {
        currUserResponses.push(responses[userID].answers[questionID]);
      }
      currUserResponses.push(responses[userID].completed.toString()); //Store completed status at end of array
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

  function renderTableBody(filterCompleted: boolean) {
    let userResponses = getUserResponses();

    return userResponses.map((row, index) => {
      if (row.pop() === "true" || filterCompleted === false) {
        //If filtering is on pop the completed value from the row array
        if (index % 2 === 0) {
          return <ResultRow rowData={row} type="body" bgColor="bg-white" />;
        } else {
          return <ResultRow rowData={row} type="body" bgColor="bg-gray-200" />;
        }
      }
    });
  }

  return (
    <>
      <SurveyTopNav id={params.id}/>
      <div className="flex w-full flex-col gap-y-2 p-6">
        <div className="flex w-full flex-row items-baseline">
          <h1 className="flex-grow pl-10 text-left text-2xl">Survey Name</h1>
          <label htmlFor="filterCompleted">
            Display completed responses only
          </label>
          <input
            type="checkbox"
            id="filterCompleted"
            name="filterCompleted"
            className="ml-4 mr-12"
            onChange={() => setFilterCompleted(!filterCompleted)}
          />
          <button className="w-fit rounded bg-rdsOrange p-2 text-white">
            Download CSV
          </button>
        </div>
        <div className="overflow-auto">
          <table className="mb-4 w-fit table-auto border-collapse text-left">
            <thead>{renderTableHeader()}</thead>
            <tbody>{renderTableBody(filterCompleted)}</tbody>
          </table>
        </div>
      </div>
    </>
  );
}
