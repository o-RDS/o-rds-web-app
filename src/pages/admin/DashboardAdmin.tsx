import { Link } from "react-router-dom";
import StandardPage from "../../components/StandardPage";
import {
  deleteSurveyConfig,
  loadAdminSurveys,
} from "../../APIs/Firebase";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";

export default function Dashboard() {
  const [surveys, setSurveys] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [displayNumber, setDisplayNumber] = useState(5);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setSurveys([]);
    setLoading(true);
    loadAdminSurveys(
      page * displayNumber,
      (page + 1) * displayNumber
    ).then((surveys) => {
      console.log(surveys)
      setSurveys(surveys);
      setLoading(false);
    });
  }, [page, displayNumber]);

  function renderSurveyButtons() {
    return surveys.map((survey: any) => (
      <div className={`flex h-48 w-48 flex-col justify-end rounded-md ${survey.live ? "bg-rdsBlue" : "bg-rdsOrange"} p-2 text-white`}>
        <Link to={`../survey-builder/${survey.id}`}>Edit Survey</Link>
        <Link to={`../results/${survey.id}`}>View Results</Link>
        <button className="text-left" onClick={() => deleteSurvey(survey.id)}>
          Delete Survey
        </button>
        <div className="border-t">
          <h4 className="text-md font-bold">{survey.title}</h4>
          <p className="text-sm">? Responses</p>
        </div>
      </div>
    ));
  }

  function changeDisplayNumber(number: number) {
    setLoading(true);
    setPage(0);
    setDisplayNumber(number);
    setLoading(false);
  }

  async function deleteSurvey(id: string) {
    setLoading(true);
    console.log(await deleteSurveyConfig(id));
    loadAdminSurveys(
      page * displayNumber,
      (page + 1) * displayNumber
    ).then((surveys) => {
      setSurveys(surveys);
      setLoading(false);
    });
  }

  return (
    <StandardPage>
      <div className="flex flex-col items-center">
        <h1>Welcome User</h1>
        <div className="flex w-5/6 flex-col">
          <div className="flex flex-row items-baseline gap-2">
            <h3 className="text-2xl">My Surveys</h3>
            <p className="pl-5">Surveys Per Page:</p>
            <button
              onClick={() => changeDisplayNumber(5)}
              className={`${displayNumber === 5 ? "text-rdsOrange" : ""}`}
            >
              5
            </button>
            <button
              onClick={() => changeDisplayNumber(10)}
              className={`${displayNumber === 10 ? "text-rdsOrange" : ""}`}
            >
              10
            </button>
            <button
              onClick={() => changeDisplayNumber(25)}
              className={`pr-5 ${displayNumber === 25 ? "text-rdsOrange" : ""}`}
            >
              25
            </button>
            {page > 0 ? (
              <button onClick={() => setPage(page - 1)}>{"<"}</button>
            ) : (
              <button disabled>{"<"}</button>
            )}
            <p>Page {page + 1}</p>
            {surveys.length >= displayNumber ? (
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
            {surveys.length > 0 && renderSurveyButtons()}
            {loading && <Loading />}
            {surveys.length === 0 && !loading && page > 0 && setPage(page - 1)}
          </div>
        </div>
      </div>
    </StandardPage>
  );
}
