import React, { useContext } from "react";
import { SurveyDispatchContext } from "../context/SurveyBuilderContext";

export default function SurveyBuilderError(props: any) {
  const dispatch = useContext(SurveyDispatchContext);
  function handleErrorClose() {
    dispatch({
      type: "close-error",
    });
  }

  return (
    <div className="flex w-1/4 flex-row items-center justify-center gap-3 rounded-md bg-red-500 bg-opacity-20 p-2">
      <p className="text-center text-sm text-red-500">{props.message}</p>
      <button onClick={() => handleErrorClose()}>x</button>
    </div>
  );
}
