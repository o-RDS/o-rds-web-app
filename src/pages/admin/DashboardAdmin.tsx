import { Link } from "react-router-dom";
import StandardPage from "../../components/StandardPage";
import { loadAdminSurveys } from "../../data/dataLayerManager";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const user = "test"
  const [surveys, setSurveys] = useState([{ id: 1, title: "Loading..." }]);

  useEffect(() => {
    loadAdminSurveys(user).then((surveys) => {
      console.log(surveys)
      setSurveys(surveys);
    });
  }, []);

  function renderSurveyButtons() {
    return surveys.map((survey) => (
      <Link to={`../results/${survey.id}`}>
        <div className="flex h-48 w-48 flex-col justify-end rounded-md bg-rdsBlue p-2 text-white">
          <div className="border-t">
            <h4 className="text-md font-bold">{survey.title}</h4>
            <p className="text-sm">? Responses</p>
          </div>
        </div>
      </Link>
    ));
  }

  return (
    <StandardPage>
      <div className="flex flex-col items-center">
        <h1>Welcome User</h1>
        <div className="flex w-5/6 flex-col">
          <div className="flex flex-row">
            <h3 className="text-2xl">Active Surveys</h3>
            <div className="ml-auto">
              <Link to="../survey-builder/new">
                <button className="rounded-md bg-rdsBlue p-1 pl-2 pr-2 text-white">
                  New Survey
                </button>
              </Link>
            </div>
          </div>
          <br></br>
          <div className="flex flex-row flex-wrap gap-10">
            {renderSurveyButtons()}
          </div>
        </div>
      </div>
    </StandardPage>
  );
}
