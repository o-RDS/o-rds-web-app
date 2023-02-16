import { useState, useEffect, useReducer, useContext } from "react";
import SurveySettingsSide from "../../components/settings/SurveySettingsSide";
import SurveyTopConfig from "../../components/SurveyTopConfig";
import QuestionViewer from "../../components/QuestionViewer";
import ConfigSidebar from "../../components/ConfigSidebar";
import SurveyLinkModal from "../../components/SurveyLinkModal";
import SurveySettings from "../../components/settings/SurveySettings";
import { TasksContext, TasksDispatchContext } from "../../context/SurveyBuilderContext";
import {
  saveSurveyConfig,
  retrieveSurveyConfig,
} from "../../data/dataLayerManager";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router";
import StandardPage from "../../components/StandardPage";

//TODO: Survey builder context needs to get the correct survey! We need to make sure we get that data to it!
export default function SurveyBuilder() {
  const dispatch = useContext(TasksDispatchContext);
  function getDefaultSurvey(userID: string) {
    let newID = uuidv4();
    // let question1ID = uuidv4();
    const defaultData = {
      id: newID,
        title: "Untitled Survey",
        admins: [userID],
        completionPayout: 0.0,
        refPayout: 0.0,
        maxRefs: 0,
        lastUpdated: new Date().toISOString(),
        researcherMessage: "",
        endSurveyMessage: "Thank you for taking our survey",
        informedConsent: "You must consent to this survey",
        contactInfo: {
          phone: "",
          email: "",
          mail: "",
        },
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
      question: 0
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
  const [settings, setSettings] = useState({
    active: false,
    whichSettings: "General",
  });
  const userID = "test";

  useEffect(() => {
    if (params.surveyID !== "new" && params.surveyID !== undefined) {
      retrieveSurveyConfig(params.surveyID).then((data) => {
        if (data === undefined) {
          navigate("/admin/dashboard");
        }
        dispatch({
          type: "question-prompt",
          questions: data,
          question: 0
        })
        setConfig(data);
      });
    } else if (params.surveyID === "new") {
      dispatch({
        type: "question-prompt",
        questions: config,
        question: 0
      })
      saveSurveyConfig(userID, config.id, config);
      navigate(`../${config.id}`);
    } else {
      navigate(`/admin/dashboard`);
    }
  }, []);

  // setInterval(() => {
  //   console.log("this happens");
  // }, 5000)

  return (
    <StandardPage>
      <SurveyTopConfig
        name={surveyName}
        setSurveyName={setSurveyName}
        setShowModal={setShowModal}
        setSettings={setSettings}
        settings={settings}
      />
      <div className="flex min-h-screen flex-row gap-20 dark:bg-rdsDark2">
        <SurveyLinkModal
          showModal={setShowModal}
          display={showModal}
          surveyName={surveyName}
          surveyID={config.id}
        />
        {settings.active ? (
          <>
            <SurveySettingsSide setSettings={setSettings} settings={settings} />
            <SurveySettings settings={settings} />
          </>
        ) : (
          <>
            <ConfigSidebar />
            <div className="mt-3 w-8/12">
              <QuestionViewer />
            </div>
          </>
        )}
      </div>
    </StandardPage>
  );
}
