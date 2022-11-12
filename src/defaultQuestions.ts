export default function getDefault(questionType: string){
  switch(questionType){
    case "MultipleChoice":
      return {
        prompt: {
          value: "",
          configPrompt: "Question Prompt",
          type: "string"
        },
        shuffle: {
          value: false,
          configPrompt: "Shuffle?",
          type: "boolean"
        },
        choices: {
          value: [""],
          configPrompt: "Question Prompt",
          type: "stringArray"
        },
      };
    case "TrueFalse":
      return {
        prompt: {
          value: "",
          configPrompt: "Question Prompt",
          type: "string"
        },
      };
    default:
      return {};
  } 
}