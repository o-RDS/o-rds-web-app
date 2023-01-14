import react, {useState} from "react";
import MultipleChoice from "./questions/MultipleChoice";
import Question from "./questions/Question";
import sampleResearcherLogo from "../images/sample_researcher_logo.png";
import contactResearcherIcon from "../images/contact_researcher_icon.png";

export default function QuestionViewer(props: any) {
    const [questions, setQuestions] = useState([]);
    const design = [
        {
          page: 0,
          type: "MultipleChoice",
          config: {
            prompt: {
              value: "This is an example question?",
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
      ];

    const addQuestion = () => {
        //Also update in server you're using
        // setQuestions(questions.concat(<Question data={design}/>));
    }

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
          <div className="w-full">
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
          </div>
          <button className="bg-rdsBlue text-white rounded-sm pl-2 pr-2 w-fit">
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
