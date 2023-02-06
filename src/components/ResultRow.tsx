import React from "react";
import "./ResultRow.css";
import removeEntryIcon from "../images/remove_entry_icon.svg";

export default function ResultRow(props: {
  rowData: string[];
  type: string;
  bgColor?: string;
}) {
  function renderCells() {
    return props.rowData.map((responseVal, index) => {
      if (props.type == "header") {
        return (
          <th className="whitespace-wrap max-w-md border border-black px-4 py-3">
            {responseVal}
          </th>
        );
      } else {
        return (
          <td className="whitespace-wrap max-w-md break-words border border-black px-4 py-3">
            {responseVal}
          </td>
        );
      }
    });
  }

  return (
    <>
      {props.type == "header" ? (
        <tr className="bg-slate-600 text-sm text-white">
          <th className="w-fit border-0 bg-white"></th>
          {renderCells()}
        </tr>
      ) : (
        <>
          <tr className={"dataRow " + props.bgColor}>
            <td className="w-10 bg-white align-middle">
              <button className="deleteButton">
                <img
                  src={removeEntryIcon}
                  alt="Row delete button"
                  className="h-10 w-8"
                />
              </button>
            </td>
            {renderCells()}
          </tr>
        </>
      )}
    </>
  );
}
