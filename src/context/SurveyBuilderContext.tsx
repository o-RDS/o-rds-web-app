import react, { useEffect, useReducer, useRef } from "react";
import giveConfigs from "../data/QuestionSwitcher";
import { saveSurveyConfig } from "../data/dataLayerManager";
import { useParams, useNavigate, Outlet } from "react-router";
import { retrieveSurveyConfig, signIn } from "../data/dataLayerManager";
import { createContext } from "react";
import { uuidv4 } from "@firebase/util";

export const SurveyContext = createContext<any>(null); //This is the context that will contain the survey in state for the survey builder
export const SurveyDispatchContext = createContext<any>(null); //This context will contain the dispatch to handle state changes

export default function SurveyBuilderContext(props: any) {
  function getDefaultSurvey(userID: string) {
    let newID = uuidv4();
    let question1ID = uuidv4();
    const defaultData = {
      survey: {
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
                configPrompt: "Shuffle choices",
                type: "bool",
              },
              choices: {
                value: ["A", "B", "C", "D", "E"],
                configPrompt: "Number of Choices",
                editablePrompt: "Edit Choices",
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
                configPrompt: "Shuffle choices",
                type: "bool",
              },
              choices: {
                value: ["A", "B", "C", "D", "E"],
                configPrompt: "Number of Choices",
                editablePrompt: "Edit Choices",
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
    return defaultData;
  }

  //Reducer function will handle all actions and update state accordingly
  function taskReducer(tasks: any, action: any) {
    try {
      switch (action.type) {
        case "initialize": {
          return {
            survey: action.questions,
            question: action.question,
            change: action.change,
          };
        }
        case "question-prompt": {
          let test: any = tasks;
          test["survey"]["questions"][test["question"]]["config"]["prompt"][
            "value"
          ] = action.prompt;
          return {
            survey: test["survey"],
            question: tasks["question"],
            change: true,
          };
        }
        case "delete-question2": {
          return {
            survey: action.questions,
            question: action.question,
            change: action.change
          }
        }
        case "choices-change": {
          let test: any = tasks;
          test["survey"]["questions"][test["question"]]["config"]["choices"][
            "value"
          ][action.choiceIndex] = action.newChoice;
          return {
            survey: test["survey"],
            question: tasks["question"],
            change: true,
          };
        }
        case "new-choice": {
          return {
            survey: action.questions,
            question: action.question,
          };
        }
        case "shuffle": {
          let test: any = tasks;
          test["survey"]["questions"][test["question"]]["config"]["shuffle"][
            "value"
          ] = action.isChecked;
          return {
            survey: test["survey"],
            question: tasks["question"],
            change: true,
          };
        }
        case "require": {
          let test: any = tasks;
          test["survey"]["questions"][test["question"]]["config"]["shuffle"][
            "value"
          ] = action.isChecked;
          return {
            survey: test["survey"],
            question: tasks["question"],
            change: true,
          };
        }
        case "change-page": {
          let test: any = tasks;
          test["survey"]["questions"][test["question"]]["page"] =
            action.newPage;
          return {
            survey: test["survey"],
            question: test["question"],
            change: true,
          };
        }
        case "update": {
          console.log("Update");
          return {
            survey: action.questions,
            question: action.question,
            change: action.change,
          };
        }
        case "update-survey-status": {
          let test = tasks;
          test['survey']['live'] = action.status;
          return {
            survey: test['survey'],
            question: tasks['question'],
            change: false
          }
        }
        case "save-survey": {
          if (tasks['change']) {
            saveSurveyConfig("test", tasks["survey"]["id"], tasks["survey"]);
          }
          return {
            survey: tasks['survey'],
            question: tasks['question'],
            change: false
          }
        }
        case "change-type": {
          let test: any = tasks;
          console.log(action.newType);
          test["survey"]["questions"][test["question"]]["type"] =
            action.newType;
          test["survey"]["questions"][test["question"]]["config"] = giveConfigs(
            action.newType
          );
          return {
            survey: test["survey"],
            question: tasks["question"],
            change: true,
          };
        }
        case "delete-question": {
          console.log(action.questionToDelete);
          let test2 = tasks;
          let index = test2["survey"]["questionOrder"].indexOf(
            action.questionToDelete
          );
          console.log(index);
          if (index != -1) {
            test2["survey"]["questionOrder"].splice(index, 1);
          }
          console.log(test2["survey"]["questionOrder"]);
          console.log(test2);
          console.log(test2["survey"]["questionOrder"][0]);
          delete test2["survey"]["questions"][action.questionToDelete];
          console.log(test2);
          return {
            survey: test2["survey"],
            question: test2["survey"]["questionOrder"][0],
            change: true,
          };
        }
        case "general-update": {
          let test: any = tasks;
          test["survey"][action.property] = action.value;
          return {
            survey: test["survey"],
            question: tasks["question"],
            change: true,
          };
        }
        default: {
          return {
            survey: tasks["survey"],
            question: tasks["question"],
            change: tasks["change"],
          };
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const [tasks, dispatch] = useReducer(taskReducer, getDefaultSurvey("test")); // Create useReducer

  return (
    <SurveyContext.Provider value={tasks}>
      <SurveyDispatchContext.Provider value={dispatch}>
        {props.children}
      </SurveyDispatchContext.Provider>
    </SurveyContext.Provider>
  );
}
