import React, { useState, useRef, useEffect } from "react";
import Question from "../../components/questions/Question";
import SurveyTakerStandardPage from "../../components/SurveyTakerStandardPage";
import { useNavigate, useOutletContext, useParams } from "react-router";
import { loadResponse, writeSurveyResponse } from "../../APIs/Firebase";
import Loading from "../../components/Loading";

export default function Survey() {
  const [page, setPage] = useState<number>(0);
  const [design, setDesign] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>("");
  const params = useParams();
  const navigate = useNavigate();
  const config: any = useOutletContext();
  const [response, setResponse] = useState({ answers: {} });
  const alias = useRef<string>("");
  const hash = useRef<string>("");

  useEffect(() => {
    if (config !== null && config !== undefined) {
      setDesign(config.questionOrder);
      let tempHash = window.sessionStorage.getItem("hash");
      if (tempHash) {
        hash.current = tempHash;
      } else {
        navigate("../");
      }
      if (params.id !== undefined) {
        if (window.localStorage.getItem(params.id + hash.current)) {
          let tempAlias = window.localStorage.getItem(params.id + hash.current);
          if (tempAlias) {
            alias.current = tempAlias;
            loadResponse(params.id, tempAlias).then((data) => {
              if (data.statusCode === 200) {
                let tempResponse: any = response;
                tempResponse = data;
                tempResponse.parentID = window.sessionStorage.getItem("parent");
                tempResponse.depth = window.sessionStorage.getItem("depth");
                window.localStorage.setItem(window.sessionStorage.getItem("hash") + "responseID", data.responseID);
                setResponse(tempResponse);
              }
            });
          }
        } else {
          navigate("../resume");
        }
      }
      setLoading(false);
    } else {
      setLoading(true);
    }
  }, [config, navigate, params.id]);

  // this will be called by the question component whenever the question requests to update the response
  // goes through each column sent by the question and updates the response object
  function handleResponse(data: any, questionID: string) {
    Object.entries(data).forEach(([key, value]) => {
      let questionName = key;
      questionName = questionName.replace("#", questionID);
      let tempResponse: any = response;
      tempResponse.answers[questionName] = value;
      setResponse(tempResponse);
    });
    console.log(response);
  }

  function changePage(modifier: number) {
    saveResponse();
    setPage(page + modifier);
  }

  async function saveResponse() {
    setError("");
    console.log(response);
    let tempHash = hash.current;
    if (params.id !== undefined && tempHash !== null) {
      let tempAlias = window.localStorage.getItem(params.id + tempHash);
      if (tempAlias) {
        let res = await writeSurveyResponse(params.id, tempAlias, response);
        if (res.statusCode === 201) {
          return true;
        } else {
          setError(res.message);
          return false;
        }
      }
    }
    setError("Failed to save response");
    return false;
  }

  async function handleSubmit(e: any) {
    e.preventDefault();
    console.log("Submitting");
    let tempResponse: any = response;
    tempResponse.completed = true;
    setResponse(tempResponse);
    console.log(response);
    if (params.id !== undefined && hash.current !== null) {
      if (await saveResponse()) {
        console.log("Submitted response");
        navigate("../reward");
      } else {
        console.log("Failed to submit response");
      }
    }
    // TODO: add error message
  }

  // renders all questions on the current page
  function renderQuestions() {
    console.log("Rendering questions");
    console.log(design);
    return design.map((id: string, index: number) => {
      console.log(id);
      let question = config.questions[id];
      console.log("Rendering question " + index);
      console.log(question);
      let tempResponse: any = response;
      if (question.page === page) {
        console.log(tempResponse.answers[id]);
        return (
          <Question
            data={question}
            index={index}
            id={id}
            handleResponse={handleResponse}
            currentAnswer={tempResponse.answers[id]}
          />
        );
      } else {
        return null;
      }
    });
  }

  return (
    <SurveyTakerStandardPage>
      {!loading ? (
        <>
          <div className="flex w-4/5 flex-col items-center gap-y-3 lg:w-1/4">
            <p className="w-11/12 whitespace-normal break-words">
              {config.researcherMessage}
            </p>
            <hr className="border-1 w-full self-center border-gray-800" />
          </div>

          <form
            className="flex w-4/5 flex-col gap-y-6 lg:w-1/3"
            onSubmit={(e) => handleSubmit(e)}
          >
            {renderQuestions()}

            <div className="flex min-h-[36px] w-4/5 flex-row justify-center self-center">
              {page > 0 ? (
                <div
                  // type="button"
                  className="w-1/3 rounded border-2 border-rdsOrange bg-white p-1 text-rdsOrange text-center cursor-pointer"
                  onClick={() => changePage(-1)}
                >
                  Back
                </div>
              ) : (
                config.questions[design[design.length - 1]].page > 0 && (
                  <div className="w-1/3"></div>
                )
              )}

              {config.questions[design[design.length - 1]].page > 0 && (
                <p className="w-1/3 text-center">
                  {page + 1} of{" "}
                  {config.questions[design[design.length - 1]].page + 1}
                </p>
              )}

              {config.questions[design[design.length - 1]].page > page ? (
                <div
                  // type="button"
                  className="w-1/3 rounded bg-rdsOrange p-1 text-white text-center cursor-pointer"
                  onClick={() => changePage(1)}
                >
                  Next
                </div>
              ) : (
                <button className="w-1/3 rounded bg-rdsOrange p-1 text-white">
                  Submit 
                </button>
              )}
            </div>
          </form>

          <p className="text-center text-red-600">{error}</p>

          <div className="mt-auto flex flex-col items-center text-center text-sm">
            <p className="max-w-prose text-center font-semibold">
              Need to leave the survey?
            </p>
            <p className="max-w-prose">
              Write down this code, which you can use to load your progress,
              even on another device:
              <b className="text-base font-semibold text-rdsOrange">
                {" "}
                {alias.current}
              </b>
            </p>
          </div>
        </>
      ) : (
        <Loading />
      )}
    </SurveyTakerStandardPage>
  );
}
