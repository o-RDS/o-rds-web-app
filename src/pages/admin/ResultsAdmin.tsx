import { useState, useEffect } from "react";
import SurveyTopNav from "../../components/SurveyTopNav";
import ResultRow from "../../components/ResultRow";
import ResultsTopConfig from "../../components/ResultsTopConfig";
import {
  loadAllResponses,
  retrieveSurveyConfig,
} from "../../data/dataLayerManager";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";

export default function Results() {
  const [results, setResults] = useState<any>(null);
  const [config, setConfig] = useState<any>(null);
  const [filterCompleted, setFilterCompleted] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (params.surveyID) {
      loadAllResponses(params.surveyID).then((results) => {
        setResults(results);
      });
      retrieveSurveyConfig(params.surveyID).then((config) => {
        setConfig(config);
      });
    } else {
      console.log("No survey ID provided");
      navigate("/admin/dashboard");
    }
  }, []);

  function getUserResponses(): Array<Array<string>> {
    let responses: any = results;
    let questionOrder = config.questionOrder;
    let allUserResponses = [];

    for (let userID in responses) {
      if (responses[userID].answers !== undefined) {
        let currUserResponses = [];
        currUserResponses.push(responses[userID].responseID);
        currUserResponses.push(responses[userID].parentID)
        questionOrder.forEach((questionID: string) => {
          if (responses[userID].answers[questionID] === undefined) {
            currUserResponses.push("");
          } else {
            currUserResponses.push(responses[userID].answers[questionID]);
          }
        });
        currUserResponses.push(responses[userID].completed.toString()); //Store completed status at end of array
        allUserResponses.push(currUserResponses);
      }
    }

    return allUserResponses;
  }

  function renderTableHeader() {
    let questionOrder: Array<any> = config.questionOrder;
    let questions = config.questions;
    let headers = [];

    headers.push("User ID");
    headers.push("Parent ID");
    questionOrder.forEach((questionID) => {
      let question = questions[questionID];
      if (question !== undefined)
        headers.push(question.config.prompt.value);
    });

    return <ResultRow rowData={headers} type="header" />;
  }

  function renderTableBody(filterCompleted: boolean) {
    let userResponses = getUserResponses();

    return userResponses.map((row, index) => {
      if (row.pop() === "true" || filterCompleted === false) {
        //If filtering is on pop the completed value from the row array
        if (index % 2 === 0) {
          return <ResultRow rowData={row} type="body" bgColor="bg-white dark:bg-rdsBlue"/>;
        } else {
          return <ResultRow rowData={row} type="body" bgColor="bg-gray-200 dark:bg-rdsDark2" />;
        }
      }
    });
  }

  function generateCSV(): string {
    let questionOrder: Array<any> = config.questionOrder;
    let questions = config.questions;
    let responses: any = results;
    let userResponseRow: Array<string> = [];
    let allResponseRows: Array<string> = [];

    //Base headers to be included in every Results file
    let headersStr: string = "User ID," +
      "Referrer ID," +
      "Referral Chain Depth," +
      "Completion Status,";
    
    //Get question headers for the current survey
    let qHeaders: Array<string> = [];
    questionOrder.forEach((questionID) => {
      let question = questions[questionID];
      if (question !== undefined)
        qHeaders.push("\"" + question.config.prompt.value + "\"");
    });

    headersStr += qHeaders.join(",") + "\n";

    //Get the data row for each user
    responses.forEach((response: any) => {
      userResponseRow = [];
      //Get the values for the base headers
      userResponseRow.push(response.responseID);
      userResponseRow.push(response.parentID);
      userResponseRow.push(response.depth);
      if(response.completed === true){
        userResponseRow.push("Complete");
      } else {
        userResponseRow.push("Incomplete");
      }
      
      //Get the questions values
      if(response.answers !== undefined){
        questionOrder.forEach((questionID: string) => {
          if (response.answers[questionID] === undefined) {
            userResponseRow.push("");
          } else {
            userResponseRow.push("\"" + response.answers[questionID] + "\"");
          }
        });
      }

      allResponseRows.push(userResponseRow.join(","));
    });

    return headersStr + allResponseRows.join("\n");
  }

  function downloadCSV() {
    const csvfile = new Blob([generateCSV()], {type: "text/csv"}); //Add data
    const a = document.createElement('a');
    a.href = URL.createObjectURL(csvfile);
    a.download = config.title + " Results.csv";
    a.click();
  }

  return (
    <div className="dark:bg-rdsDark2 h-screen text-white">
      <SurveyTopNav id={params.surveyID}/>
      {results && config && <ResultsTopConfig name={config.title} id={params.surveyID}/>}
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
          <button 
            className="w-fit rounded bg-rdsOrange p-2 text-white"
            onClick={() => downloadCSV()}
          >
            Download CSV
          </button>
        </div>
        <div className="overflow-auto">
          {results && config ? (
            <table className="mb-4 w-fit table-auto border-collapse text-left">
              <thead>{renderTableHeader()}</thead>
              <tbody>{renderTableBody(filterCompleted)}</tbody>
            </table>
          ) : (
            <Loading />
          )}
        </div>
      </div>
    </div>
  );
}
