import react from "react";
import sampleResearcherLogo from "../images/sample_researcher_logo.png";
import contactResearcherIcon from "../images/contact_researcher_icon.png";

export default function ConfigSidebar(props: any) {
  const choicesArray: any = props.currentQuestion.choices.value.map((choice: any) => <li>{choice}</li>)
  return (
    <>
      <div className="flex flex-col justify-start items-center border-r border-black w-1/5 gap-2">
        <div>
          <input type="checkbox"></input>
          <label>{props.currentQuestion.shuffle.configPrompt}</label>
        </div>
        <div>
          <label>{props.currentQuestion.prompt.configPrompt}</label>
          <input type="text" placeholder="This is a question" className="border border-rdsOrange rounded-sm w-3/5"></input>
        </div>
        <div>
          <label>{props.currentQuestion.choices.configPrompt}</label>
          <input type="text" placeholder="Add Choices Here" className="border border-rdsOrange rounded-sm w-3/5"></input>
          <ul>
            {choicesArray}
          </ul>
        </div>
      </div>
    </>
  );
}
