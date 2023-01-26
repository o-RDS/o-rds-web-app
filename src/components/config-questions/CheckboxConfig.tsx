import React from "react";

export default function CheckboxConfig(props: any) {
    const chooseQuestion = (newQuestion: any, target: any, index:number) => {
        console.log(newQuestion);
        props.updateQuestion(newQuestion, index);
        target.tabIndex = -1;
        target.focus();
      }
    console.log(props.config);
    // const testArray = props.questions.map((question: any, index: number) => {
    //     return <div key={index} className="rounded-sm hover:border-2 hover:border-red-500 focus:border-red-500 border-2 border-white transition-all p-1" onClick={(e) => chooseQuestion(question.config, e.target, index)}>
    //       <div className="w-full">
    //             <h3>{"Q" + (index + 1)}</h3>
    //             <div className="bg-gray-100 p-3 rounded-md">
    //               <h2>{question.config.prompt.value}</h2>
    //               <ul>
    //                 {question.config.choices.value.map((choice: any) => {
    //                   return (
    //                     <li key={choice}>
    //                       <input type="radio" value={choice} disabled></input>
    //                       <label>{choice}</label>
    //                     </li>
    //                   )
    //                 })}
    //               </ul>
    //             </div>
    //           </div>
    //     </div>});

    function renderChoices() {
                    return props.config.config.choices.value.map((choice: any) => {
                      return (
                        <li key={choice}>
                          <input type="checkbox" value={choice} disabled></input>
                          <label>{choice}</label>
                        </li>
                      )
                    })
    }
        return (
            <div className="rounded-sm hover:border-2 hover:border-red-500 focus:border-red-500 border-2 border-white transition-all p-1" onClick={(e) => chooseQuestion(props.config, e.target, props.index)}>
          <div className="w-full">
                <h3>{"Q" + (props.index + 1)}</h3>
                <div className="bg-gray-100 p-3 rounded-md">
                  <h2>{props.config.config.prompt.value}</h2>
                  <ul>
                    {renderChoices()}
                  </ul>
                </div>
              </div>
        </div>
        );
}