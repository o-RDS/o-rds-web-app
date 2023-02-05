# Questions

## Basics
Questions in o-RDS are meant to be fully modular. This means that they all handle data in a standardized way so that you can develop custom types of question components for use with o-RDS. This doc will help you understand how questions work and how to implement new ones.

In the app, the `Survey` page acts as the controller for the `Question` components, which each contain one of the specific question types.

## Implementing New Questions
### Get Started
Within the scope of question implementation, it is necessary to know that new types of questions must be imported to the `Question` component as well as added to the switch statement in the function `getQuestionType`.


Add a case in the same format as `MultipleChoice` below but replaced with you new component's name.
```
case "MultipleChoice":
        return <MultipleChoice config={data.config} updateResponse={updateResponse} currentValue={props.currentAnswer} index={props.index}/>;
```
As mentioned above, you may now create a new question component. (If you are unfamiliar with how this works in the [React Docs](https://reactjs.org/docs/components-and-props.html).) We also recommend taking a look at existing questions for ideas, though some requirements and recommendation will be discussed below.

### Reporting Answers
You have a large degree of freedom in your implementation, though there is one major requirement above all others: you must send an answers back up the component tree using the `updateResponse` function passed through the props.

Answers should be passed in an object in the format 
`
{ 
  "# subAnswerName" : "exampleAnswer" 
}
` 
When the object reaches the `Survey` page, the `#` will be replaced with the question's ID. 

While placing answers in objects may seem odd, the reasoning is so that questions are able to send multiple answers to the survey results. This does not need to be used if answers can easily be sent as a list converted to a string instead, for example, in a checkboxes questions. Each key in the answers object will correspond to a column in the survey responses, so extra keys should only be used when a separation of data makes sense.

For this reason, the answer object can usually just look like 
`
{
  "#": answerState
}
` 
since most questions will just have one answer. **All keys in the answer object must begin with `#` and should have a value of type String.**

### Recommendations
Besides looking at other questions for inspiration, there are also a few props that are highly recommended for a smooth user experience.

Utilizing `props.index` is high recommended, and you should  increment it by one to display the question number when rendering the question.

The other prop that should be used is `props.currentValue`, which allows the `Survey` page to pass down the current value of questions so that they can properly display their current answer. How you implement this will depend on the input method(s) the user is provided with.

## Question Makeup
As stated above you have complete freedom to implement any type of question of your choosing. But before we go any further it is important to understand the specifics of how a question is made. 

If you recall from above, when a question is finally built it will look like this:
```
case "MultipleChoice":
        return <MultipleChoice config={data.config} updateResponse={updateResponse} currentValue={props.currentAnswer} index={props.index}/>;
```

Each of these props provide the most basic and necessary information for the question to function. Let's dive into what each of these do.

### Config
To first understand the config prop, you should first understand what the configuration profile of a question looks like. 

At minimum a question configuration will include the following fields: `page`, `type`, and `config`.

The `page` field tells the survey what page to render the question on. The `type` helps the question component to know the specific question to render, and the `config` will contain an object that specifies each characteristic of a question using nested objects. At minimum, the `config` field must contain the `prompt` object. This object looks like this:

```
prompt: {
          value: "This is an example question (Page 0)?",
          configPrompt: "Question Prompt:",
          type: "text",
        },
        
```

This contains the most basic of information for the question, i.e. the question being asked!

The `value` field contains the question, the `configPrompt` is used in the Survey Builder (and will be covered in the Survey Builder documentation), and the `type` field specifies how to render that particular characteristic.

In all it will look something like this:

```
{
      page: 0,
      type: "MultipleChoice",
      config: {
        prompt: {
          value: "This is an example question (Page 0)?",
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
      },
    },
```

This is the basis for every question you will make. Underneath the `config` field, you can add any additional fields. For example, the multiple choice question has a `shuffle` and `choices` field. If you wanted you could add another field that would modify the question, it should follow the format of
```
field: {
  value: "",
  configPrompt: "",
  type: ""
} 
```




