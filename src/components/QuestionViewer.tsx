import react, {useState} from "react";
import MultipleChoice from "./questions/MultipleChoice";
import Question from "./questions/Question";
import sampleResearcherLogo from "../images/sample_researcher_logo.png";
import contactResearcherIcon from "../images/contact_researcher_icon.png";

export default function QuestionViewer(props: any) {
    //questions would be filled in through a database call and any uses of design would be replace with questions
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
      }
    ];
    const [questions, setQuestions] = useState<any>(design);

      const proofQuestionToAdd: any[] = [
        {
          page: 0,
          type: "MultipleChoice",
          config: {
            prompt: {
              value: "Use the side config to edit the question!",
              configPrompt: "Question Prompt 2:",
              type: "text",
            },
            shuffle: {
              value: true,
              configPrompt: "Shuffle: ",
              type: "bool",
            },
            choices: {
              value: ["Option 1", "Option 2", "Option 3", "Option 4"],
              configPrompt: "Enter choices:",
              type: "stringArray",
            },
          },
        }
      ]

    const addQuestion = () => {
        //Also update in server you're using
        setQuestions(questions.concat(proofQuestionToAdd));
    }

    const chooseQuestion = (newQuestion: any, target: any) => {
      props.updateQuestion(newQuestion);
      target.tabIndex = -1;
      target.focus();
    }

    const testArray = questions.map((question: any, index: number) => {
    return <div key={index} className="rounded-sm hover:border-2 hover:border-red-500 focus:border-red-500" onClick={(e) => chooseQuestion(question.config, e.target)}>
      <div className="w-full">
            <h3>{"Q" + (index + 1)}</h3>
            <div className="bg-gray-100 p-3 rounded-md">
              <h2>{question.config.prompt.value}</h2>
              <ul>
                {/* <li>
                  <input type="radio" value="Item 1"></input>
                  <label>Item 1</label>
                </li>
                <li>
                  <input type="radio" placeholder="Item 1"></input>
                  <label>Item 2</label>
                </li>
                <li>
                  <input type="radio" placeholder="Item 1"></input>
                  <label>Item 3</label>
                </li>
                <li>
                  <input type="radio" placeholder="Item 1"></input>
                  <label>Item 4</label>
                </li> */}
                {question.config.choices.value.map((choice: any) => {
                  return (
                    <li key={choice}>
                      <input type="radio" value={choice}></input>
                      <label>{choice}</label>
                    </li>
                  )
                })}
              </ul>
            </div>
          </div>
    </div>});

  return (
    <>
      <div className="flex flex-col w-3/5 h-min-56 gap-10 mt-3">
        <div className="flex flex-row justify-between">
          <input
            placeholder="Survey Name"
            className="bg-gray-100 text-white rounded-md"
          ></input>
          <div className="flex gap-2">
            <button className="border-rdsBlue border text-rdsBlue rounded-sm pl-2 pr-2">
              Preview
            </button>
            <button className="bg-rdsBlue text-white rounded-sm pl-2 pr-2">
              Publish
            </button>
          </div>
        </div>
        <div className="border-black border justify-center items-center flex flex-col p-5 rounded-md gap-10 w-full">
          {/* <div className="w-full">
            <h3>Q1</h3>
            <div className="bg-gray-100 p-3 rounded-md">
              <input placeholder="Click to Write Question Text"></input>
              <ul>
                <li>
                  <input type="radio" value="Item 1"></input>
                  <label>Item 1</label>
                </li>
                <li>
                  <input type="radio" placeholder="Item 1"></input>
                  <label>Item 2</label>
                </li>
                <li>
                  <input type="radio" placeholder="Item 1"></input>
                  <label>Item 3</label>
                </li>
                <li>
                  <input type="radio" placeholder="Item 1"></input>
                  <label>Item 4</label>
                </li>
              </ul>
            </div>
          </div> */}
          <div className="w-full">
              {testArray}
          </div>
          <button className="bg-rdsBlue text-white rounded-sm pl-2 pr-2 w-fit" onClick={() => addQuestion()}>
            + Add Question
          </button>
          <div className="w-full">
            <h3>End of Survey</h3>
            <input
              className="w-full bg-gray-100"
              placeholder="Put what you would like the end of survey message to be!"
            ></input>
          </div>
        </div>
      </div>
    </>
  );
}
