import React, { useState, useRef, useEffect } from "react";
import Question from "../../components/questions/Question";
import SurveyTakerStandardPage from "../../components/SurveyTakerStandardPage";
import { useNavigate, useOutletContext, useParams } from "react-router";
import {
  completeIncentive,
  loadResponse,
  writeSurveyResponse,
} from "../../data/dataLayerManager";

export default function Survey() {
  const [page, setPage] = useState<number>(0);
  const [design, setDesign] = useState<any>([{}]);
  const [re, setRe] = useState(false);
  const params = useParams();
  const navigate = useNavigate();
  const config: any = useOutletContext();
  const response: any = useRef({});
  const alias = useRef<string>("");
  const hash = useRef<string>("");

  console.log(design[design.length - 1].page);
  console.log(page);

  useEffect(() => {
    if (config !== null && config !== undefined) {
      setDesign(config.questions);
    }
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
            if (data) {
              response.current = data;
              response.current.parentID =
                window.sessionStorage.getItem("parent");
              response.current.depth = window.sessionStorage.getItem("depth");
              window.sessionStorage.setItem("responseID", data.responseID);
              setRe(!re);
            }
          });
        }
      } else {
        navigate("../resume");
      }
    }
  }, []);

  // this will be called by the question component whenever the question requests to update the response
  // goes through each column sent by the question and updates the response object
  function handleResponse(data: any, questionIndex: number) {
    Object.entries(data).forEach(([key, value]) => {
      let questionName = key;
      questionName = questionName.replace(
        "#",
        "Question " + (questionIndex + 1).toString()
      );
      response.current[questionName] = value;
    });
    console.log(response.current);
  }

  function changePage(modifier: number) {
    saveResponse();
    setPage(page + modifier);
  }

  async function saveResponse() {
    let tempHash = hash.current;
    if (params.id !== undefined && tempHash !== null) {
      let tempAlias = window.localStorage.getItem(params.id + tempHash);
      if (tempAlias) {
        // TODO fix this
        let tempResponse = await response.current;
        return writeSurveyResponse(params.id, tempAlias, tempResponse);
      }
    }
    return false;
  }

  async function handleSubmit() {
    console.log("Submitting");
    response.current.completed = true;
    console.log(response.current);
    if (params.id !== undefined && hash.current !== null) {
      if (
        (await saveResponse()) &&
        (await completeIncentive(params.id, hash.current))
      ) {
        navigate("../share");
      }
    }
    console.log("Failed to submit");
    // TODO: add error message
  }

  // renders all questions on the current page
  function renderQuestions() {
    console.log("Rendering questions");
    return design.map((question: any, index: number) => {
      console.log("Rendering question " + index);
      console.log(question);
      let answerIndex = "Question " + (index + 1).toString();
      if (question.page === page) {
        return (
          <Question
            data={question}
            index={index}
            handleResponse={handleResponse}
            currentAnswer={response.current[answerIndex]}
          />
        );
      } else {
        return null;
      }
    });
  }

  return (
    <SurveyTakerStandardPage>
      <div className="flex flex-col gap-y-3">
        <p className="max-w-prose">
          Here is where some instructions could go. In the future, this should
          be a variable based on what the researcher inputs in the Builder.
        </p>
        <hr className="border-1 w-9/12 self-center border-gray-800" />
      </div>

      {/*Question Section*/}
      <div className="flex-grow-1 flex flex-col gap-y-6">
        {renderQuestions()}
      </div>

      {/*Bottom Navigation*/}
      <div className="mt-auto flex min-h-[36px] w-4/5 flex-row justify-center md:mt-0 md:w-1/3">
        {page > 0 ? (
          <button
            className="w-1/3 rounded border-2 border-rdsOrange bg-white p-1 text-rdsOrange"
            onClick={() => changePage(-1)}
          >
            Back
          </button>
        ) : (
          design[design.length - 1].page > 0 && <div className="w-1/3"></div>
        )}
        {design[design.length - 1].page > 0 && (
          <p className="w-1/3 text-center">
            {page + 1} of {design[design.length - 1].page + 1}
          </p>
        )}
        {design[design.length - 1].page > page ? (
          <button
            className="w-1/3 rounded bg-rdsOrange p-1 text-white"
            onClick={() => changePage(1)}
          >
            Next
          </button>
        ) : (
          <button
            className="w-1/3 rounded bg-rdsOrange p-1 text-white"
            onClick={() => handleSubmit()}
          >
            Submit
          </button>
        )}
      </div>
      <p>
        If you have to leave the survey, write down this code, which you can use
        to load your progress, even on another device: {alias.current}
      </p>
    </SurveyTakerStandardPage>
  );
}
