import { useState, useEffect } from "react";
import SurveyTopNav from "../../components/SurveyTopNav";
import ResultRow from "../../components/ResultRow";
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
          return <ResultRow rowData={row} type="body" bgColor="bg-white" />;
        } else {
          return <ResultRow rowData={row} type="body" bgColor="bg-gray-200" />;
        }
      }
    });
  }

  return (
    <>
      <SurveyTopNav id={params.surveyID}/>
      {/* <SurveyTopConfig name={config.title} id={params.surveyID}/> */}
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
    </>
  );
}
