import { updateCurrentUser } from "firebase/auth";
import react from "react";

export default function ConfigSidebar(props: any) {
  const choicesArray: any = props.currentQuestion.choices.value.map((choice: any) => <li key={choice}>{choice}</li>);
  console.log(props.otherCurrentQuestion[props.questionIndex].page);

  const dealWithChange = (e: any) => {
    // console.log(e.target.value);
    let test: any = props.otherCurrentQuestion;
    console.log(props.otherCurrentQuestion[props.questionIndex]);
    console.log(test);
    console.log(test[props.questionIndex]);
    test[props.questionIndex]["config"]["prompt"]["value"] = e.target.value;
    console.log(test[props.questionIndex]["config"]["prompt"]["value"]);
    props.update(test);
  }

  return (
    <>
      <div className="flex flex-col justify-start items-center border-r border-black w-1/5 gap-2">
        <div>
          <label>{props.currentQuestion.prompt.configPrompt}</label>
          <input type="text" placeholder="This is a question" className="border border-rdsOrange rounded-sm w-3/5" onChange={(e: any) => dealWithChange(e)}></input>
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
