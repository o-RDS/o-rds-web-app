import { useState, useEffect, useReducer, useContext } from "react";
import SurveySettingsSide from "../../components/settings/SurveySettingsSide";
import SurveyTopNav from "../../components/SurveyTopNav";
import SurveyTopConfig from "../../components/SurveyTopConfig";
import QuestionViewer from "../../components/QuestionViewer";
import ConfigSidebar from "../../components/ConfigSidebar";
import SurveyLinkModal from "../../components/SurveyLinkModal";
import SurveySettings from "../../components/settings/SurveySettings";
import SurveyBuilderError from "../../components/SurveyBuilderError";
import {
  SurveyContext,
  SurveyDispatchContext,
} from "../../context/SurveyBuilderContext";
import { saveSurveyConfig, retrieveSurveyConfig } from "../../APIs/Firebase";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router";
import StandardPage from "../../components/StandardPage";
import { getJWTPayload } from "../../data/cookieFunctions";
import Loading from "../../components/Loading";

//TODO: Survey builder context needs to get the correct survey! We need to make sure we get that data to it!
export default function SurveyBuilder() {
  const SurveyState = useContext(SurveyContext);
  const dispatch = useContext(SurveyDispatchContext);
  const [errors, setErrors] = useState("");
  function getDefaultSurvey() {
    let newID = uuidv4();
    let question1ID = uuidv4();
    const defaultData = {
      id: newID,
      title: "Untitled Survey",
      admins: [getJWTPayload().email],
      live: false,
      completionPayout: 0.0,
      refPayout: 0.0,
      maxRefs: 0,
      maxRefIncentives: 0,
      lastUpdated: new Date().toLocaleString("en-US", { timeZone: "CST" }),
      researcherMessage: "",
      endSurveyMessage: "Thank you for taking our survey",
      informedConsent: {
        message: "You must consent to this survey",
        consentRequirements: "",
      },
      contactInfo: {
        phone: "",
        email: "",
        mail: "",
      },
      /* question: 0, */
      questionOrder: [question1ID],
      questions: {
        [question1ID]: {
          require: false,
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
              configPrompt: "Shuffle Choices",
              type: "bool",
            },
            choices: {
              value: ["A", "B", "C", "D", "E"],
              configPrompt: "Number of Choices",
              editablePrompt: "Edit your choices",
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
  const [config, setConfig] = useState<any>(getDefaultSurvey());
  const [settings, setSettings] = useState({
    active: false,
    whichSettings: "General",
  });

  useEffect(() => {
    if (params.surveyID !== "new" && params.surveyID !== undefined) {
      retrieveSurveyConfig(params.surveyID).then((data: any) => {
        if (data === undefined) {
          navigate("/admin/dashboard");
        }
        dispatch({
          type: "initialize",
          questions: data,
          question: Object.keys(data["questions"])[0],
          change: false,
          error: "",
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
        question: config["questions"][config["questionOrder"][0]],
        change: false,
        error: "",
      });
      saveSurveyConfig(config.id, config);
      navigate(`../${config.id}`);
    } else {
      navigate(`/admin/dashboard`);
    }
  }, []);

  // setInterval(() => {
  //   console.log("this happens");
  // }, 50);

  return (
    <StandardPage>
      {SurveyState["error"] && (
        <div className="fixed top-5 z-50 flex w-full animate-inOut flex-row items-center justify-center">
          <SurveyBuilderError message={SurveyState["error"]} />
        </div>
      )}
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
      <div className="relative flex h-[40rem] min-h-fit flex-row gap-20 dark:bg-rdsDark2 2xl:h-[60rem]">
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
            {/* <div className="mt-3 w-8/12"> */}
            <QuestionViewer />
            {/* </div> */}
          </>
        )}
      </div>
      {/* )} */}
    </StandardPage>
  );
}
