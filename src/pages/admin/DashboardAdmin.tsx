import { Link } from "react-router-dom";
import StandardPage from "../../components/StandardPage";
import { loadAdminSurveys } from "../../data/dataLayerManager";
import { useState, useEffect } from "react";

export default function Dashboard() {
  const user = "test";
  const [surveys, setSurveys] = useState([{ id: 1, title: "Loading..." }]);
  const [page, setPage] = useState(0);
  const [displayNumber, setDisplayNumber] = useState(5);

  useEffect(() => {
    loadAdminSurveys(
      user,
      page * displayNumber,
      (page + 1) * displayNumber
    ).then((surveys) => {
      console.log(surveys);
      setSurveys(surveys);
    });
  }, [page, displayNumber]);

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
          <div className="flex flex-row items-baseline gap-2">
            <h3 className="text-2xl">My Surveys</h3>
            <p className="pl-5">Surveys Per Page:</p>
            <button onClick={() => setDisplayNumber(5)} className={`${displayNumber === 5 ? "text-rdsOrange" : ""}`}>5</button>
            <button onClick={() => setDisplayNumber(10)} className={`${displayNumber === 10 ? "text-rdsOrange" : ""}`}>10</button>
            <button onClick={() => setDisplayNumber(25)}  className={`pr-5 ${displayNumber === 25 ? "text-rdsOrange" : ""}`}>25</button>
            {page > 0 ? (
              <button onClick={() => setPage(page - 1)}>{"<"}</button>
            ) : (
              <button disabled>{"<"}</button>
            )}
            <p>Page {page + 1}</p>
            {renderSurveyButtons().length >= displayNumber ? (
              <button onClick={() => setPage(page + 1)}>{">"}</button>
            ) : (
              <button disabled>{">"}</button>
            )}
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
