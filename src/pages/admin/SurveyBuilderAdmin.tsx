import { useState, useEffect, useReducer, useContext } from "react";
import SurveySettingsSide from "../../components/settings/SurveySettingsSide";
import SurveyTopNav from "../../components/SurveyTopNav";
import SurveyTopConfig from "../../components/SurveyTopConfig";
import QuestionViewer from "../../components/QuestionViewer";
import ConfigSidebar from "../../components/ConfigSidebar";
import SurveyLinkModal from "../../components/SurveyLinkModal";
import SurveySettings from "../../components/settings/SurveySettings";
import {
  SurveyContext,
  SurveyDispatchContext,
} from "../../context/SurveyBuilderContext";
import {
  saveSurveyConfig,
  retrieveSurveyConfig,
} from "../../data/dataLayerManager";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router";
import StandardPage from "../../components/StandardPage";
import Loading from "../../components/Loading";

//TODO: Survey builder context needs to get the correct survey! We need to make sure we get that data to it!
export default function SurveyBuilder() {
  const SurveyState = useContext(SurveyContext);
  const dispatch = useContext(SurveyDispatchContext);
  function getDefaultSurvey(userID: string) {
    let newID = uuidv4();
    let question1ID = uuidv4();
    const defaultData = {
      id: newID,
      title: "Untitled Survey",
      admins: [userID],
      completionPayout: 0.0,
      refPayout: 0.0,
      maxRefs: 0,
      maxRefIncentives: 0,
      lastUpdated: new Date().toLocaleString("en-US", { timeZone: "UTC" }),
      researcherMessage: "",
      endSurveyMessage: "Thank you for taking our survey",
      informedConsent: "You must consent to this survey",
      contactInfo: {
        phone: "",
        email: "",
        mail: "",
      },
      /* question: 0, */
      questionOrder: [question1ID],
      questions: {
        [question1ID]: {
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
    };
    return defaultData;
  }

  const params = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
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
      retrieveSurveyConfig(params.surveyID).then((data: any) => {
        if (data === undefined) {
          navigate("/admin/dashboard");
        }
        dispatch({
          type: "initialize",
          questions: data,
          question: Object.keys(data['questions'])[0],
          change: false,
        });
        setConfig(data);
        // setTimeout(() =>{
        //   setLoading(false);
        // }, 750)
        setLoading(false);
      });
    } else if (params.surveyID === "new") {
      dispatch({
        type: "initialize",
        questions: config,
        question: 0,
        change: false,
      });
      saveSurveyConfig(userID, config.id, config);
      navigate(`../${config.id}`);
    } else {
      navigate(`/admin/dashboard`);
    }
  }, []);

  // setInterval(() => {
  //   console.log("this happens");
  // }, 50);

  return (
    <>
      <SurveyTopNav />
      <SurveyTopConfig
        name={SurveyState["survey"]["title"]}
        setSurveyName={setSurveyName}
        setShowModal={setShowModal}
        setSettings={setSettings}
        settings={settings}
        id={SurveyState["survey"]["id"]}
      />
      {/* {loading ? (
        <div className="dark:bg-rdsDark2">
          <Loading />
        </div>
      ) : ( */}
        <div className="flex h-full flex-row gap-20 dark:bg-rdsDark2">
          <SurveyLinkModal
            showModal={setShowModal}
            display={showModal}
            surveyName={surveyName}
            surveyID={config.id}
          />
          {settings.active ? (
            <>
              <SurveySettingsSide
                setSettings={setSettings}
                settings={settings}
              />
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
      {/* )} */}
    </>
  );
}
