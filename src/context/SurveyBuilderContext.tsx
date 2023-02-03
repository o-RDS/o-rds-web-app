import react, { useEffect, useReducer, useRef } from 'react';
import { useParams, useNavigate, Outlet } from 'react-router';
import { retrieveSurveyConfig, signIn } from '../data/dataLayerManager';
import { createContext } from 'react';

export const TasksContext = createContext<any>(null);
export const TasksDispatchContext = createContext<any>(null);


export default function SurveyBuilderContext(props: any){
  function getDefaultSurvey(userID: string) {
    // let newID = uuidv4();
    // let question1ID = uuidv4();
    const defaultData = {
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
    console.log(defaultData);
    return defaultData;
  }
  //const SurveyConfigContext = react.createContext({});
  function taskReducer(tasks: any, action: any) {
    console.log(action);
    try {
    switch(action.type) {
      case 'initialize': {
        return action.questions
      }
      case "question-prompt": {
        return action.message;
      }
      case "new-choice": {
        return action.choice
      }
      case "shuffle": {
        return action.change
      }
      default: {
        return ""
      }
    }
  } catch(error) {
    console.log(error);
  }
  }
  const initialTasks: any = {};
  const [tasks, dispatch] = useReducer(taskReducer, getDefaultSurvey("temp"));

  return (
    <TasksContext.Provider value={tasks}>
        <TasksDispatchContext.Provider value={dispatch}>
            {props.children}
        </TasksDispatchContext.Provider>
    </TasksContext.Provider>
  )

}