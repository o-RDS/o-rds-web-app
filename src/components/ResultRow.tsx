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
          <th className="min-w-[275px] max-w-md whitespace-normal border-x border-black px-4 py-3">
            {responseVal}
          </th>
        );
      } else {
        return (
          <td className="min-w-[275px] max-w-md whitespace-normal break-words border border-black px-4 py-3">
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
          <th className="sticky left-0 w-10 min-w-[40px] bg-white dark:bg-rdsDark2"></th>
          {renderCells()}
        </tr>
      ) : (
        <>
          <tr className={"dataRow " + props.bgColor}>
            <td className="sticky left-0 w-10 min-w-[40px] bg-white align-middle dark:bg-rdsDark2">
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
