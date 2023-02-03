import { useState, useEffect, useReducer, useContext } from "react";
import StandardPage from "../../components/StandardPage";
import SurveyTopNav from "../../components/SurveyTopNav";
import QuestionViewer from "../../components/QuestionViewer";
import ConfigSidebar from "../../components/ConfigSidebar";
import SurveyLinkModal from "../../components/SurveyLinkModal";
import { TasksContext } from "../../context/SurveyBuilderContext";
import SurveyBuilderContext from "../../context/SurveyBuilderContext";
import { saveSurvey, addSurveyToUser, retrieveSurveyConfig } from "../../data/dataLayerManager";
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
  console.log(task);
  const params = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [surveyName, setSurveyName] = useState("SurveyName");
  const [config, setConfig] = useState<any>(getDefaultSurvey("temp"));
  const [questions, setQuestions] = useState<any>(config.questions);
  const [question, setQuestion] = useState(questions[0]);
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
      saveSurvey(userID, config.id, config);
      navigate(`../${config.id}`)
    } else {
      navigate(`/admin/dashboard`)
    }
  }, []);

  const updateConfig = (newConfig: any) => {
    setQuestions(newConfig);
  };

  const setCurrentQuestion = (newQuestion: any, index: number) => {
    console.log(newQuestion);
    console.log(index);
    // setQuestion(newQuestion);
    setQuestionIndex(index);
  };

  return (
    <SurveyBuilderContext>
      <SurveyTopNav name={surveyName} />
      <div className="flex flex-row gap-20">
        <SurveyLinkModal showModal={setShowModal} display={showModal} />
        <ConfigSidebar
          questionIndex={questionIndex}
          otherCurrentQuestion={questions}
          update={updateConfig}
        />
        <div className="mt-3 w-3/5">
          <div className="flex flex-row justify-between">
            <input
              placeholder="Survey Name"
              className="rounded-md bg-gray-100 text-black"
              value={surveyName}
              onChange={(e) => setSurveyName(e.target.value)}
            ></input>
            <div className="flex gap-2">
              <button className="rounded-sm border border-rdsBlue pl-2 pr-2 text-rdsBlue">
                Preview
              </button>
              <button
                className="rounded-sm bg-rdsBlue pl-2 pr-2 text-white"
                onClick={() => setShowModal(true)}
              >
                Publish
              </button>
            </div>
          </div>
          <QuestionViewer
            updateQuestion={setCurrentQuestion}
            questions={questions}
            update={updateConfig}
          />
          {/* <button onClick={() => dispatch({
              type: 'added',
              message: "Woah I made it"
              })}>Touch Me
          </button>
  <p>{tasks.message}</p> */}
        </div>
      </div>
    </SurveyBuilderContext>
  );
}
