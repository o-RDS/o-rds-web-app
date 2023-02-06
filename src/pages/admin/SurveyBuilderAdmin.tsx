import { useState, useEffect, useReducer, useContext } from "react";
import StandardPage from "../../components/StandardPage";
import SurveyTopNav from "../../components/SurveyTopNav";
import SurveyTopConfig from "../../components/SurveyTopConfig";
import QuestionViewer from "../../components/QuestionViewer";
import ConfigSidebar from "../../components/ConfigSidebar";
import SurveyLinkModal from "../../components/SurveyLinkModal";
import { TasksContext } from "../../context/SurveyBuilderContext";
import SurveyBuilderContext from "../../context/SurveyBuilderContext";
import {
  saveSurveyConfig,
  retrieveSurveyConfig,
} from "../../data/dataLayerManager";
import { v4 as uuidv4 } from "uuid";
import { useNavigate, useParams } from "react-router";

export default function SurveyBuilder() {
  const initialTasks: any = "Hello";
  //   const [tasks, dispatch] = useReducer(taskReducer, initialTasks);
  //   console.log(tasks);
  //   function taskReducer (tasks: any, action: any) {
  //     if (action.type === 'added') {
  //       return action.message;
  //   }
  // }

  //   function handleAddTask() {
  //     dispatch({
  //       type: 'added',
  //       message: "Woah I made it"
  //     });
  //   }
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

  /*
  const design = [
    {
      page: 0,
      type: "MultipleChoice",
      config: {
        prompt: {
          value: "This is an example question?",
          configPrompt: "Question Prompt 1:",
          type: "text",
        },
        shuffle: {
          value: true,
          configPrompt: "Shuffle me up",
          type: "bool",
        },
        choices: {
          value: ["A", "B", "C", "D", "E"],
          configPrompt: "Enter choices:",
          type: "stringArray",
        },
      },
    },
    {
      page: 0,
      type: "MultipleChoice",
      config: {
        prompt: {
          value: "This is an example question i guess?",
          configPrompt: "Question Prompt 2:",
          type: "text",
        },
        shuffle: {
          value: true,
          configPrompt: "shuffled",
          type: "bool",
        },
        choices: {
          value: ["AA", "BB", "CC", "DD", "EE"],
          configPrompt: "Enter choices:",
          type: "stringArray",
        },
      },
    },
    {
      page: 0,
      type: "ShortAnswer",
      config: {
        prompt: {
          value: "This is an example question i guess 3?",
          configPrompt: "Question Prompt 2:",
          type: "text",
        },
        shuffle: {
          value: true,
          configPrompt: "shuffled",
          type: "bool",
        },
        choices: {
          value: ["AA", "BB", "CC", "DD", "EE"],
          configPrompt: "Enter choices:",
          type: "stringArray",
        },
      },
    },
    {
      page: 0,
      type: "Checkbox",
      config: {
        prompt: {
          value: "This is an example question (Page 0)?",
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
    {
      page: 0,
      type: "FillInBlank",
      config: {
        prompt: {
          value: "The Declaration of Indpendence was written in ____________",
          configPrompt: "Question Prompt:",
          type: "text",
        },
      },
    },
  ];
  */
  const task = useContext(TasksContext);
  const params = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [surveyName, setSurveyName] = useState("SurveyName");
  const [config, setConfig] = useState<any>(getDefaultSurvey("test"));
  //const [questions, setQuestions] = useState<any>(config.questions);
  //const [question, setQuestion] = useState(questions[0]);
  const userID = "test"

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
      navigate(`../${config.id}`)
    } else {
      navigate(`/admin/dashboard`);
    }
  }, []);

  return (
    <SurveyBuilderContext>
      <SurveyTopNav name={surveyName} />
      <SurveyTopConfig setSurveyName={setSurveyName} setShowModal={setShowModal}/>
      <div className="flex flex-row gap-20">
        <SurveyLinkModal showModal={setShowModal} display={showModal} surveyName={surveyName} surveyID={config.id}/>
        <ConfigSidebar
        />
        <div className="mt-3 w-3/5">
          <QuestionViewer />
        </div>
      </div>
    </SurveyBuilderContext>
  );
}
