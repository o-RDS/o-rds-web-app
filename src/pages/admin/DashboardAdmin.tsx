import { Link } from "react-router-dom";
import StandardPage from "../../components/StandardPage";
import {
  deleteSurveyConfig,
  loadAdminSurveys,
} from "../../APIs/Firebase";
import { useState, useEffect } from "react";
import Loading from "../../components/Loading";
import { getJWTPayload } from "../../data/cookieFunctions";
import ords from "../../images/ords.png";

export default function Dashboard() {
  const [surveys, setSurveys] = useState<any>([]);
  const [page, setPage] = useState(0);
  const [displayNumber, setDisplayNumber] = useState(5);
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    setLoading(true);
    setSurveys([]);
    loadAdminSurveys(
      page * displayNumber,
      displayNumber
    ).then((surveys) => {
      console.log(surveys)
      setSurveys(surveys);
      setLoading(false);
    });
    setName(getJWTPayload().email);
  }, [page, displayNumber]);

  function renderSurveyButtons() {
    return surveys.map((survey: any) => (
      <Link to={`../results/${survey.id}`}>
        <div
          className={`flex h-54 w-48 flex-col justify-start rounded-md p-2 dark:bg-rdsDarkAccent3 cursor-pointer`}
        >
          <div className="flex flex-row">
            <Link to={`../survey-builder/${survey.id}`}><p className="text-xl font-bold">✎</p></Link>
            <div
              className={`ml-auto rounded-sm border pl-2 pr-2 transition-all ${
                survey.live
                  ? "border-green-500 bg-green-500 bg-opacity-10 text-green-500"
                  : "border-red-500 bg-red-500 bg-opacity-10 text-red-500"
              } text-white`}
            >
              {survey.live ? "Active" : <p>Inactive</p>}
            </div>
          </div>
          <img src={ords} className="h-3/5 w-3/5 rounded-md m-4 self-center"/>
          {/* <div className="h-3/5"></div> */}
          <div className="border-t">
            <h4 className="text-lg font-bold">{survey.title}</h4>
            {/* <p className="text-sm">? Responses</p> */}
            {/* <button
              className="ml-auto text-left"
              onClick={() => deleteSurvey(survey.id)}
            >
              X
            </button> */}
          </div>
        </div>
      </Link>
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
    console.log(await deleteSurveyConfig(id).then((data) => {
      if (data.statusCode > 201) {
        setErrorMessage(data.message)
      }
    }));
    loadAdminSurveys(
      page * displayNumber,
      displayNumber
    ).then((surveys) => {
      setSurveys(surveys);
      setLoading(false);
    });
  }

  return (
    <StandardPage>
      <div className="flex flex-col items-center">
        <br></br>
        <h1 className="text-4xl">Welcome {name}</h1>
        <br></br>
        <div className="flex w-5/6 flex-col">
          <div className="flex flex-row items-baseline gap-2">
            <h3 className="text-3xl">My Surveys</h3>
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
                <button className="rounded-md bg-rdsBlue p-1 pl-2 pr-2 text-white active:translate-y-1 active:shadow-none hover:shadow-black hover:shadow-md transition-all">
                  New Survey
                </button>
              </Link>
            </div>
          </div>
          <br></br>
          <div className="flex flex-row flex-wrap gap-10">
            {surveys.length > 0 && renderSurveyButtons()}
            {loading && <Loading />}
            {(surveys.length === 0 && !loading && page > 0) && setPage(page - 1)}
          </div>
        </div>
      </div>
    </StandardPage>
  );
}
