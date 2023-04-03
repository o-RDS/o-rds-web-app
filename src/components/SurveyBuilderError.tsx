import React, {useContext} from "react";
import { SurveyDispatchContext } from "../context/SurveyBuilderContext";

export default function SurveyBuilderError(props: any) {
    const dispatch = useContext(SurveyDispatchContext);
    function handleErrorClose() {
        dispatch({
            type: "close-error"
        })
    }

  return (
    <div className="w-1/4 rounded-md bg-red-500 bg-opacity-20 p-2 flex flex-row gap-3 items-center justify-center">
      <p className="text-center text-sm text-red-500">{props.message}</p>
      <button onClick={() => handleErrorClose()}>x</button>
    </div>
  );
}
