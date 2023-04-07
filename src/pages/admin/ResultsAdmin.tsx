import { useState, useEffect } from "react";
import TopNav from "../../components/TopNav";
import ResultsTopConfig from "../../components/ResultsTopConfig";
import { loadAllResponses, retrieveSurveyConfig } from "../../APIs/Firebase";
import { useParams, useNavigate } from "react-router-dom";
import Loading from "../../components/Loading";
import ResultsTable from "../../components/ResultsTable";

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

  function generateCSV(): string {
    let questionOrder: Array<any> = config.questionOrder;
    let questions = config.questions;
    let responses: any = results;
    let userResponseRow: Array<string> = [];
    let allResponseRows: Array<string> = [];

    //Base headers to be included in every Results file
    let headersStr: string =
      "User ID," +
      "Referrer ID," +
      "Referral Chain Depth," +
      "Completion Status,";

    //Get question headers for the current survey
    let qHeaders: Array<string> = [];
    questionOrder.forEach((questionID) => {
      let question = questions[questionID];
      if (question !== undefined)
        qHeaders.push('"' + question.config.prompt.value + '"');
    });

    headersStr += qHeaders.join(",") + "\n";

    //Get the data row for each user
    responses.forEach((response: any) => {
      userResponseRow = [];
      //Get the values for the base headers
      userResponseRow.push(response.responseID);
      userResponseRow.push(response.parentID);
      userResponseRow.push(response.depth);
      if (response.completed === true) {
        userResponseRow.push("Complete");
      } else {
        userResponseRow.push("Incomplete");
      }

      //Get the questions values
      if (response.answers !== undefined) {
        questionOrder.forEach((questionID: string) => {
          if (response.answers[questionID] === undefined) {
            userResponseRow.push("");
          } else {
            userResponseRow.push('"' + response.answers[questionID] + '"');
          }
        });
      }

      allResponseRows.push(userResponseRow.join(","));
    });

    return headersStr + allResponseRows.join("\n");
  }

  function downloadCSV() {
    const csvfile = new Blob([generateCSV()], { type: "text/csv" }); //Add data
    const a = document.createElement("a");
    a.href = URL.createObjectURL(csvfile);
    a.download = config.title + " Results.csv";
    a.click();
  }

  return (
    <div className="h-screen text-white dark:bg-rdsDark2">
      <TopNav />
      {results && config ? (
        <>
          <ResultsTopConfig
            name={config.title}
            id={params.surveyID}
            live={config.live}
            updated={config.lastUpdated}
            downloadCSV={downloadCSV}
          />

          <div className="flex w-full flex-col gap-y-2 p-6">
            <div className="flex w-full flex-row items-baseline">
              <h1 className="flex-grow pl-10 text-left text-2xl">
                {config.title}
              </h1>
              <label htmlFor="filterCompleted">Show Incomplete Responses</label>
              <input
                type="checkbox"
                id="filterCompleted"
                name="filterCompleted"
                className="ml-4 mr-12"
                onChange={() => setFilterCompleted(!filterCompleted)}
              />
            </div>
            <ResultsTable
              results={results}
              config={config}
              filterCompleted={filterCompleted}
            />
          </div>
        </>
      ) : (
        <Loading />
      )}
    </div>
  );
}
