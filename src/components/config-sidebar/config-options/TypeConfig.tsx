import React, {useContext} from "react";
import { TasksContext, TasksDispatchContext } from "../../../context/SurveyBuilderContext";

export default function TypeConfig() {
    const task = useContext(TasksContext);
  const taskQuestions = task["survey"]["questions"][task["question"]];
  const dispatch = useContext(TasksDispatchContext);
    
}