import react, { useEffect, useReducer, useRef } from "react";
import { useParams, useNavigate, Outlet } from "react-router";
import { retrieveSurveyConfig, signIn } from "../data/dataLayerManager";
import { createContext } from "react";

export const TasksContext = createContext<any>(null); //This is the context that will contain the survey in state for the survey builder
export const TasksDispatchContext = createContext<any>(null); //This context will contain the dispatch to handle state changes

export default function SurveyBuilderContext(props: any) {
  function getDefaultSurvey(userID: string) {
    // let newID = uuidv4();
    // let question1ID = uuidv4();
    const defaultData = {
      survey: {
        id: 1,
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
          {
            page: 1,
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
                value:
                  "The Declaration of Indpendence was written in ____________",
                configPrompt: "Question Prompt:",
                type: "text",
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
        ],
      },
      question: 0,
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
    console.log(defaultData);
    return defaultData;
  }

  //Reducer function will handle all actions and update state accordingly
  function taskReducer(tasks: any, action: any) {
    console.log(action);
    try {
      switch (action.type) {
        case "initialize": {
          return {
            survey: action.questions,
            question: action.question,
          };
        }
        case "question-prompt": {
          return {
            survey: action.questions,
            question: action.question,
          };
        }
        case "new-choice": {
          return {
            survey: action.questions,
            question: action.question,
          };
        }
        case "shuffle": {
          return {
            survey: action.questions,
            question: action.question,
          };
        }
        case "update": {
          return {
            survey: action.questions,
            question: action.question,
          };
        }
        default: {
          return "";
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const [tasks, dispatch] = useReducer(taskReducer, getDefaultSurvey("temp")); // Create useReducer

  return (
    <TasksContext.Provider value={tasks}>
      <TasksDispatchContext.Provider value={dispatch}>
        {props.children}
      </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  );
}
