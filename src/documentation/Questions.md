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
<TODO>