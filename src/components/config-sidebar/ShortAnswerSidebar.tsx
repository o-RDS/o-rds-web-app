import React from "react";

export default function ShortAnswerSidebar(props: any) {
    const dealWithChange = (e: any) => {
        // console.log(e.target.value);
        let test: any = props.config;
        test["config"]["prompt"]["value"] = e.target.value;
        console.log(test);
        console.log(test["config"]["prompt"]["value"]);
        props.updateQuestion(test);
      }

  return (
    <>
      <div className="flex flex-col items-center justify-center">
        <label>
          {
            props.config.config.prompt.configPrompt
          }
        </label>
        <input
          type="text"
          placeholder="This is a question"
          className="w-3/5 rounded-sm border border-rdsOrange"
          onChange={(e: any) => dealWithChange(e)}
        ></input>
      </div>
    </>
    );
};