import { updateCurrentUser } from "firebase/auth";
import react from "react";

export default function ConfigSidebar(props: any) {
  const choicesArray: any = props.otherCurrentQuestion[props.questionIndex].config.choices.value.map((choice: any) => <li key={choice}>{choice}</li>);
  console.log(props.otherCurrentQuestion[props.questionIndex].page);

  const dealWithChange = (e: any) => {
    // console.log(e.target.value);
    let test: any = props.otherCurrentQuestion;
    test[props.questionIndex]["config"]["prompt"]["value"] = e.target.value;
    props.update(test);
  }

  return (
    <>
      <div className="flex flex-col justify-start items-center border-r border-black w-1/5 gap-2">
        <div className="flex flex-col justify-center items-center">
          <label>{props.otherCurrentQuestion[props.questionIndex].config.prompt.configPrompt}</label>
          <input type="text" placeholder="This is a question" className="border border-rdsOrange rounded-sm w-3/5" onChange={(e: any) => dealWithChange(e)}></input>
        </div>
        <div>
          <label>{props.otherCurrentQuestion[props.questionIndex].config.shuffle.configPrompt}</label>
          <input type="checkbox"></input>
        </div>
        <div className="flex flex-col justify-center items-center">
          <label>{props.otherCurrentQuestion[props.questionIndex].config.choices.configPrompt}</label>
          <input type="text" placeholder="Add Choices Here" className="border border-rdsOrange rounded-sm w-3/5"></input>
          <ul>
            {choicesArray}
          </ul>
        </div>
      </div>
    </>
  );
}
