import ResultRow from "./ResultRow";

export default function ResultsTable(props: {
  results: any;
  config: any;
  filterCompleted: boolean;
}) {
  function getUserResponses(): Array<Array<string>> {
    let responses: any = props.results;
    let questionOrder = props.config.questionOrder;
    let allUserResponses = [];

    for (let userID in responses) {
      if (responses[userID].answers !== undefined) {
        let currUserResponses = [];
        currUserResponses.push(responses[userID].responseID);
        currUserResponses.push(responses[userID].parentID);
        currUserResponses.push(responses[userID].depth);
        questionOrder.forEach((questionID: string) => {
          if (responses[userID].answers[questionID] === undefined) {
            currUserResponses.push("");
          } else if (props.config.questions[questionID].type === "Checkbox"){
            currUserResponses.push(responses[userID].answers[questionID].join(", "));
          } else {
            currUserResponses.push(responses[userID].answers[questionID]);
          }
        });
        currUserResponses.push(responses[userID].completed.toString()); //Store completed status at end of array
        allUserResponses.push(currUserResponses);
      }
    }

    return allUserResponses;
  }

  function renderTableHeader() {
    let questionOrder: Array<any> = props.config.questionOrder;
    let questions = props.config.questions;
    let headers = [];

    headers.push("User ID");
    headers.push("Parent ID");
    headers.push("Referral Depth");
    questionOrder.forEach((questionID) => {
      let question = questions[questionID];
      if (question !== undefined) headers.push(question.config.prompt.value);
    });

    return <ResultRow rowData={headers} type="header" />;
  }

  function renderTableBody() {
    let userResponses = getUserResponses();

    return userResponses.map((row, index) => {
      if (row.pop() === "true" || props.filterCompleted === false) {
        //If filtering is on pop the completed value from the row array
        if (index % 2 === 0) {
          return (
            <ResultRow
              rowData={row}
              type="body"
              bgColor="bg-white dark:bg-rdsDark3"
            />
          );
        } else {
          return (
            <ResultRow
              rowData={row}
              type="body"
              bgColor="bg-gray-200 dark:bg-rdsDarkAccent3"
            />
          );
        }
      }
    });
  }

  return (
    <div className="overflow-auto">
      <table className="mb-4 w-fit table-auto border-collapse text-left">
        <thead>{renderTableHeader()}</thead>
        <tbody>{renderTableBody()}</tbody>
      </table>
    </div>
  );
}
