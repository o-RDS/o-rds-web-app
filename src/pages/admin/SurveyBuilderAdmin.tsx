import React, {useState} from "react";
import StandardPage from "../../components/StandardPage";
import QuestionViewer from "../../components/QuestionViewer";
import ConfigSidebar from "../../components/ConfigSidebar";

export default function SurveyBuilder() {
    const [question, setQuestion] = useState({
        page: 0,
        type: "MultipleChoice",
        prompt: {
          value: "This is an example question?",
          configPrompt: "Question Prompt:",
          type: "text",
        },
        shuffle: {
          value: true,
          configPrompt: "Shuffle choices?",
          type: "bool",
        },
        choices: {
          value: ["A", "B", "C", "D", "E"],
          configPrompt: "Enter choices:",
          type: "stringArray",
        },
      });

    const updateConfig = () => {
        
    }

    const updateCurrentQuestion = (newQuestion: any) => {
        setQuestion(newQuestion);
    }

    return (
        <StandardPage>
            <div className="flex flex-row gap-20">
                <ConfigSidebar currentQuestion={question}/>
                <QuestionViewer updateQuestion={updateCurrentQuestion}/>
            </div>
        </StandardPage>
    )
}