import { useState, useEffect, useReducer, useContext } from "react";
import StandardPage from "../../components/StandardPage";
import SurveyTopNav from "../../components/SurveyTopNav";
import SurveyTopConfig from "../../components/SurveyTopConfig";
import QuestionViewer from "../../components/QuestionViewer";
import ConfigSidebar from "../../components/ConfigSidebar";
import SurveyLinkModal from "../../components/SurveyLinkModal";
import SurveySettings from "../../components/SurveySettings";
import SurveyBuilderContext from "../../context/SurveyBuilderContext";
import {
  saveSurveyConfig,
  retrieveSurveyConfig,
} from "../../data/dataLayerManager";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router";

export default function SurveyBuilder() {
  function getDefaultSurvey(userID: string) {
    let newID = uuidv4();
    // let question1ID = uuidv4();
    const defaultData = {
      id: newID,
      title: "Untitled Survey",
      admins: [userID],
      live: false,
      completionPayout: 0.0,
      refPayout: 0.0,
      maxRefs: 0,
      lastUpdated: new Date().toISOString(),
      questions: [
        {
          page: 0,
          type: "MultipleChoice",
          config: {
            prompt: {
              value: "New Question",
              configPrompt: "Question Prompt:",
              type: "text",
            },
            shuffle: {
              value: true,
              configPrompt: "Shuffle choices?",
              type: "bool",
            },
            choices: {
              value: ["A", "B", "C", "D", "E"],
              configPrompt: "Enter choices:",
              type: "stringArray",
            },
          },
        },
      ],
      /* New Questions w/ IDs
      "questionOrder": [question1ID],
      "questions": {
        question1ID: {
          page: 0,
          type: "MultipleChoice",
          config: {
            prompt: {
              value: "New Question",
              configPrompt: "Question Prompt:",
              type: "text",
            },
            shuffle: {
              value: true,
              configPrompt: "Shuffle choices?",
              type: "bool",
            },
            choices: {
              value: ["A", "B", "C", "D", "E"],
              configPrompt: "Enter choices:",
              type: "stringArray",
            },
          },
        },
      },
      */
    };
    return defaultData;
  }

  const params = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [surveyName, setSurveyName] = useState("SurveyName");
  const [config, setConfig] = useState<any>(getDefaultSurvey("test"));
  const [settings, setSettings] = useState(false);
  //const [questions, setQuestions] = useState<any>(config.questions);
  //const [question, setQuestion] = useState(questions[0]);
  const userID = "test";

  useEffect(() => {
    if (params.surveyID !== "new" && params.surveyID !== undefined) {
      retrieveSurveyConfig(params.surveyID).then((data) => {
        if (data === undefined) {
          navigate("../../dashboard");
        }
        setConfig(data);
      });
    } else if (params.surveyID === "new") {
      saveSurveyConfig(userID, config.id, config);
      navigate(`../${config.id}`);
    } else {
      navigate(`/admin/dashboard`);
    }
  }, []);

  return (
    <SurveyBuilderContext>
      <SurveyTopNav name={surveyName} />
      <SurveyTopConfig
        name={surveyName}
        setSurveyName={setSurveyName}
        setShowModal={setShowModal}
        setSettings={setSettings}
        settings={settings}
      />
      <div className="flex flex-row gap-20">
        <SurveyLinkModal
          showModal={setShowModal}
          display={showModal}
          surveyName={surveyName}
          surveyID={config.id}
        />
        {settings ? (
          <SurveySettings />
        ) : (
          <>
            <ConfigSidebar />
            <div className="mt-3 w-3/5">
              <QuestionViewer />
            </div>
          </>
        )}
      </div>
    </SurveyBuilderContext>
  );
}
