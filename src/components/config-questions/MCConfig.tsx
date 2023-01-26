import React from "react";

export default function MCConfig(props: any) {
    function chooseQuestion(question: any, e: any, l: any) {
        return;
    }
    const testArray = props.questions.map((question: any, index: number) => {
        return <div key={index} className="rounded-sm hover:border-2 hover:border-red-500 focus:border-red-500 border-2 border-white transition-all p-1" onClick={(e) => chooseQuestion(question.config, e.target, index)}>
          <div className="w-full">
                <h3>{"Q" + (index + 1)}</h3>
                <div className="bg-gray-100 p-3 rounded-md">
                  <h2>{question.config.prompt.value}</h2>
                  <ul>
                    {question.config.choices.value.map((choice: any) => {
                      return (
                        <li key={choice}>
                          <input type="radio" value={choice} disabled></input>
                          <label>{choice}</label>
                        </li>
                      )
                    })}
                  </ul>
                </div>
              </div>
        </div>});
        return (
            <></>
        );
} 