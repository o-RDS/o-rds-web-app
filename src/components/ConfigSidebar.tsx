import react from "react";

export default function ConfigSidebar(props: any) {
  const choicesArray: any = props.currentQuestion.choices.value.map((choice: any) => <li key={choice}>{choice}</li>)
  return (
    <>
      <div className="flex flex-col justify-start items-center border-r border-black w-1/5 gap-2">
        <div>
          <label>{props.currentQuestion.prompt.configPrompt}</label>
          <input type="text" placeholder="This is a question" className="border border-rdsOrange rounded-sm w-3/5"></input>
        </div>
        <div>
          <label>{props.currentQuestion.shuffle.configPrompt}</label>
          <input type="checkbox"></input>
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
