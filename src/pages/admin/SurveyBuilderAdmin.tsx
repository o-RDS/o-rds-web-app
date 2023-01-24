import React, { useState } from "react";
import StandardPage from "../../components/StandardPage";
import QuestionViewer from "../../components/QuestionViewer";
import ConfigSidebar from "../../components/ConfigSidebar";
import SurveyLinkModal from "../../components/SurveyLinkModal";

export default function SurveyBuilder() {
  const design = [
    {
      page: 0,
      type: "MultipleChoice",
      config: {
        prompt: {
          value: "This is an example question?",
          configPrompt: "Question Prompt 1:",
          type: "text",
        },
        shuffle: {
          value: true,
          configPrompt: "Shuffle me up",
          type: "bool",
        },
        choices: {
          value: ["A", "B", "C", "D", "E"],
          configPrompt: "Enter choices:",
          type: "stringArray",
        },
      },
    },
    {
      page: 0,
      type: "MultipleChoice",
      config: {
        prompt: {
          value: "This is an example question i guess?",
          configPrompt: "Question Prompt 2:",
          type: "text",
        },
        shuffle: {
          value: true,
          configPrompt: "shuffled",
          type: "bool",
        },
        choices: {
          value: ["AA", "BB", "CC", "DD", "EE"],
          configPrompt: "Enter choices:",
          type: "stringArray",
        },
      },
    }
  ];
  const [showModal, setShowModal] = useState(false);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [questions, setQuestions] = useState<any>(design);
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



  const updateConfig = (newConfig: any) => {
    setQuestions(newConfig);
  };

  const setCurrentQuestion = (newQuestion: any, index:number) => {
    setQuestion(newQuestion);
    setQuestionIndex(index);
  };

  return (
    <StandardPage>
      <div className="flex flex-row gap-20">
        <SurveyLinkModal showModal={setShowModal} display={showModal}/>
        <ConfigSidebar currentQuestion={question} questionIndex={questionIndex} otherCurrentQuestion={questions} update={updateConfig}/>
        <div className="w-3/5 mt-3">
          <div className="flex flex-row justify-between">
            <input
              placeholder="Survey Name"
              className="bg-gray-100 text-white rounded-md"
            ></input>
            <div className="flex gap-2">
              <button className="border-rdsBlue border text-rdsBlue rounded-sm pl-2 pr-2">
                Preview
              </button>
              <button className="bg-rdsBlue text-white rounded-sm pl-2 pr-2" onClick={() => setShowModal(true)}>
                Publish
              </button>
            </div>
          </div>
          <QuestionViewer updateQuestion={setCurrentQuestion} questions={questions}/>
        </div>
      </div>
    </StandardPage>
  );
}
