export default function giveConfigs(type: string) {
    switch(type) {
        case "MultipleChoice": 
            return ({
                prompt: {
                  value: "Multiple Choice Question",
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
        case "FillInBlank":
            return ({
                prompt: {
                    value: "Fill In The Blank Question",
                    configPrompt: "Question Prompt:",
                    type: "text",
                  },
            });
        case "ShortAnswer":
            return ({
                prompt: {
                    value: "Short Answer Question",
                    configPrompt: "Question Prompt:",
                    type: "text",
                  },
            });
        case "Checkbox":
            return({
                prompt: {
                    value: "Checkbox Question",
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
        default:
            return({
                prompt: {
                    value: "Checkbox Question",
                    configPrompt: "Question Prompt:",
                    type: "text",
                  },
            })
        
    }
}